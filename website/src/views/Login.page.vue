<template>
  <section class="login-page">
    <input type="text" v-model="accountRef" />
    <input type="password" v-model="passwordRef" />
    <button @click="submitLogin">提交</button>
    <div style="height: 1000px"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAxios from '@/hooks/useAxios';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const accountRef = ref('');
    const passwordRef = ref('');

    const router = useRouter();
    const axios = useAxios();

    const submitLogin = async () => {
      await axios.request({
        url: '/login',
        method: 'post',
        data: {
          account: accountRef.value,
          password: passwordRef.value,
        },
      });

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
}

@include mediaMixin;
</style>
