<template>
  <button class="button" @click="$emit('click',$event)">
      <slot/>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class DefaultButton extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  background: #4688ca;
  color: #000;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>