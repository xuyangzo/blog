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
      tag: window.location.hash.slice(1).replace(/%20/g, " ")
    };
  },
  methods: {
    tags() {
      const tag = window.location.hash.slice(1).replace(/%20/g, " ");
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