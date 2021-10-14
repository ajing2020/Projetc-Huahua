<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="typeList" :value.sync="type" />
    <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" />
  </Layout>
</template>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: #c4c4c4;
  &.selected {
    background: white;
    &::after {
      display: none;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { Types, Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
}
</script>
