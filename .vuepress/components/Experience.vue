<template>
  <div>
    <div v-if="experiences.length" class="resume-experience">
      <h2>WORK EXPERIENCES</h2>
      <div v-for="work in experiences" class="single-work" :key="work.time">
        <h3>{{ work.job }}</h3>
        <p>{{ work.company }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experiences: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="stylus">
.resume-experience {
  h2 {
    font-family: 'Karla', sans-serif;
    border-bottom: 2px solid black;
  }

  .single-work {
    padding-left: 20px;

    h3 {
      margin-bottom: 0px;
    }

    p {
      margin-top: 5px;
      font-style: italic;
    }
  }
}
</style>