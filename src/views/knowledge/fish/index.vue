<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in list" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" class="news-card">
          <img :src="item.image" class="news-image" />
          <div class="news-main">
            <div class="news-admin">
              <i class="el-icon-user-solid news-icon"></i>
              <span>{{ item.createUser }}</span>
              <i class="el-icon-date news-icon" style="margin-left: 10px"></i>
              <span>{{ item.newsTime | formatNewsTime }}</span>
            </div>
            <div class="news-title">
              <h3>{{ item.title }}</h3>
            </div>
            <p class="news-content">{{ item.content | formatContent }}</p>
          </div>
          <div class="bottom clearfix">
            <el-button
              type="primary"
              class="button"
              size="small"
              @click="handleViewFish(item.id)"
              >查看更多</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[8, 12, 16, 24]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList, deleteNews } from "@/api/news";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 8,
  title: null,
};
export default {
  name: "fishNews",
  components: {},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatNewsTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatContent(content) {
      if (content.length > 120) {
        return content.substr(0, 120) + "...";
      } else {
        return content;
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleViewFish(newsId) {
      this.$router.push({ path: "/knowledge/viewFish", query: { id: newsId } });
    },
  },
};
</script>
<style scoped>
.news-card {
  margin-bottom: 10px;
}
.news-main {
  padding: 20px 10px;
  height: 200px;
}
.new-title {
  transition: all 0.5s;
  font-size: 22px;
  text-transform: capitalize;
  font-weight: 600;
  line-height: 1.4;
  color: #212121;
}
.news-title h3 {
  margin-block-start: 1em;
  margin-block-end: 0.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.news-icon {
  color: #0355b9;
}
.news-content {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  float: left;
  margin: 0 0 10px 10px;
}
.news-image {
  width: 100%;
  height: 200px;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>


