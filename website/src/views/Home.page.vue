<template>
  <div class="home-page">
    <header>
      <div class="name-wrapper">
        <div class="name">Hi, {{ userName }}</div>
        <div class="greet">Good {{ greeting }}!</div>
      </div>
      <AvatarComponent class="avatar" :gender="userGender" />
    </header>

    <img class="banner-image" src="http://lxy520.top/images/homepage-banner-1.png" />

    <div class="section-title">Menu</div>
    <div class="menu-wrapper">
      <router-link class="menu-item" v-for="(item, index) in menuList" :key="index" :to="{ name: item.routeName }">
        <img class="item-image" :src="item.imgUrl" />
        <div class="item-title">{{ item.name }}</div>
      </router-link>
    </div>

    <div class="section-title">Recent Articles</div>
    <div class="article-wrapper">
      <div class="article-item" v-for="(item, index) in articleList" :key="index">
        <img class="item-image" :src="`http://lxy520.top/images/article-icon-${index + 1}.png`" />
        <div class="item-right">
          <div class="item-name">{{ item.title }}</div>
          <div class="item-writer-info">
            <AvatarComponent class="writer-avatar" :gender="GenderList[item.gender]" />
            <div class="writer-name">{{ item.userName }}</div>
          </div>
          <div class="item-time">{{ item.publishTime }}</div>
        </div>
      </div>
    </div>

    <div class="section-title">Recent Posts</div>
    <div class="post-wrapper">
      <div class="post-item" v-for="item in postList.values()" :key="item.id">
        <AvatarComponent class="item-avatar" :gender="GenderList[item.gender]" />
        <div class="item-name">{{ item.userName }}</div>
        <div class="item-content">{{ item.articleContent }}</div>
        <GiveLikeComponent
          :alreadyLike="item.alreadyLike"
          :likeCount="item.postLikes"
          @handleClick="handleLikeClick(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import AvatarComponent from '@/components/AvatarComponent.vue';
import GiveLikeComponent from '@/components/GiveLike.component.vue';
import { GenderList, MyRouterList, getRecentPostApi, postTogglePostLikeApi, getRecentArticleApi } from '@/constants';
import { greeting } from '@/utils';
import { useUserInfo } from '@/context';
import useAxios from '@/hooks/useAxios';

interface PostItem {
  gender: number;
  userName: string;
  articleContent: string;
  postLikes: number;
  alreadyLike: boolean;
  id: number;
}

interface ArticleItem {
  id: string;
  articleName: string;
  userName: string;
  gender: number;
  publishTime: string;
}

const menuList = [
  {
    name: 'Article',
    routeName: MyRouterList.ArticlePage,
    imgUrl: 'http://lxy520.top/images/homepage-menu-article.png',
  },
  {
    name: 'Post',
    routeName: MyRouterList.PostPage,
    imgUrl: 'http://lxy520.top/images/homepage-menu-post.png',
  },
  {
    name: 'Album',
    routeName: MyRouterList.AlbumPage,
    imgUrl: 'http://lxy520.top/images/homepage-menu-album.png',
  },
  {
    name: 'Message',
    routeName: MyRouterList.HomePage,
    imgUrl: 'http://lxy520.top/images/homepage-menu-message.png',
  },
];

