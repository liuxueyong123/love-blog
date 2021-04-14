<template>
  <div id="layout">
    <router-view />
    <MenuComponent class="menu-component" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuComponent from '@/components/MenuComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    MenuComponent,
  },
})
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  #layout {
    width: 100vw;
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    overflow: auto;
    padding-top: call($fn, 20);
    padding-bottom: call($fn, 50);

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: url('http://lxy520.top/images/layout-background-1.png');
      background-size: 100% 100%;
      opacity: 0.8;
      content: '';
      z-index: -1;
    }

    .menu-component {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 500px;
      margin: 0 auto;
    }
  }
}

@media screen and (min-width: 500px) {
  #layout {
    border-left: 1px solid #e6f3fe;
    border-right: 1px solid #e6f3fe;
    padding-top: ipadPx2vw(20);
  }
}

@include mediaMixin;
</style>
