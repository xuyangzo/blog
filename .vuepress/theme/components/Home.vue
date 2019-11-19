<template>
  <main class="home" aria-labelledby="main-title">
    <resume />
  </main>
</template>

<script>
import Resume from "../../components/Resume";

export default {
  components: { Resume }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Caveat|Permanent+Marker&display=swap');

.home {
  padding: 0 2rem 0;
  max-width: 100%;
  min-height: 100vh;
  margin: 0px auto;
  display: block;
  background: ghostwhite;

  h1 {
    font-size: 3rem;
  }

  h1, .description, .action {
    margin: 1.8rem auto;
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background: white;
  }
}
</style>
