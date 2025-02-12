import jwtDecode from "jwt-decode";

import router from "@/router";
import { login, logout, tokenRegeneration, findById } from "@/api/auth";

const state = {
  isLogin: false,
  isLoginError: false,
  userInfo: null,
  isValidToken: false,
};
const getters = {
  checkUserInfo: function (state) {
    return state.userInfo;
  },
  checkToken: function (state) {
    return state.isValidToken;
  },
};
const mutations = {
  SET_IS_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin;
  },
  SET_IS_LOGIN_ERROR: (state, isLoginError) => {
    state.isLoginError = isLoginError;
  },
  SET_IS_VALID_TOKEN: (state, isValidToken) => {
    state.isValidToken = isValidToken;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
};
const actions = {
  async userConfirm({ commit }, user) {
    //TODO: Login Valid Check
    await login(
      user,
      ({ data }) => {
        console.log(data.data);
        let accessToken = data.data["accessToken"];
        let refreshToken = data.data["refreshToken"];
        console.log(
          "login success token created!!!! >> ",
          accessToken,
          refreshToken
        );
        commit("SET_IS_LOGIN", true);
        commit("SET_IS_LOGIN_ERROR", false);
        commit("SET_IS_VALID_TOKEN", true);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  async userLogout({ commit }) {
    // commit("SET_IS_LOGIN", false);
    // commit("SET_USER_INFO", null);
    // commit("SET_IS_VALID_TOKEN", false);
    //router.push({ name: "loginView" });
    console.log("usreLOgout");
    logout(() => {
      commit("SET_IS_LOGIN", false);
      commit("SET_USER_INFO", null);
      commit("SET_IS_VALID_TOKEN", false);
      router.push({ name: "loginView" });
    });
  },
  async getUserInfo({ commit, dispatch }, token) {
    let decodeToken = jwtDecode(token);
    //console.log("2. getUserInfo() decodeToken :: ", decodeToken);
    await findById(
      decodeToken.userId,
      ({ data }) => {
        commit("SET_USER_INFO", data.data);
        console.log("3. getUserInfo data >> ", data);
      },
      async (error) => {
        console.log(
          "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
          error.response.status
        );
        commit("SET_IS_VALID_TOKEN", false);
        await dispatch("tokenRegeneration");
      }
    );
  },
  async tokenRegeneration({ commit, state }) {
    console.log(
      "토큰 재발급 >> 기존 토큰 정보 : {}",
      sessionStorage.getItem("accessToken")
    );
    await tokenRegeneration(
      ({ data }) => {
        let accessToken = data["accessToken"];
        console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
        sessionStorage.setItem("accessToken", accessToken);
        commit("SET_IS_VALID_TOKEN", true);
      },
      async (error) => {
        // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
        if (error.response.status === 401) {
          console.log("갱신 실패");
          // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
          await logout(
            state.userInfo.userid,
            ({ data }) => {
              if (data.message === "success") {
                console.log("리프레시 토큰 제거 성공");
              } else {
                console.log("리프레시 토큰 제거 실패");
              }
              alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
              commit("SET_IS_LOGIN", false);
              commit("SET_IS_VALID_TOKEN", false);
              router.push({ name: "loginView" });
            },
            (error) => {
              console.log(error);
              commit("SET_IS_LOGIN", false);
            }
          );
        }
      }
    );
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
