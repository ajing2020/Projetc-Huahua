<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul v-if="tagList.length > 0" class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag.name) >= 0 }"
        @click="toggle(tag.name)"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div v-else>
      请您先添加需要的标签哦
      <Icon name="happy"/>
      <Icon name="happy"/>
      <Icon name="happy"/>
      </div>
  </div>
</template>

<script lang="ts">
import TagHelper from "@/mixins/tagHelper";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

@Component
export default class Tags extends mixins(TagHelper) {
  get tagList() {
    return this.$store.state.tagList;
  }
  selectedTags: string[] = [];

  created() {
    this.$store.commit("fetchTags");
  }

  toggle(name: string) {
    //只能选一个标签
    const index = this.selectedTags.indexOf(name);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags = [];
      this.selectedTags.push(name);
      this.$emit("update:value", this.selectedTags);
    }
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", name);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  background: white;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #66a5e4;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: #2a5f94;
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
}
</style>