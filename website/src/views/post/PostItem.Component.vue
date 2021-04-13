<template>
  <section class="post-item-component">
    <div class="post-header">
      <AvatarComponent class="avatar" gender="female" />
      <div class="right">
        <div class="name">Sayyeah°</div>
        <div class="date">2021/03/31 10:56</div>
      </div>
    </div>
    <div class="post-content">
      具体内容见：其中现有页面问题及页面逻辑问题需要一起调整，如调整过程中有问题可以在相应页面备注
    </div>
    <div class="post-comment-wrapper">
      <div class="comment-item">
        <span class="name">Sayyeah°：</span>
        <span class="comment">这是我的评论～这是我的评论～这是我的评论～这是我的评论～</span>
      </div>
      <div class="comment-item">
        <span class="name">Sayyeah°：</span>
        <span class="comment">这是我的评论～这是我的评论～这是我的评论～这是我的评论～</span>
      </div>
    </div>
    <div class="post-handler-wrapper">
      <GiveLikeComponent :alreadyLike="alreadyLike" :likeCount="iconNumber" @handleClick="handleLikeClick(id)" />
      <div class="right">
        <input type="text" class="comment-input" placeholder="Write a comment..." />
        <div class="post-icon"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AvatarComponent from '@/components/AvatarComponent.vue'
import GiveLikeComponent from '@/components/GiveLike.component.vue'

export default defineComponent({
  name: 'PostItemComponent',
  components: {
    AvatarComponent,
    GiveLikeComponent,
  },
})
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
      font-size: call($fn, 14);
      line-height: 1.2;
      color: $lightTextColor;
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
          padding-right: call($fn, 30);
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

@media screen and (max-width: 500px) {
  @include mobile(get-function('mobilePx2vw'), $mobilePadding);
}

@media screen and (min-width: 500px) {
  @include mobile(get-function('ipadPx2vw'), $ipadPadding);
}
</style>
