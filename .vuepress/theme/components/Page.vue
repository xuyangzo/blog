<template>
  <main class="page" :style="{ 
      paddingLeft: $page.regularPath === '/' ? 0 : '300px'
    }">
    <slot name="top" />

    <Content
      class="theme-default-content"
      :style="{
        maxWidth: $page.regularPath === '/' ? '1000px' : '900px'  
      }"
    />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"]
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}

@media (max-width: 500px) {
  .page {
    padding-left: 0 !important;
  }
}
</style>
