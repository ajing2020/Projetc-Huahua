<template>
  <Layout>
    <div class="label-title">查看统计<Icon name="statistics" /></div>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <div v-if="groupedList.length > 0">
      <ol>
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">
            {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li
              @click="removeItem(item)"
              v-for="item in group.items"
              :key="item.id"
              class="record"
            >
              <span>{{ defaultTag(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div class="removeRecordTip">点击删除</div>
    </div>
    <div v-else class="noResult">
      目前没有相关记录
      <Icon name="cry" />
      <Icon name="cry" />
      <Icon name="cry" />
    </div>
  </Layout>
</template>



<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  created() {
    this.$store.commit("fetchRecords");
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  defaultTag(tags: Tag[]) {
    if (tags.length === 0) {
      return "没有分类";
    } else {
      return tags[0];
    }
  }

  removeItem(item: RecordItem) {
    this.$store.commit("removeRecord", item);
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = recordList
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    // console.log(result[0].items);

    return result;
  }
  type = "-";
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.removeRecordTip {
  padding: 6px;
  text-align: center;
  font-size: 14px;
  color: rgb(99, 99, 99);
}
.label-title {
  line-height: 50px;
  font-size: 24px;
  text-align: center;
  background: #336699;
  color: white;
  margin-bottom: 8px;
}
.noResult {
  padding: 14px;
  text-align: center;
}
::v-deep {
  .type-tabs-item {
    background: #214b74;
    &.selected {
      background: #4e8fd1;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: white;
  margin-bottom: 8px;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  font-size: 12px;
}
</style>