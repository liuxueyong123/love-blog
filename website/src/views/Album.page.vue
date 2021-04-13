<template>
  <section class="album-page">album-page</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AlbumPage',
})
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
}

@media screen and (max-width: 500px) {
  @include mobile(get-function('m-px2vw'), $m-padding);
}

@media screen and (min-width: 500px) {
  @include mobile(get-function('m2ipad'), $ipad-padding);
}
</style>
