<template>
  <section class="menu-component">
    <div class="menu-wrapper">
      <router-link v-for="item in menuList" :key="item.id" :to="{ name: item.to }" class="menu-item">
        <img class="item-icon" :src="item.imgUrl" />
        <div class="item-selected" v-if="item.routes.includes($route.name)"></div>
      </router-link>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';

const menuList = [
  {
    id: 1,
    imgUrl: 'http://lxy520.top/images/nav-icon-home.png',
    routes: ['HomePage'],
    to: 'HomePage',
  },
  {
    id: 2,
    imgUrl: 'http://lxy520.top/images/nav-icon-article.png',
    routes: ['ArticlePage'],
    to: 'ArticlePage',
  },
  {
    id: 3,
    imgUrl: 'http://lxy520.top/images/nav-icon-post.png',
    routes: ['PostPage'],
    to: 'PostPage',
  },
  {
    id: 4,
    imgUrl: 'http://lxy520.top/images/nav-icon-album.png',
    routes: ['AlbumPage'],
    to: 'AlbumPage',
  },
];

export default defineComponent({
  name: 'MenuComponent',
  setup() {
    return {
      menuList,
    };
  },
});
</script>
<style scoped lang="scss">
@mixin mobile($fn, $padding) {
  .menu-component {
    width: 100%;
    background: rgba(250, 250, 250);
    height: call($fn, 50);
    box-shadow: 0 -1px 3px 0 #e1e1e2;

    .menu-wrapper {
      width: 100%;
      padding: 0 $padding;
      display: flex;

      .menu-item {
        width: 25%;
        display: block;

        .item-icon {
          margin: 0 auto;
          margin-top: call($fn, 10);
          display: block;
          width: call($fn, 30);
          height: call($fn, 30);
        }

        .item-selected {
          width: 50%;
          margin: 0 auto;
          margin-top: call($fn, 3);
          height: call($fn, 3);
          border-radius: call($fn, 1);
          background: $primaryBackgroundColor;
          animation: scaleIn 0.7s;
        }
      }
    }
  }
}

@include mediaMixin;
</style>
