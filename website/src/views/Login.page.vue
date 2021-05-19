<template>
  <section class="login-page">
    <div class="input-wrapper">
      <div class="title">Account:</div>
      <input type="text" v-model="accountRef" />
    </div>

    <div class="input-wrapper">
      <div class="title">Password:</div>
      <input type="password" v-model="passwordRef" />
    </div>

    <button class="submit-btn" @click="submitLogin">Login</button>
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

    const router = useRouter();
    const axios = useAxios();
    const { setUserInfo } = useUserInfo();

    const submitLogin = async () => {
      const res = await axios.request({
        url: '/login',
        method: 'post',
        data: {
          account: accountRef.value,
          password: passwordRef.value,
        },
      });

      setUserInfo(res.data);
      router.push('/');
    };

    return {
      accountRef,
      passwordRef,
      submitLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin mobile($fn, $padding) {
  .login-page {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .input-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: call($fn, 10);

      .title {
        margin-right: call($fn, 20);
        text-align: right;
        flex: 0 0 20%;
      }
    }

    .submit-btn {
      width: call($fn, 200);
      margin: 0 auto;
    }
  }
}

@include mediaMixin;
</style>
