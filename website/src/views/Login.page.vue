<template>
  <section class="login-page">
    <img src="http://lxy520.top/images/favicon.png" class="logo" />
    <div class="title">LXY & TSY</div>
    <div class="desc">Welcome to our home</div>
    <input class="input" placeholder="Account" type="text" v-model="accountRef" />
    <input class="input" placeholder="Password" type="password" v-model="passwordRef" />
    <van-button :loading="loadingRef" class="login-button" @click="submitLogin" type="primary">Login</van-button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAxios from '@/hooks/useAxios';
import { useUserInfo } from '@/context';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const accountRef = ref('');
    const passwordRef = ref('');
    const loadingRef = ref(false);

    const router = useRouter();
    const axios = useAxios();
    const { setUserInfo } = useUserInfo();

    const submitLogin = async () => {
      loadingRef.value = true;

      const res = await axios.request({
        url: '/login',
        method: 'post',
        data: {
          account: accountRef.value,
          password: passwordRef.value,
        },
      });

      loadingRef.value = true;

      setUserInfo(res.data);
      router.push('/');
    };

    return {
      accountRef,
      passwordRef,
      loadingRef,
      submitLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  .login-page {
    height: calc(100vh - #{call($fn, 70)});
    padding: 0 $padding;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .logo {
      margin: 0 auto;
      width: call($fn, 100);
    }

    .title {
      margin-top: call($fn, 10);
      text-align: center;
      font-size: call($fn, 18);
      line-height: call($fn, 30);
      font-weight: bold;
    }

    .desc {
      text-align: center;
      font-size: call($fn, 16);
      line-height: call($fn, 24);
      color: $lightTextColor;
    }

    .input {
      margin-top: call($fn, 20);
      border-radius: call($fn, 15);
      // box-shadow: 0 call($fn, 3) call($fn, 6) rgba(241, 95, 136, 0.15);
      border: 1px solid rgba(241, 95, 136, 0.2);
      width: 100%;
      height: call($fn, 50);
      padding: 0 call($fn, 15);
      background: rgba(255, 255, 255, 0.8);
      line-height: call($fn, 50);
      font-size: call($fn, 14);

      &::placeholder {
        font-size: call($fn, 14);
        color: rgba(92, 95, 97, 0.6);
      }
    }

    .login-button {
      margin-top: call($fn, 20);
      border-radius: call($fn, 8);
      box-shadow: 0 call($fn, 12) call($fn, 24) rgba(241, 95, 136, 0.15);
      border: 1px solid #e1e1e2;
      width: 100%;
      height: call($fn, 50);
      background: #f86966;
      color: #fff;
      text-align: center;
      line-height: call($fn, 50);
      font-size: call($fn, 16);
    }
  }
}

@include mediaMixin;
</style>
