<template>
  <div class="resume">
    <Header :profile="profile"></Header>
    <br />
    <Skill :skills="skill"></Skill>
    <br />
    <br />
    <Experience :experiences="experience"></Experience>
  </div>
</template>

<script>
import Header from "./Header";
import Skill from "./Skill";
import Experience from "./Experience";

export default {
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
    skill() {
      const { skills } = this.$page.frontmatter;
      return skills;
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