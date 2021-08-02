<template>
  <div id="layout">
    <router-view />
    <MenuComponent class="menu-component" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, reactive } from 'vue';
import MenuComponent from '@/components/MenuComponent.vue';
import {
  UserInfoContext,
  SetUserInfoContext,
  initialUserInfo,
  USER_INFO_CONTEXT,
  SET_USER_INFO_CONTEXT,
} from '@/context';
import useAxios from '@/hooks/useAxios';
import { whiteRouteList } from '@/router';
import { getUserInfoApi } from '@/constants';

export default defineComponent({
  name: 'App',
  components: {
    MenuComponent,
  },
  setup() {
    const userInfo: UserInfoContext = reactive(initialUserInfo);
    const setUserInfo: SetUserInfoContext = (_userInfo: UserInfoContext) => {
      userInfo.id = _userInfo.id;
      userInfo.name = _userInfo.name;
      userInfo.gender = _userInfo.gender;
    };

    provide(USER_INFO_CONTEXT, userInfo);
    provide(SET_USER_INFO_CONTEXT, setUserInfo);

    const axios = useAxios();

    onMounted(async () => {
      if (whiteRouteList.includes(location.pathname)) {
        return;
      }

      const userRes = await axios.request(getUserInfoApi);

      setUserInfo(userRes.data);
    });
  },
});
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  #layout {
    width: 100vw;
    min-height: 100vh;
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

  @media screen and (min-width: 500px) {
    #layout {
      border-left: 1px solid #e6f3fe;
      border-right: 1px solid #e6f3fe;
      padding-top: call($fn, 20);
    }
  }
}

@include mediaMixin;
</style>
