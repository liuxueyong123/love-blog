<template>
  <section class="post-page">
    <PageHeaderComponent icon="http://lxy520.top/images/nav-icon-post.png" title="Posts" />

    <PublishPanel :postTypeList="postTypeListRef" @handleAfterPublish="handleAfterPublish" />

    <FiltersPanel
      ref="filterPanelComponentRef"
      :postTypeList="postTypeListRef"
      @handleFilterChange="handleFilterChange"
    />

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
import { defineComponent, ref, onMounted, Ref } from 'vue';
import { Toast } from 'vant';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
import PublishPanel from '@/views/post/Publish.panel.vue';
import FiltersPanel from '@/views/post/Filters.Panel.vue';
import PostItemComponent, { Post } from '@/views/post/PostItem.Component.vue';
import { useUserInfo } from '@/context';
import { useScrollBottom, useAxios } from '@/hooks';
import { getPostsApi, postTogglePostLikeApi, postPostCommentApi, getPostTypesApi } from '@/constants';

export interface PostTypeItem {
  id: number;
  typeName: string;
  typeDetail: string;
  typeIcon: string;
}

export default defineComponent({
  components: {
    PageHeaderComponent,
    PostItemComponent,
    FiltersPanel,
    PublishPanel,
  },
  name: 'PostPage',
  setup() {
    const { userName } = useUserInfo();
    const axios = useAxios();

    const postTypeListRef: Ref<PostTypeItem[]> = ref([]);
    onMounted(async () => {
      const postTypes = await axios.request(getPostTypesApi);

      postTypeListRef.value = postTypes.data;
    });

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

    const handleAfterPublish = () => {
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

    return {
      postTypeListRef,
      postListMap,
      handleLikeClick,
      handleCommentSubmit,
      handleFilterChange,
      filterPanelComponentRef,
      handleAfterPublish,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  .post-page {
    width: 100%;
    padding: 0 $padding;

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
