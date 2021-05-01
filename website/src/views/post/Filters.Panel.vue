<template>
  <section class="filter-panel">
    <van-field
      v-model="typeFilterRef.text"
      readonly
      clickable
      label="Type :"
      placeholder="type filter"
      @click="showTypeFilterRef = true"
      class="type-filter filter"
    />
    <van-popup v-model:show="showTypeFilterRef" round position="bottom">
      <van-picker :columns="typeFilterListRef" @cancel="showTypeFilterRef = false" @confirm="onTypeFilterConfirm" />
    </van-popup>

    <van-field
      v-model="timeFilterRef.text"
      readonly
      clickable
      label="Time :"
      placeholder="time filter"
      @click="showTimeFilterRef = true"
      class="time-filter filter"
    />
    <van-popup v-model:show="showTimeFilterRef" round position="bottom">
      <van-picker :columns="timeFilterList" @cancel="showTimeFilterRef = false" @confirm="onTimeFilterConfirm" />
    </van-popup>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { PostTypeItem } from '@/views/post/Post.page.vue';

interface FilterItem {
  text: string;
  value: string;
}

const typeFilterAll: FilterItem = {
  text: 'All',
  value: '0',
};

const timeFilterList: FilterItem[] = [
  {
    text: 'New - Old',
    value: 'DESC',
  },
  {
    text: 'Old - New',
    value: 'ASC',
  },
];

export default defineComponent({
  name: 'FilterPanel',
  props: {
    postTypeList: {
      type: Array as PropType<PostTypeItem[]>,
      required: true,
    },
  },
  emits: ['handleFilterChange'],
  setup(props, context) {
    const typeFilterRef = ref(typeFilterAll);
    const showTypeFilterRef = ref(false);
    const timeFilterRef = ref(timeFilterList[0]);
    const showTimeFilterRef = ref(false);

    const typeFilterListRef = computed(() => [
      typeFilterAll,
      ...props.postTypeList.map(item => ({
        text: item.typeName,
        value: item.id,
      })),
    ]);

    const onTypeFilterConfirm = (filter: FilterItem) => {
      typeFilterRef.value = filter;
      showTypeFilterRef.value = false;
    };

    const onTimeFilterConfirm = (filter: FilterItem) => {
      timeFilterRef.value = filter;
      showTimeFilterRef.value = false;
    };

    watch([typeFilterRef, timeFilterRef], () => {
      context.emit('handleFilterChange');
    });

    return {
      typeFilterRef,
      showTypeFilterRef,
      timeFilterRef,
      showTimeFilterRef,
      typeFilterListRef,
      timeFilterList,
      onTypeFilterConfirm,
      onTimeFilterConfirm,
    };
  },
});
</script>
<style scoped lang="scss">
@mixin mobile($fn, $padding) {
  .filter-panel {
    margin-top: call($fn, 20);
    width: 100%;
    display: flex;
    justify-content: space-between;

    .filter {
      width: 45%;
      flex: 0 0 45%;
      height: call($fn, 40);
      line-height: call($fn, 40);
      padding: 0 call($fn, 10);
      background: rgba(255, 255, 255, 0.7);
      border-radius: call($fn, 8);
      border: 1px solid #e1e1e2;
      box-shadow: 0 1px 2px #e1e1e2;

      &::v-deep(.van-cell__title) {
        width: 40%;
        margin-right: 0;

        .span {
          color: $lightTextColor;
          font-size: call($fn, 12);
        }
      }

      &::v-deep(.van-cell__value) {
        .van-field__control {
          color: $textColor;
          font-size: call($fn, 14);
        }
      }
    }
  }
}

@include mediaMixin;
</style>
