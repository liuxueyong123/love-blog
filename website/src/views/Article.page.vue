<template>
  <section class="article-page">article-page</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticlePage',
})
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
}

@media screen and (max-width: 500px) {
  @include mobile(get-function('mobilePx2vw'), $mobilePadding);
}

@media screen and (min-width: 500px) {
  @include mobile(get-function('ipadPx2vw'), $ipadPadding);
}
</style>
