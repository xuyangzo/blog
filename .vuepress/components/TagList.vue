<!-- .vuepress/components/TagList.vue -->
<template lang="html">
  <div>
    <h2 
      :id="tag" 
    >
      {{tag}}
    </h2>
    <ul>
      <li v-for="page in tags()" :key="page.path + tag">
        <router-link
          :to="{ path: page.path}">{{page.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: decodeURI(this.$route.hash.slice(1))
    };
  },
  methods: {
    tags() {
      const tag = decodeURI(this.$route.hash.slice(1));
      this.tag = tag;
      let articles = [];
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const currtag = page.frontmatter.tags[index];
          if (currtag === this.tag) {
            articles.push(page);
            break;
          }
        }
      }
      return articles;
    }
  },
  watch: {
    $route: function() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="stylus" scoped>
img {
  display: block;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>