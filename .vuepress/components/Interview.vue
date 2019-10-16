<!-- .vuepress/components/TagList.vue -->
<template lang="html">
  <div>
    <span v-for="tag in Object.keys(tags)">
      <h2 :id="tag">
        <router-link
          :to="{ path: `/tags.html#${tag}`}"
          class="header-anchor"
          aria-hidden="true">#</router-link>
        {{tag}} ({{tags[tag].length}} 题，<span v-red>随机顺序</span>)
      </h2>
      <ul>
        <li v-for="page in tags[tag]">
          <router-link
            :to="{ path: page.path}">{{page.title}}</router-link>
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagNames: [
        "面试问题 - JS",
        "面试问题 - CSS",
        "面试问题 - 算法",
        "面试问题 - 设计模式"
      ]
    };
  },
  computed: {
    tags() {
      let tags = {};
      this.tagNames.forEach(tagName => (tags[tagName] = []));
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index];
          if (tag.indexOf("面试问题") !== -1) {
            tags[tag].push(page);
          }
        }
      }
      return tags;
    }
  }
};
</script>