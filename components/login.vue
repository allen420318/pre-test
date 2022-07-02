<template>
  <div class="flex justify-center">
    <div
      class="bg-black w-full h-full fixed top-0 left-0 opacity-70 z-10"
    ></div>
    <div
      class="w-full md:w-96 bg-white fixed rounded m-auto top-0 z-20 p-5 h-full overflow-auto"
    >
      <img
        class="h-3 float-right"
        src="~/assets/images/close.png"
        @click="closeWindow()"
      />
      <img class="h-3.5 m-auto" src="~/assets/images/hiskio.png" />
      <div class="flex justify-around px-10 py-5">
        <div
          class="text-3xl font-bold text-primary p-2 border-b-4 border-primary"
        >
          登入
        </div>
        <div class="text-3xl font-bold text-gray-300 p-2">註冊</div>
      </div>
      <div
        class="flex items-center justify-center border rounded w-3/4 m-auto h-12 mb-2"
      >
        <img class="h-7" src="~/assets/images/facebook.png" />
        <div class="font-bold text-gray-600 ml-2 w-40">使用 Facebook 登入</div>
      </div>
      <div
        class="flex items-center justify-center border rounded w-3/4 m-auto h-12 mb-2"
      >
        <img class="h-7" src="~/assets/images/google.png" />
        <div class="font-bold text-gray-600 ml-2 w-40">使用 Google 登入</div>
      </div>
      <div
        class="flex items-center justify-center border rounded w-3/4 m-auto h-12 mb-2"
      >
        <img class="h-7" src="~/assets/images/github.png" />
        <div class="font-bold text-gray-600 ml-2 w-40">使用 Github 登入</div>
      </div>
      <div
        class="flex items-center justify-center border rounded w-3/4 m-auto h-12 mb-2"
      >
        <img class="h-7" src="~/assets/images/linkedIn.png" />
        <div class="font-bold text-gray-600 ml-2 w-40">使用 LinkedIn 登入</div>
      </div>
      <div class="text-center font-bold text-gray-600 my-5">
        使用 HiSKIO ID 登入
      </div>
      <div class="flex items-center bg-gray-50 rounded w-3/4 m-auto h-10 mb-2">
        <img class="h-5 mx-2" src="~/assets/images/account.png" />
        <input
          v-model="account"
          type="text"
          placeholder="請輸入 HiSKIO ID"
          class="outline-none bg-transparent"
        />
      </div>
      <div class="flex items-center bg-gray-50 rounded w-3/4 m-auto h-10 mb-2">
        <img class="h-5 mx-2" src="~/assets/images/lock.png" />
        <input
          v-model="password"
          type="password"
          placeholder="請輸入登入密碼"
          class="outline-none bg-transparent"
        />
      </div>
      <div class="flex items-center text-gray-500 text-sm w-3/4 m-auto my-5">
        <input id="box" class="mr-1 h-4 w-4" type="checkBox" />
        <label for="box"
          >登入註冊即代表您同意
          <span class="underline">使用者及隱私權政策</span></label
        >
      </div>
      <div
        class="flexbox text-white w-3/4 m-auto bg-primary rounded h-10 my-5"
        @click="login()"
      >
        登入
      </div>
      <div class="text-gray-500 text-center">忘記密碼</div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/index.js'
export default {
  name: 'LoginComponents',
  data() {
    return {
      account: '',
      password: '',
    }
  },
  computed: {},
  mounted() {},
  methods: {
    async login() {
      const payload = {
        account: this.account,
        password: this.password,
      }
      try {
        const res = await login(payload)
        const tokenType =
          res.token_type.slice(0, 1).toUpperCase() +
          res.token_type.slice(1).toLowerCase()
        localStorage.setItem('token', tokenType + ' ' + res.access_token)
        this.$emit('closeWindow', 'submit')
      } catch (err) {
        // console.err(err)
      }
    },
    getImage(index) {
      switch (index) {
        case 0:
          return 'facebook'
        case 1:
          return 'google'
        case 2:
          return 'github'
        case 3:
          return 'linkedIn'
      }
    },
    closeWindow() {
      this.$emit('closeWindow', 'close')
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
