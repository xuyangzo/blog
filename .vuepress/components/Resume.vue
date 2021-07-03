<template>
  <div class="resume">
    <Header :profile="profile" />
    <br />
    <br />
    <Intro :intros="intro" />
    <br />
    <br />
    <Experience :experiences="experience"></Experience>
  </div>
</template>

<script>
import Header from "./Header";
import Intro from "./Intro";
import Experience from "./Experience";

export default {
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    profile() {
      const {
        name,
        address,
        phone,
        email,
        website,
        photo,
        github,
        wechat,
        wechatQR
      } = this.$page.frontmatter;
      return {
        name,
        address,
        phone,
        email,
        website,
        photo,
        github,
        wechat,
        wechatQR
      };
    },
    intro() {
      const { intros } = this.$page.frontmatter;
      return intros;
    },
    experience() {
      const { experiences } = this.$page.frontmatter;
      return experiences;
    }
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Karla&display=swap');
</style>