<template>
  <div class="page-header">
    <div class="header-left">
      <img class="header-icon" :src="icon" />
      <div class="header-title">{{ title }}</div>
    </div>
    <AvatarComponent class="header-avatar" gender="female" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AvatarComponent from '@/components/AvatarComponent.vue'

export default defineComponent({
  components: {
    AvatarComponent,
  },
  name: 'PageHeader',
  props: {
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  .page-header {
    height: call($fn, 50);
    width: 100%;
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;

      .header-icon {
        width: call($fn, 50);
        height: call($fn, 50);
      }

      .header-title {
        line-height: call($fn, 50);
        font-size: call($fn, 20);
        font-weight: bold;
        margin-left: call($fn, 10);
      }
    }

    .header-avatar {
      width: call($fn, 50);
      height: call($fn, 50);
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
