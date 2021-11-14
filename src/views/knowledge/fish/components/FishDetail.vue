<template>
  <div class="news-container">
    <h3 class="news-title">{{ newsDetail.title }}</h3>
    <div class="news-admin">
      <span class="news-admin-text">日期:</span>
      <span style="margin-right:30px;">{{ newsDetail.newsTime | formatNewsTime }}</span>
      <span class="news-admin-text">发布人:</span>
      <span>{{ newsDetail.createUser }}</span>
    </div>
    <div>
      <img :src="newsDetail.image" class="news-image"/>
    </div>
    <div class="news-content" v-html='newsDetail.richContent'>
    </div>
  </div>
</template>
<script>
import {
  fetchList,
  createNews,
  updateNews,
  deleteNews,
  getNewsDetail,
} from "@/api/news";
import { formatDate } from "@/utils/date";

const defaultNewsDetail = {
  title: null,
  content: null,
  richContent: null,
  image: null,
  newsTime: null,
  createUser: null,
};
export default {
  name: "FishDetail",
  components: {},
  props: {},
  data() {
    return {
      newsDetail: Object.assign({}, defaultNewsDetail),
    };
  },
  created() {
    getNewsDetail(this.$route.query.id).then((response) => {
      this.newsDetail = response.data;
    });
  },
  filters: {
    formatNewsTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  computed: {},
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.news-container {
  padding: 20px 18%;
}
.news-title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  color: #212121;
  text-align: center;
}
.news-admin {
  margin-bottom: 10px;
  text-align: center;
}
.news-admin-text {
  color: #0355b9;
}
.news-image {
  height: 400px;
  width: 100%;
}
</style>
<style>
.news-content p {
  text-indent: 2em;
  line-height: 1.5em;
}
</style>

