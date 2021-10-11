<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <NavTab />
  </div>
</template>

<script lang="ts">
import NavTab from '@/components/NavTab.vue'
export default {
  props: ["classPrefix"],
  name: "Layout",
  components:{NavTab}
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>