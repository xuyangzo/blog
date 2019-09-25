<template>
  <div class="resume-header">
    <img :src="$withBase(profileImage)" />
  </div>
</template>

<script>
export default {
  props: {
    profileImage: {
      type: String,
      default: "/anonymous.jpeg"
    }
  }
};
</script>

<style lang="stylus">
.resume-header {
  img {
    width: 100px;
    height: 100px;
  }
}
</style>