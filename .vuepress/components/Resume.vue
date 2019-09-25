<template>
  <div>
    <Header :profileImage="profileImage()"></Header>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  methods: {
    profileImage() {
      const { profileImage } = this.$page.frontmatter;
      return profileImage;
    }
  }
};
</script>