<template>
  <section class="post-page">
    <PageHeaderComponent icon="http://lxy520.top/images/nav-icon-post.png" title="Posts" />

    <van-overlay :show="showPublishCardRef">
      <div class="submit-post-wrapper">
        <div class="choose-type-card" v-show="isChooseType">
          <div>isChooseType</div>
          <button @click="goToEditStep">goToEditStep</button>
        </div>
        <div class="edit-text-card" v-show="isEditText" @click="setShowPublishCard(false)">
          <div>isEditText</div>
        </div>
      </div>
    </van-overlay>

    <div class="share-btn" @click="openNewPublishCard">Hi, {{ userName }}! What do you want to share?</div>

    <div class="filter-wrapper">
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
        <van-picker :columns="typeFilterList" @cancel="showTypeFilterRef = false" @confirm="onTypeFilterConfirm" />
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
    </div>

    <div class="post-wrapper">
      <PostItemComponent
        v-for="item in postListMap.values()"
        :key="item.id"
        :post="item"
        class="post-item"
        @handleClick="handleLikeClick(item.id)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, Ref } from 'vue';
// import { Toast } from 'vant';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
import PostItemComponent, { Post } from '@/views/post/PostItem.Component.vue';
import { useUserInfo } from '@/context';
import { useScrollBottom, useAxios } from '@/hooks';
import { getPostsApi, postTogglePostLikeApi } from '@/constants';

enum PublishStep {
  chooseType = 1,
  editText = 2,
}

interface FilterItem {
  text: string;
  value: string;
}

const typeFilterList: FilterItem[] = [
  {
    text: 'All',
    value: '0',
  },
  {
    text: 'travel',
    value: '1',
  },
  {
    text: 'dirary',
    value: '2',
  },
];

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
  components: {
    PageHeaderComponent,
    PostItemComponent,
  },
  name: 'PostPage',
  setup() {
    const typeFilterRef = ref(typeFilterList[0]);
    const showTypeFilterRef = ref(false);
    const timeFilterRef = ref(timeFilterList[0]);
    const showTimeFilterRef = ref(false);

    const onTypeFilterConfirm = (filter: FilterItem) => {
      typeFilterRef.value = filter;
      showTypeFilterRef.value = false;
    };

    const onTimeFilterConfirm = (filter: FilterItem) => {
      timeFilterRef.value = filter;
      showTimeFilterRef.value = false;
    };

    const pageRef = ref(1);
    const postListMap: Ref<Map<number, Post>> = ref(new Map([]));

    const axios = useAxios();
    const getPosts = async () => {
      const postListRes = await axios.request({
        ...getPostsApi,
        params: {
          page: pageRef.value,
          timeOrder: timeFilterRef.value.value,
          typeId: typeFilterRef.value.value,
        },
      });

      if (postListRes.data.length === 0) {
        // Toast({
        //   type: 'fail',
        //   message: 'No more posts~',
        //   duration: 0,
        //   className: 'my-toast',
        // });
      }

      for (const item of postListRes.data) {
        postListMap.value.set(item.id, item);
      }
    };

    onMounted(getPosts);

    watch([typeFilterRef, timeFilterRef], () => {
      postListMap.value.clear();
      // postListMap.value = [];
      pageRef.value = 1;
      getPosts();
    });

    const { isScroll2BottomRef, muteRef } = useScrollBottom();
    watch(isScroll2BottomRef, async newValue => {
      if (!newValue) return;

      muteRef.value = true;
      pageRef.value++;

      await getPosts();

      muteRef.value = false;
      isScroll2BottomRef.value = false;
    });

    const handleLikeClick = async (postId: number) => {
      const currentPost = postListMap.value.get(postId);

      if (!currentPost) {
        return;
      }

      currentPost.alreadyLike ? currentPost.postLikes-- : currentPost.postLikes++;
      currentPost.alreadyLike = !currentPost.alreadyLike;

      await axios
        .request({
          ...postTogglePostLikeApi,
          data: {
            postId,
          },
        })
        .catch(() => {
          currentPost.alreadyLike = !currentPost.alreadyLike;
          currentPost.alreadyLike ? currentPost.postLikes++ : currentPost.postLikes--;
        });
    };

    const { userName } = useUserInfo();

    const showPublishCardRef = ref(false);
    const publishStepRef = ref(PublishStep.chooseType);
    const isChooseType = computed(() => publishStepRef.value === PublishStep.chooseType);
    const isEditText = computed(() => publishStepRef.value === PublishStep.editText);

    const setShowPublishCard = (show: boolean) => {
      showPublishCardRef.value = show;
    };

    const goToEditStep = () => {
      publishStepRef.value = PublishStep.editText;
    };

    const openNewPublishCard = () => {
      publishStepRef.value = PublishStep.chooseType;
      showPublishCardRef.value = true;
    };

    return {
      userName,
      typeFilterRef,
      showTypeFilterRef,
      typeFilterList,
      timeFilterList,
      timeFilterRef,
      showTimeFilterRef,
      onTypeFilterConfirm,
      onTimeFilterConfirm,
      postListMap,
      showPublishCardRef,
      setShowPublishCard,
      isChooseType,
      isEditText,
      goToEditStep,
      openNewPublishCard,
      handleLikeClick,
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

    .post-wrapper {
      margin-top: call($fn, 20);

      .post-item {
        margin-bottom: call($fn, 15);
      }
    }
  }
}

@include mediaMixin;
</style>
