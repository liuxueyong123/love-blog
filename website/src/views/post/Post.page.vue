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

    <FiltersPanel ref="filterPanelComponentRef" @handleFilterChange="handleFilterChange" />

    <div class="post-wrapper">
      <PostItemComponent
        v-for="item in postListMap.values()"
        :key="item.id"
        :post="item"
        class="post-item"
        @handleLikeClick="handleLikeClick(item.id)"
        @handleCommentSubmit="handleCommentSubmit"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, Ref } from 'vue';
import { Toast } from 'vant';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
import FiltersPanel from '@/views/post/Filters.Panel.vue';
import PostItemComponent, { Post } from '@/views/post/PostItem.Component.vue';
import { useUserInfo } from '@/context';
import { useScrollBottom, useAxios } from '@/hooks';
import { getPostsApi, postTogglePostLikeApi, postPostCommentApi } from '@/constants';

enum PublishStep {
  chooseType = 1,
  editText = 2,
}

export default defineComponent({
  components: {
    PageHeaderComponent,
    PostItemComponent,
    FiltersPanel,
  },
  name: 'PostPage',
  setup() {
    const { userName } = useUserInfo();
    const axios = useAxios();

    const filterPanelComponentRef: Ref<typeof FiltersPanel | null> = ref(null);
    const pageRef = ref(1);
    const postListMap: Ref<Map<number, Post>> = ref(new Map([]));

    const getPosts = async () => {
      const filterPanelComponent = filterPanelComponentRef.value as typeof FiltersPanel;

      const postListRes = await axios.request({
        ...getPostsApi,
        params: {
          page: pageRef.value,
          timeOrder: filterPanelComponent.timeFilterRef.value,
          typeId: filterPanelComponent.typeFilterRef.value,
        },
      });

      if (postListRes.data.length === 0) {
        Toast({
          type: 'fail',
          message: 'No more posts~',
          duration: 1000,
          className: 'my-toast',
        });
        return;
      }

      for (const item of postListRes.data) {
        postListMap.value.set(item.id, item);
      }

      pageRef.value++;
    };

    onMounted(getPosts);

    const handleFilterChange = () => {
      postListMap.value.clear();
      pageRef.value = 1;
      getPosts();
    };

    useScrollBottom(getPosts);

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
        .catch(err => {
          currentPost.alreadyLike = !currentPost.alreadyLike;
          currentPost.alreadyLike ? currentPost.postLikes++ : currentPost.postLikes--;
          throw new Error(err);
        });
    };

    const handleCommentSubmit = async (postId: number, comment: Ref<string>) => {
      const currentPost = postListMap.value.get(postId);

      if (!currentPost) {
        return;
      }

      await axios.request({
        ...postPostCommentApi,
        data: {
          postId,
          comment: comment.value,
        },
      });

      currentPost.postComments.push({
        writer: userName.value,
        content: comment.value,
      });

      comment.value = '';
    };

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
      postListMap,
      showPublishCardRef,
      setShowPublishCard,
      isChooseType,
      isEditText,
      goToEditStep,
      openNewPublishCard,
      handleLikeClick,
      handleCommentSubmit,
      handleFilterChange,
      filterPanelComponentRef,
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

    // .filter-wrapper {
    //   margin-top: call($fn, 20);
    //   width: 100%;
    //   display: flex;
    //   justify-content: space-between;

    //   .filter {
    //     width: 45%;
    //     flex: 0 0 45%;
    //     height: call($fn, 40);
    //     line-height: call($fn, 40);
    //     padding: 0 call($fn, 10);
    //     background: rgba(255, 255, 255, 0.7);
    //     border-radius: call($fn, 8);
    //     border: 1px solid #e1e1e2;
    //     box-shadow: 0 1px 2px #e1e1e2;

    //     &::v-deep(.van-cell__title) {
    //       width: 40%;
    //       margin-right: 0;

    //       .span {
    //         color: $lightTextColor;
    //         font-size: call($fn, 12);
    //       }
    //     }

    //     &::v-deep(.van-cell__value) {
    //       .van-field__control {
    //         color: $textColor;
    //         font-size: call($fn, 14);
    //       }
    //     }
    //   }
    // }

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
