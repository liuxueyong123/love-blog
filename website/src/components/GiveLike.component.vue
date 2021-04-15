<template>
  <section class="give-like-component">
    <div class="like-icon" :class="{ 'lick-icon-animation': alreadyLike }" @click="$emit('handleClick')"></div>
    <div class="like-content">{{ likeCount }} like</div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'GiveLikeComponent',
  props: {
    alreadyLike: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    likeCount: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  emits: ['handleClick'],
});
</script>

<style scoped lang="scss">
@mixin mobile($fn, $padding) {
  .give-like-component {
    display: flex;
    margin-left: call($fn, -15);

    .like-icon {
      display: block;
      width: call($fn, 40);
      height: call($fn, 40);
      background-image: url('http://lxy520.top/images/icon-like.png');
      background-repeat: no-repeat;
      background-size: 2900%; //爱心图片的像素大小为2900*100
    }

    .lick-icon-animation {
      animation: mymoveOK 0.8s linear;
      animation-fill-mode: forwards; //动画结束时固定在最后一帧
      animation-timing-function: steps(28); //非常重要的属性  没有TA，动画就no OK
    }

    .like-content {
      font-size: call($fn, 14);
      line-height: call($fn, 20);
      margin-top: call($fn, 10);
    }
  }
}

@include mediaMixin;
</style>
