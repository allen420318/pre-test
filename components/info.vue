<template>
  <div
    class="fixed w-full h-full bg-gray-top left-0 top-14 text-gray-700 font-bold text-lg"
  >
    <template v-if="isLogin">
      <div class="bg-lightblue py-5">
        <div class="px-5 flex items-center">
          <img class="w-10" :src="infoData.avatar" />
          <span class="ml-3">{{ infoData.username }}</span>
        </div>
        <div class="w-11/12 h-1 border-t my-5 m-auto"></div>
        <div class="px-5 mb-5">我的課程</div>
        <div class="px-5 mb-5">任務板</div>
        <div class="px-5 mb-5">訂單記錄</div>
        <div class="px-5 mb-5">帳戶設定</div>
        <div class="px-5">我開設的課</div>
      </div>
      <div class="px-5 my-5">探索課程</div>
      <div class="w-11/12 h-1 border-t my-5 m-auto"></div>
      <div class="px-5 mb-5" @click="logout()">登出</div>
    </template>
    <template v-else
      ><div class="px-5 my-5">探索課程</div>
      <div class="px-5">企業方案</div>
      <div class="w-11/12 h-1 border-t my-5 m-auto"></div>
      <div class="px-5 mb-5" @click="openWindow()">登入</div>
      <div class="px-5 text-primary">註冊</div></template
    >
  </div>
</template>
<script>
export default {
  name: 'InfoComponents',
  props: {
    infoData: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      account: '',
      password: '',
    }
  },
  computed: {
    isLogin() {
      const result = localStorage.getItem('token')
      return result
    },
  },
  mounted() {},
  methods: {
    openWindow() {
      this.$emit('openWindow', true)
    },
    logout() {
      localStorage.removeItem('token')
      this.$emit('closeInfo', true)
      this.$store.dispatch('setIsLogin', false)
    },
  },
}
</script>
<style lang="postcss" scoped>
.flexbox {
  @apply flex items-center justify-center;
}
.border-primary {
  border-color: #178fac;
}
.text-primary {
  color: #178fac;
}
.bg-primary {
  background-color: #178fac;
}
.bg-gray-top {
  background: #fafafa;
}
.bg-lightblue {
  background-color: #eff5f8;
}
</style>
