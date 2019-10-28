<!-- .vuepress/components/TagList.vue -->
<template>
  <v-app class="recent">
    <!-- <router-link
    :to="{ path: page.path}">{{page.title}}</router-link>-->
    <v-row v-for="article in thisPageArticles" dense class="mt-2 mb-2 pt-2">
      <v-col cols="12">
        <v-card color="#fff" light class="custom-card" @click="goToArticle(article.path)">
          <v-card-title class="headline mb-2">{{ article.title }}</v-card-title>
          <v-card-subtitle>发表时间：{{ article.frontmatter.date }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text>Listen Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination v-model="page" :length="paginationLength" :total-visible="7" circle></v-pagination>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      page: 0
    };
  },
  computed: {
    paginationLength() {
      return Math.ceil(this.articles.length / 5);
    },
    thisPageArticles() {
      return this.articles.slice(this.page * 5 - 5, this.page * 5);
    }
  },
  methods: {
    goToArticle(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    const articles = this.$site.pages;
    articles.sort((a, b) => {
      const date1 = a.frontmatter.date;
      const date2 = b.frontmatter.date;

      // 如果页面没指名 date
      if (!date1) return 1;
      if (!date2) return -1;

      // 如果年份一样，查看月份，然后查看日
      if (date1.slice(6) !== date2.slice(6))
        return parseInt(date2.slice(6)) - parseInt(date1.slice(6));
      if (date1.slice(0, 2) !== date2.slice(0, 2))
        return parseInt(date2.slice(0, 2)) - parseInt(date1.slice(0, 2));
      return parseInt(date2.slice(3, 5)) - parseInt(date1.slice(3, 5));
    });

    this.articles = articles.filter(page => page.frontmatter.tags);

    // 获取当前页数
    this.page = parseInt(this.$route.hash.slice(1));
  },
  watch: {
    page: function(newPage) {
      this.$router.push(
        { path: "/recent.html", hash: `#${newPage}` },
        () => {}
      );
    },
    $route: function() {
      this.page = parseInt(this.$route.hash.slice(1));
    }
  }
};
</script>

<style lang="stylus">
.recent {
  .custom-card {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    text-align: left !important;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      color: mediumpurple;
      transform: scale(1.05);
      -webkit-transform: scale(1.05);
    }
  }
}
</style>