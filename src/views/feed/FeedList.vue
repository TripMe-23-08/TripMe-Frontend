<template>
  <v-container class="bv-example-row mt-3">
    <v-row class="mv-1">
      <v-col class="text-right">
        <v-button @click="moveWrite">글쓰기</v-button>
      </v-col>
    </v-row>
    <!-- <v-list lines="three">
      <v-list-item
        v-for="article in articles"
        :key="article.id"
        link
        @click="$router.push(`/feed/${article.id}`)"
      >
        <template v-slot:prepend>
          <v-avatar class="me-4 mt-2" rounded="0">
            <v-img
              :src="`https://picsum.photos/seed/picsum/200/300`"
              cover
            ></v-img>
          </v-avatar>
        </template>
        <div v-text="article.title"></div>

        <v-list-item-title
          class="text-uppercase font-weight-regular text-caption"
          v-text="article.nickName"
        ></v-list-item-title>
      </v-list-item>
    </v-list> -->

    <v-row>
      <v-col>
        <v-table fixed-header>
          <thead>
            <tr>
              <th
                v-for="field in fields"
                :key="field.id"
                :class="field.tdClass"
              >
                {{ field.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td>
                <router-link
                  :to="{
                    name: 'feedDetail',
                    params: { feedId: article.id },
                  }"
                  >{{ article.id }}</router-link
                >
              </td>
              <td>{{ article.title }}</td>
              <td>{{ article.nickName }}</td>
              <td>{{ dateFormat(article.createdAt) }}</td>
              <td>{{ dateFormat(article.updatedAt) }}</td>
              <td>{{ article.view }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import http from "@/api/http";
import moment from "moment";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "id", label: "번호", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "createdAt", label: "작성일", tdClass: "tdClass" },
        { key: "updatedAt", label: "수정일", tdClass: "tdClass" },
        { key: "view", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    http.get(`/articles`).then(({ data }) => {
      this.articles = data.data;
      console.log(data.data);
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "feedAdd" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "feedDetail",
        params: { articleno: article.articleno },
      });
    },
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 60px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: center;
}
</style>
