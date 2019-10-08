<template>
  <div class="resume-header">
    <img v-if="profile.photo" :src="$withBase(profile.photo)" class="profile-image" />
    <img v-else :src="$withBase('/anonymous.jpg')" class="profile-image" />
    <div class="right">
      <h2>{{ profile.name }}</h2>
      <div v-if="profile.email" class="resume-header-info">
        <i class="iconfont icon-email"></i>
        {{ profile.email }}
      </div>
      <div v-if="profile.wechat" class="resume-header-info">
        <i class="iconfont icon-custom-wechat"></i>
        {{ profile.wechat }}
      </div>
      <div v-if="profile.phone" class="resume-header-info">
        <i class="iconfont icon-phone"></i>
        {{ profile.phone }}
      </div>
      <div v-if="profile.address" class="resume-header-info">
        <i class="iconfont icon-address1"></i>
        {{ profile.address }}
      </div>
      <div v-if="profile.github" class="resume-header-info">
        <i class="iconfont icon-github"></i>
        <a :href="profile.github" target="_blank">{{ profile.github }}</a>
      </div>
      <div v-if="profile.website" class="resume-header-info">
        <i class="iconfont icon-website"></i>
        <a :href="profile.website" target="_blank">{{ profile.website }}</a>
      </div>
    </div>
    <img
      v-if="profile.wechatQR"
      :src="$withBase(profile.wechatQR)"
      class="wechat-qr"
      :style="{ opacity: 0 }"
    />
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  }
};
</script>

<style lang="stylus">
.resume-header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  .profile-image {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    position: relative;
  }

  .wechat-qr {
    height: 150px;
    margin-left: 100px;
  }

  .right {
    margin-left: 60px;

    .resume-header-info {
      margin: 7px 0;

      i {
        font-size: 20px;
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
    }

    h2 {
      font-family: 'Karla', sans-serif;
      border-bottom: none;
      margin-top: 0px;
      margin-bottom: 10px;
    }
  }
}
</style>