export default defineComponent({
  name: 'HomePage',
  components: {
    AvatarComponent,
    GiveLikeComponent,
  },
  setup() {
    const articleList: Ref<ArticleItem[]> = ref([]);
    const postList: Ref<Map<number, PostItem>> = ref(new Map([]));

    const { userName, userGender } = useUserInfo();
    const axios = useAxios();

    const handleLikeClick = async (id: number) => {
      const item = postList.value.get(id);
      if (!item) {
        return;
      }

      item.alreadyLike ? item.postLikes-- : item.postLikes++;
      item.alreadyLike = !item.alreadyLike;

      await axios
        .request({
          ...postTogglePostLikeApi,
          data: {
            postId: id,
          },
        })
        .catch(() => {
          item.alreadyLike = !item.alreadyLike;
          item.alreadyLike ? item.postLikes++ : item.postLikes--;
        });
    };

    onMounted(async () => {
      const postListRes = await axios.request(getRecentPostApi);
      const articleListRes = await axios.request(getRecentArticleApi);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      postList.value = new Map(postListRes.data.map((x: any) => [x.id, x]));
      articleList.value = articleListRes.data;
    });

    return {
      menuList,
      articleList,
      postList,
      handleLikeClick,
      userName,
      userGender,
      GenderList,
      greeting,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  .home-page {
    width: 100%;
    padding: 0 $padding;
    padding-bottom: call($fn, 50);

    .section-title {
      margin-top: call($fn, 20);
      margin-bottom: call($fn, 10);
      line-height: call($fn, 30);
      font-size: call($fn, 18);
      font-weight: bold;
    }

    header {
      height: call($fn, 60);
      display: flex;
      justify-content: space-between;

      .name-wrapper {
        height: 100%;
        padding-top: call($fn, 5);

        .name {
          line-height: call($fn, 25);
          font-size: call($fn, 20);
          color: $lightTextColor;
        }

        .greet {
          line-height: call($fn, 25);
          font-size: call($fn, 20);
          font-weight: bold;
        }
      }

      .avatar {
        width: call($fn, 60);
        height: call($fn, 60);
      }
    }

    .banner-image {
      margin-top: call($fn, 15);
      width: 100%;
      height: auto;
      border-radius: call($fn, 15);
    }

    .menu-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .menu-item {
        width: 47%;
        height: call($fn, 40);
        border-radius: call($fn, 5);
        background: rgba(255, 255, 255, 0.6);
        padding: call($fn, 5) call($fn, 10);
        display: flex;
        box-shadow: 0 1px 2px #e1e1e2;

        &:nth-child(n + 3) {
          margin-top: call($fn, 10);
        }

        .item-image {
          height: 100%;
          width: auto;
          display: block;
        }

        .item-title {
          line-height: call($fn, 30);
          font-size: call($fn, 16);
          font-weight: bold;
          margin-left: call($fn, 10);
        }
      }
    }

    .article-wrapper {
      width: 100%;

      .article-item {
        width: 100%;
        height: call($fn, 80);
        background: rgba(255, 255, 255, 0.7);
        border-radius: call($fn, 8);
        box-shadow: 0 1px 2px #e1e1e2;
        display: flex;
        padding: call($fn, 10) call($fn, 10);
        margin-top: call($fn, 10);
        animation: fadeIn 0.8s ease;

        .item-image {
          display: block;
          height: call($fn, 60);
          width: call($fn, 60);
        }

        .item-right {
          margin-left: call($fn, 10);

          .item-name {
            font-size: call($fn, 16);
            line-height: call($fn, 20);
            font-weight: bold;
          }

          .item-writer-info {
            display: flex;
            height: call($fn, 20);
            margin-top: call($fn, 5);

            .writer-avatar {
              margin-top: call($fn, 1);
              height: call($fn, 18);
              width: call($fn, 18);
              display: block;
            }

            .writer-name {
              margin-left: call($fn, 5);
              font-size: call($fn, 12);
              line-height: call($fn, 20);
              color: $lightTextColor;
            }
          }

          .item-time {
            font-size: call($fn, 12);
            line-height: call($fn, 20);
            color: $lightTextColor;
          }
        }
      }
    }

    .post-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .post-item {
        background: rgba(255, 255, 255, 0.7);
        border-radius: call($fn, 8);
        box-shadow: 0 1px 2px #e1e1e2;
        flex: 0 0 47%;
        width: 47%;
        height: call($fn, 180);
        padding: call($fn, 10) call($fn, 15);
        animation: fadeIn 0.8s ease;

        &:nth-child(n + 3) {
          margin-top: call($fn, 10);
        }

        .item-avatar {
          width: call($fn, 50);
          height: call($fn, 50);
        }

        .item-name {
          margin-top: call($fn, 5);
          font-size: call($fn, 16);
          line-height: call($fn, 20);
          font-weight: bold;
        }

        .item-content {
          margin-top: call($fn, 10);
          font-size: call($fn, 14);
          line-height: call($fn, 18);
          color: $lightTextColor;
          height: call($fn, 36);
          white-space: pre-wrap;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; //显示的行
        }
      }
    }
  }
}

@include mediaMixin;
</style>
