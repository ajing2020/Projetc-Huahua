<template>
  <Layout>
    <div class="label-title">管理标签<Icon name="label"/></div>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <DefaultButton class="createTag" @click="createTag"
        >新建标签</DefaultButton
      >
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import DefaultButton from "@/components/DefaultButton.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/tagHelper";

@Component({
  components: { DefaultButton},
})
export default class Label extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.label-title{
  line-height: 50px;
  font-size: 24px;
  text-align: center;
  background: #336699;
  color: white;
  margin-bottom: 8px;
}
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      height: 24px;
      width: 24px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
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