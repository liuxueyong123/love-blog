<template>
  <section class="post-page">
    <PageHeaderComponent icon="http://lxy520.top/images/nav-icon-post.png" title="Posts" />

    <van-overlay :show="showPublishCardRef">
      <div class="submit-post-wrapper">
        <div class="choose-type-card" v-show="isChooseType">
          <div>isChooseType</div>
          <button @click="goToEditStep">goToEditStep</button>
        </div>
        <div class="edit-text-card" v-show="isEditText" @click="setShowPublishCardRef(false)">
          <div>isEditText</div>
        </div>
      </div>
    </van-overlay>

    <div class="share-btn" @click="openNewPublishCard">Hi, Sayyeah°! What do you want to share?</div>

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
        <van-picker :columns="typeFilterList" @cancel="showTypeFilterRef = false" @confirm="onTypeFilterConfirm" />
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
        <van-picker :columns="timeFilterList" @cancel="showTimeFilterRef = false" @confirm="onTimeFilterConfirm" />
      </van-popup>
    </div>

    <div class="post-wrapper">
      <PostItemComponent />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
import PostItemComponent from '@/views/post/PostItem.Component.vue';

enum PublishStep {
  chooseType = 1,
  editText = 2,
}

const typeFilterList = ['All', 'travel', 'dirary'];
const timeFilterList = ['All', 'New - Old', 'Old - New'];

export default defineComponent({
  components: {
    PageHeaderComponent,
    PostItemComponent,
  },
  name: 'PostPage',
  setup() {
    const typeFilterRef = ref('');
    const showTypeFilterRef = ref(false);
    const timeFilterRef = ref('');
    const showTimeFilterRef = ref(false);

    const onTypeFilterConfirm = (value: string) => {
      typeFilterRef.value = value;
      showTypeFilterRef.value = false;
    };

    const onTimeFilterConfirm = (value: string) => {
      timeFilterRef.value = value;
      showTimeFilterRef.value = false;
    };

    const showPublishCardRef = ref(false);
    const publishStepRef = ref(PublishStep.chooseType);
    const isChooseType = computed(() => publishStepRef.value === PublishStep.chooseType);
    const isEditText = computed(() => publishStepRef.value === PublishStep.editText);

    const setShowPublishCardRef = (show: boolean) => {
      showPublishCardRef.value = show;
    };

    const goToEditStep = () => {
      publishStepRef.value = PublishStep.editText;
    };

    const openNewPublishCard = () => {
      publishStepRef.value = PublishStep.chooseType;
      showPublishCardRef.value = true;
    };

    const postList = reactive([]);

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
      showPublishCardRef,
      setShowPublishCardRef,
      isChooseType,
      isEditText,
      goToEditStep,
      openNewPublishCard,
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

    .submit-post-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .choose-type-card {
        width: 80%;
        height: 80%;
        border-radius: call($fn, 10);
        background-color: #fff;
      }

      .edit-text-card {
        width: 80%;
        height: 50%;
        border-radius: call($fn, 10);
        background-color: #fff;
      }
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
              color: $lightTextColor;
              font-size: call($fn, 12);
            }
          }

          .van-cell__value {
            .van-field__control {
              color: $textColor;
              font-size: call($fn, 14);
            }
          }
        }
      }
    }

    .post-wrapper {
      margin-top: call($fn, 20);
    }
  }
}

@include mediaMixin;
</style>
