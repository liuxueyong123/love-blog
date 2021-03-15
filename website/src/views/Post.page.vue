<template>
  <section class='post-page'>
    <PageHeaderComponent icon="http://lxy520.top/images/nav-icon-post.png" title="Posts" />

    <div class="share-btn">Hi, Sayyeah°! What do you want to share?</div>

    <div class="filter-wrapper">
      <van-field
        v-model="typeFilterRef"
        readonly
        clickable
        label="Type :"
        placeholder="type filter"
        @click="showTypeFilterRef = true"
        class="type-filter filter"
      />
      <van-popup v-model:show="showTypeFilterRef" round position="bottom">
        <van-picker
          :columns="typeFilterList"
          @cancel="showTypeFilterRef = false"
          @confirm="onTypeFilterConfirm"
        />
      </van-popup>

      <van-field
        v-model="timeFilterRef"
        readonly
        clickable
        label="Time :"
        placeholder="time filter"
        @click="showTimeFilterRef = true"
         class="time-filter filter"
      />
      <van-popup v-model:show="showTimeFilterRef" round position="bottom">
        <van-picker
          :columns="timeFilterList"
          @cancel="showTimeFilterRef = false"
          @confirm="onTimeFilterConfirm"
        />
      </van-popup>
    </div>

    <div class="post-wrapper">
      <div class="post-item">
        <div class="post-header"></div>
        <div class="post-content">111</div>
        <div class="post-handler-wrapper"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';

const typeFilterList = ['All', 'travel', 'dirary'];
const timeFilterList = ['All', 'New - Old', 'Old - New'];

export default defineComponent({
  components: {
    PageHeaderComponent,
  },
  name: 'PostPage',
  setup() {
    const typeFilterRef = ref('');
    const showTypeFilterRef = ref(false);
    const timeFilterRef = ref('');
    const showTimeFilterRef = ref(false);

    const postList = reactive([]);

    const onTypeFilterConfirm = (value: string) => {
      typeFilterRef.value = value;
      showTypeFilterRef.value = false;
    };

    const onTimeFilterConfirm = (value: string) => {
      timeFilterRef.value = value;
      showTimeFilterRef.value = false;
    };

    return {
      typeFilterRef,
      showTypeFilterRef,
      typeFilterList,
      timeFilterList,
      timeFilterRef,
      showTimeFilterRef,
      onTypeFilterConfirm,
      onTimeFilterConfirm,
      postList,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  .post-page {
    width: 100%;
    padding: 0 $padding;

    .share-btn {
      margin-top: call($fn, 15);
      width: 100%;
      height: call($fn, 40);
      background: rgba(255, 255, 255, 0.7);
      border-radius: call($fn, 15);
      border: 1px solid #e1e1e2;
      box-shadow: 0 1px 2px #e1e1e2;
      text-align: center;
      line-height: call($fn, 40);
      font-size: call($fn, 14);
      font-weight: 500;
    }

    .filter-wrapper {
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

        &::v-deep {
          .van-cell__title {
            width: 40%;
            margin-right: 0;

            .span {
              color: $light-text;
              font-size: call($fn, 12);
            }
          }

          .van-cell__value {
            .van-field__control {
               color: $text;
              font-size: call($fn, 14);
            }
          }
        }
      }
    }

    .post-wrapper {
      margin-top: call($fn, 20);

      .post-item {
        width: 100%;
        background: rgba(255, 255, 255, 0.7);
        border-radius: call($fn, 8);
        border: 1px solid #e1e1e2;
        box-shadow: 0 1px 2px #e1e1e2;
        padding: call($fn, 5) call($fn, 10);
      }
    }
  }
}

@media screen and (max-width: 500px) {
  @include mobile(get-function('m-px2vw'), $m-padding);
}

@media screen and (min-width: 500px) {
  @include mobile(get-function('m2ipad'), $ipad-padding);
}
</style>
