<template>
  <section class="avatar-component">
    <img class="avatar" :src="avatarLink" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AvatarComponent',
  props: {
    gender: {
      type: String as PropType<'male' | 'female'>,
      required: true,
    },
  },
  setup(props) {
    const avatarLink = computed(() => `http://lxy520.top/images/avatar-${props.gender}.png`);

    return {
      avatarLink,
    };
  },
});
</script>
<style scoped lang="scss">
@mixin mobile($fn, $padding) {
  .avatar-component {
    width: 100%;
    height: 100%;

    .avatar {
      width: 100%;
      height: 100%;
    }
  }
}

@include mediaMixin;
</style>
