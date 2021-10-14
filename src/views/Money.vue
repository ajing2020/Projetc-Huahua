<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
    <div class="notes">
      <FormItem
        placeholder="在这里输入备注"
        fieldName="备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags @update:value="onUpdateTag" />
    <div class="label-title">花花记账</div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { NumberPad, Tabs, Tags, FormItem },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdateTag(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      window.alert("请选一个标签");
      return;
    } else {
      this.$store.commit("createRecord", this.record);

      window.alert("记录成功啦！");
    }
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
.label-title{
  line-height: 50px;
  font-size: 24px;
  text-align: center;
  background: #336699;
  color: white;
  margin-bottom: 8px;
}
.notes {
  padding: 12px 0;
}
</style>

