<!-- .vuepress/components/TagList.vue -->
<template lang="html">
  <div>
    <div v-if="tag">
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
    <div v-else>
      <img :src="$withBase('/apology.jpeg')" />
      <br />
      <h3 v-if="$page.regularPath.indexOf('/zh/') === -1">Because of technical issue, 
        you have to manually go to the corresponding page for another language</h3>
      <h3 v-else>老子技术不够，在tags.html中切换语言，你得自己点击链接</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: decodeURI(window.location.hash.slice(1))
    };
  },
  methods: {
    checkLanguage(language, path) {
      if (language === "English" && path.indexOf("/zh/") === -1) return true;
      if (language === "简体中文" && path.indexOf("/zh/") !== -1) return true;
      return false;
    },
    tags() {
      const tag = decodeURI(window.location.hash.slice(1));
      this.tag = tag;
      let articles = [];
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const currtag = page.frontmatter.tags[index];
          // push only if the language match
          if (
            currtag === this.tag &&
            this.checkLanguage(this.$lang, page.regularPath)
          ) {
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