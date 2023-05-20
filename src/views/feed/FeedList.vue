<template>
  <v-container class="bv-example-row mt-3">
    <v-row class="mv-1">
      <v-col class="text-right">
        <v-button @click="moveWrite()">글쓰기</v-button>
      </v-col>
    </v-row>
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
              <td>{{ article.userId }}</td>
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
      this.$router.push({ name: "feedEdit" });
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
