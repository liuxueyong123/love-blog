<template>
  <section class="post-item-component">
    <div class="post-header">
      <AvatarComponent class="avatar" :gender="gender" />
      <div class="right">
        <div class="name">{{ post.writer }}</div>
        <div class="date">{{ publishTime }}</div>
      </div>
    </div>
    <div class="post-content">
      <div class="content">{{ post.content }}</div>
      <div class="post-image-wrapper" v-if="imgListRef && imgListRef.length > 0">
        <van-image
          v-for="(img, index) in imgListRef"
          :key="index"
          fit="cover"
          @click="handleImageClick(index)"
          class="post-image"
          :src="img"
        />
      </div>
    </div>
    <div class="post-comment-wrapper">
      <div class="comment-item" v-for="(item, index) in post.postComments" :key="index">
        <span class="name">{{ item.writer }}：</span>
        <span class="comment">{{ item.content }}</span>
      </div>
    </div>
    <div class="post-handler-wrapper">
      <GiveLikeComponent :alreadyLike="post.alreadyLike" :likeCount="post.postLikes" @handleClick="handleLikeClick" />
      <div class="right">
        <input type="text" class="comment-input" v-model="commentRef" placeholder="Leave a comment..." />
        <div class="post-icon" @click="handleCommentSubmit"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import moment from 'moment';
import { ImagePreview } from 'vant';
import AvatarComponent from '@/components/AvatarComponent.vue';
import GiveLikeComponent from '@/components/GiveLike.component.vue';
import { GenderList } from '@/constants';

interface PostCommentItem {
  content: string;
  writer: string;
}

export interface Post {
  id: number;
  gender: number;
  writer: string;
  publishTime: string;
  content: string;
  imgList: string;
  postLikes: number;
  alreadyLike: boolean;
  postComments: PostCommentItem[];
}

export default defineComponent({
  name: 'PostItemComponent',
  components: {
    AvatarComponent,
    GiveLikeComponent,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ['handleLikeClick', 'handleCommentSubmit'],
  setup(props, context) {
    const publishTime = computed(() => moment(props.post.publishTime).format('YYYY-MM-DD HH:mm'));
    const gender = computed(() => GenderList[props.post.gender]);

    const commentRef = ref('');

    const handleCommentSubmit = () => {
      context.emit('handleCommentSubmit', props.post.id, commentRef);
    };

    const handleLikeClick = () => {
      context.emit('handleLikeClick');
    };

    const imgListRef = computed(() => (props.post.imgList ? JSON.parse(props.post.imgList) : []));
    const handleImageClick = (index: number) => {
      ImagePreview({
        images: imgListRef.value,
        startPosition: index,
        closeable: true,
      });
    };

    return {
      gender,
      publishTime,
      commentRef,
      handleCommentSubmit,
      handleLikeClick,
      handleImageClick,
      imgListRef,
    };
  },
});
</script>

<style scoped lang="scss">
@mixin mobile($fn, $padding) {
  .post-item-component {
    width: 100%;
    background: rgba(255, 255, 255, 0.7);
    border-radius: call($fn, 8);
    border: call($fn, 1) solid #e1e1e2;
    box-shadow: 0 call($fn, 1) call($fn, 2) #e1e1e2;
    padding: call($fn, 10) call($fn, 15);
    animation: fadeIn 0.8s ease;

    .post-header {
      width: 100%;
      height: call($fn, 40);
      display: flex;
      align-items: center;

      .avatar {
        width: call($fn, 40);
        height: call($fn, 40);
      }

      .right {
        margin-left: call($fn, 5);

        .name {
          font-size: call($fn, 12);
          line-height: 1;
        }

        .date {
          margin-top: call($fn, 4);
          font-size: call($fn, 10);
          line-height: 1;
          color: $lightTextColor;
        }
      }
    }

    .post-content {
      margin-top: call($fn, 10);
      border-top: 1px solid #eaecef;
      border-bottom: 1px solid #eaecef;
      padding-top: call($fn, 10);
      padding-bottom: call($fn, 10);

      .content {
        font-size: call($fn, 14);
        line-height: 1.2;
        color: $lightTextColor;
        white-space: pre-wrap;
        word-break: break-all;
      }

      .post-image-wrapper {
        margin-top: call($fn, 10);
        display: flex;
        flex-wrap: wrap;

        .post-image {
          flex: 0 0 call($fn, 95);
          width: call($fn, 95);
          height: call($fn, 95);
          margin-right: call($fn, 9);
          border-radius: call($fn, 3);
          overflow: hidden;

          &:nth-child(n + 4) {
            margin-top: call($fn, 10);
          }

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }

    .post-comment-wrapper {
      margin-top: call($fn, 10);

      .comment-item {
        &:nth-child(n + 2) {
          margin-top: call($fn, 5);
        }

        .name {
          font-size: call($fn, 12);
          line-height: 1;
        }

        .comment {
          font-size: call($fn, 12);
          line-height: 1;
          color: $lightTextColor;
        }
      }
    }

    .post-handler-wrapper {
      padding-top: call($fn, 10);
      display: flex;
      justify-content: space-between;

      .right {
        flex: 0 0 75%;
        width: 75%;
        height: call($fn, 34);
        position: relative;

        .comment-input {
          margin-top: call($fn, 3);
          height: call($fn, 34);
          width: 100%;
          outline: none;
          border-radius: call($fn, 30);
          padding-left: call($fn, 20);
          padding-right: call($fn, 40);
          border: call($fn, 1) solid #eaecef;
          font-size: call($fn, 12);
          color: $lightTextColor;
          line-height: call($fn, 32);

          &::placeholder {
            font-size: call($fn, 12);
            color: $lightTextColor;
            line-height: call($fn, 32);
            opacity: 0.5;
          }
        }

        .post-icon {
          position: absolute;
          right: call($fn, 10);
          top: call($fn, 8);
          height: call($fn, 24);
          width: call($fn, 24);
          background-image: url('http://lxy520.top/images/icon-post-post-comment.png');
          background-size: 100% 100%;
        }
      }
    }
  }
}

@include mediaMixin;
</style>
