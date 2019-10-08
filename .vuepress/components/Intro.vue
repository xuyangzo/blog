<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      intersection: {
        threshold: 0.2
      },
      once: true
    }"
    v-if="intros.length"
    class="resume-intro"
    :class="{ 'resume-intro-appear': isVisible }"
  >
    <v-switch v-model="setFalse" label="抽烟"></v-switch>
  </div>
</template>

<script>
export default {
  props: {
    intros: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isVisible: false,
      setFalse: false
    };
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    }
  }
};
</script>

<style lang="stylus">
.resume-intro-appear {
  animation: fadeInUp 1s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

.resume-intro {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  background: rgba(255, 230, 245, 0.2);
  opacity: 0;

  h2 {
    font-family: 'Karla', sans-serif;
    border-bottom: 2px solid black;
  }
}
</style>