<template>
  <div class="h-12 bg-white shadow-md z-10 relative">
    <div class="max-w-7xl m-auto flex justify-between h-full px-3 md:px-0">
      <div class="flex items-center text-sm">
        <img
          class="h-3.5 mr-2"
          :class="{ 'md:mr-8': infoData }"
          src="~/assets/images/hiskio.png"
        />
        <template v-if="!infoData"
          ><img
            class="hidden h-10 mr-2 md:block"
            src="~/assets/images/recruit.png"
          />
          <div class="hidden md:flex items-center text-gray-600 mr-4 font-bold">
            <img class="h-4 mr-1" src="~/assets/images/grid.png" />課程
          </div>
        </template>
        <div class="flex items-center text-gray-400">
          <img class="h-4 mr-1" src="~/assets/images/search.png" /><span
            class="hidden md:block"
            >搜尋</span
          >
        </div>
      </div>
      <div class="flex items-center text-sm">
        <template v-if="!infoData">
          <span class="hidden md:block text-gray-600 mr-3 font-bold"
            >我想開課</span
          >
        </template>
        <template v-else>
          <span class="hidden md:block text-gray-600 mr-3">任務版</span>
          <span class="hidden md:block text-gray-600 mr-3">我的課程</span>
        </template>

        <img class="h-5 mr-3" src="~/assets/images/shopping.png" />
        <img
          class="hidden md:block h-5 mr-5"
          src="~/assets/images/question.png"
        />
        <img
          v-if="!infoStatus"
          class="block md:hidden h-5"
          src="~/assets/images/menu.png"
          @click="infoStatus = true"
        />
        <img
          v-else
          class="block md:hidden h-5"
          src="~/assets/images/close.png"
          @click="infoStatus = false"
        />
        <template v-if="!infoData">
          <div
            class="hidden md:flex items-center justify-center w-16 h-8 text-primary border border-primary rounded mr-2 font-bold"
            @click="loginStatus = true"
          >
            登入
          </div>
          <div
            class="hidden md:flex items-center justify-center w-16 h-8 text-white bg-primary rounded font-bold"
          >
            註冊
          </div>
        </template>
        <template v-else>
          <img class="hidden md:block w-8" :src="infoData.avatar" />
        </template>
      </div>
    </div>
    <login v-if="loginStatus" @closeWindow="closeWindow" />
    <info
      v-if="infoStatus"
      :info-data="infoData"
      @openWindow="openWindow"
      @closeInfo="closeInfo"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { personalInfo } from '@/api/index.js'
export default {
  name: 'HeaderComponents',
  data() {
    return {
      loginStatus: false,
      infoStatus: false,
      infoData: null,
    }
  },
  computed: {
    ...mapState(['isLogin']),
  },
  watch: {
    isLogin() {
      this.infoData = null
      this.getPersonalInfo()
    },
  },
  mounted() {
    localStorage.getItem('token') && this.getPersonalInfo()
  },
  methods: {
    async getPersonalInfo() {
      try {
        const res = await personalInfo()
        this.infoData = res
      } catch (err) {
        console.err(err)
      }
    },
    closeWindow(type) {
      if (type === 'submit') {
        this.getPersonalInfo()
        this.$store.dispatch('setIsLogin', true)
      }
      this.loginStatus = false
    },
    openWindow() {
      this.loginStatus = true
      this.infoStatus = false
    },
    closeInfo() {
      this.infoStatus = false
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
</style>
