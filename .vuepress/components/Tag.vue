<template lang="html">
  <div>
    <span class='tag-container' v-for="(tag, index) in $page.frontmatter.tags">
      <router-link
        class='tag'
        v-bind:style="{ color: colors[index % 7] }"
        :key="tag"
        :to="{ path: `/tags.html#${tag}`}"
      >
        {{'#' + tag}}
      </router-link>
    </span>
    <br />
    <br />
  </div>
</template>

<script>
const colors = [
  "skyblue",
  "palevioletred",
  "mediumpurple",
  "mediumseagreen",
  "gold",
  "teal",
  "pink"
];

export default {
  data() {
    return {
      currIdx: 0,
      colors
    };
  },
  methods: {
    getColor: function() {
      const color = this.colors[this.currIdx];
      this.currIdx++;
      if (this.currIdx > 7) this.currIdx = 0;
      return color;
    }
  }
};
</script>

<style lang="css">
.tag-container {
  margin-right: 10px;
}

.tag {
  display: inline-block;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
}
</style>