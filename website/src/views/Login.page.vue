<template>
  <section class="login-page">
    <input type="text" v-model="accountRef" />
    <input type="password" v-model="passwordRef" />
    <button @click="submitLogin">提交</button>
    <div style="height: 1000px"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const internalInstance = getCurrentInstance() as ComponentInternalInstance
    const axios = internalInstance.appContext.config.globalProperties.$axios

    const accountRef = ref('')
    const passwordRef = ref('')
    const router = useRouter()

    const submitLogin = async () => {
      await axios.request({
        url: '/login',
        method: 'post',
        data: {
          account: accountRef.value,
          password: passwordRef.value,
        },
      })

      router.push('/')
    }

    return {
      accountRef,
      passwordRef,
      submitLogin,
    }
  },
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
