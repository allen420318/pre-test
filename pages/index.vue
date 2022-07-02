<template>
  <div>
    <div class="w-full bg-gray-top">
      <div
        class="block md:flex max-w-7xl m-auto pt-3 md:pt-16 pb-8 md:pb-36 px-4 md:px-0"
      >
        <div class="w-full md:w-2/3 md:mr-4">
          <div class="font-bold text-gray-700 text-2xl mb-4">購物車</div>
          <div class="bg-white rounded-xl md:rounded shadow-lg">
            <div class="hidden md:flex p-3 pb-1 text-gray-500 border-b">
              <div class="w-1/2">項目</div>
              <div class="w-1/4">售價</div>
              <div class="w-1/4">結帳金額</div>
            </div>
            <div
              v-for="item in shoppingList"
              :key="item.key"
              class="flex flex-wrap min-h-28 border-b p-3 md:py-5"
            >
              <div class="w-3/12 md:w-2/12">
                <img class="w-32 rounded-lg" :src="item.image" />
              </div>
              <div
                class="w-7/12 md:w-4/12 text-gray-600 font-bold pl-2 md:pr-5"
              >
                {{ item.name }}
              </div>
              <div class="w-10/12 md:w-1/4 flex items-center text-gray-500">
                {{ formatMoney(item.subtotal) }}
              </div>
              <div class="w-2/12 md:w-2/12 flex items-center text-xl">
                {{ formatMoney(item.total) }}
              </div>
              <div
                class="absolute right-0 mr-10 mt-3 md:static md:w-1/12 md:mr-0 md:mt-0 flexbox"
              >
                <img
                  class="w-4"
                  src="~/assets/images/garbagecan.png"
                  @click="removeCartItem(item)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <div class="font-bold text-gray-700 text-2xl mb-4 mt-10 md:mt-0">
            小計
          </div>
          <div class="bg-white rounded shadow-lg p-3">
            <div class="text-gray-500 mb-2">輸入折扣代碼</div>
            <div class="flex">
              <input type="text" class="border rounded mr-2 w-full h-10 px-2" />
              <div
                class="hidden md:flex items-center justify-center w-20 h-10 rounded bg-pink text-red text-sm font-bold"
              >
                確定
              </div>
            </div>
            <div class="underline text-gray-600 font-bold mt-4">
              選擇抵用券
              <img
                class="w-3.5 inline-block ml-1 -mt-0.5"
                src="~/assets/images/arrow.png"
              />
            </div>
            <div class="w-full h-1 border-t mt-16 md:mt-4 my-4"></div>
            <div class="flex justify-between">
              <span class="text-gray-500">金額</span>
              <span>${{ formatMoney(subtotal) }}</span>
            </div>
            <div class="flex justify-end text-3xl font-bold mt-10 md:mt-2">
              ${{ formatMoney(total) }}
            </div>
            <div
              class="w-full rounded text-white bg-red flexbox font-bold h-10 mt-4"
            >
              前往結帳
            </div>
            <div class="text-gray-500 text-sm mt-4 md:whitespace-nowrap">
              點擊上方按鈕即表示您已閱讀並同意<span class="underline"
                >「 HiSKIO購買與退費政策」</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-gray-bottom">
      <div class="max-w-7xl m-auto pt-5 md:pt-10 pb-5 md:pb-10 px-4 md:px-0">
        <div class="font-bold text-gary-700 text-2xl mb-4">募資課程</div>
        <div class="flex flex-wrap">
          <div
            v-for="item in classList"
            :key="item.key"
            class="w-full md:w-1/4 bg-white rounded-xl md:rounded shadow-lg mb-4 md:mb-0 md:mr-2 p-3 md:p-0"
          >
            <div class="w-full flex">
              <img
                class="rounded-lg md:rounded-t w-5/12 md:w-full"
                :src="item.image"
              />
              <div class="block md:hidden w-4/12 ml-2">
                <div
                  class="flex justify-between text-sm text-gray-tips font-bold"
                >
                  <span>已募資{{ progress(item, 'rate') }}%</span>
                </div>
                <div class="w-full gray-progress rounded-full h-2 mt-2">
                  <div
                    class="red-progress h-2 rounded-full"
                    :style="{ width: progress(item, 'bar') + '%' }"
                  ></div>
                </div>
                <div class="mt-2 flex items-center">
                  <span class="font-bold"
                    >${{ formatMoney(remainingDate(item, 'price')) }}</span
                  >
                  <del class="text-gray-money ml-1"
                    >${{ formatMoney(item.fixed_price) }}</del
                  >
                </div>
              </div>
              <div v-if="item.lecturers" class="flex justify-end w-3/12">
                <img
                  class="h-6 md:h-9 w-6 md:w-9 rounded-full"
                  :src="item.lecturers[0].avatar"
                />
              </div>
            </div>

            <div
              class="relative flex justify-end float-left md:float-right -mt-6 w-5/12 md:w-full"
            >
              <img class="h-5 mr-2.5" src="~/assets/images/bookmark.png" />
              <img
                class="h-5 mr-2.5"
                src="~/assets/images/shopping-w.png"
                @click="switchCartItem(item)"
              />
            </div>
            <div class="md:p-2">
              <div
                class="mb-1 w-full font-bold md:font-medium pt-2 md:pt-0 text-lg md:text-base leading-5"
              >
                {{ item.title }}
              </div>
              <div class="hidden md:block">
                <div v-if="item.lecturers" class="flex items-center">
                  <img
                    class="h-9 w-9 rounded-full mr-2"
                    :src="item.lecturers[0].avatar"
                  />
                  <span class="text-gray-name text-sm">{{
                    item.lecturers[0].username
                  }}</span>
                </div>
                <div
                  class="flex justify-between text-xs mt-2 text-gray-tips font-normal"
                >
                  <span class="tracking-widest"
                    >剩{{ remainingDate(item, 'date') }}天</span
                  ><span>已募資{{ progress(item, 'rate') }}%</span>
                </div>
                <div class="w-full gray-progress rounded-full h-2.5 mt-1">
                  <div
                    class="red-progress h-2.5 rounded-full"
                    :style="{ width: progress(item, 'bar') + '%' }"
                  ></div>
                </div>
                <div class="mt-2 flex items-center">
                  <span class="font-bold"
                    >${{ formatMoney(remainingDate(item, 'price')) }}</span
                  >
                  <del class="text-xs text-gray-money ml-1 mt-0.5"
                    >${{ formatMoney(item.fixed_price) }}</del
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { classList, addCartItem, removeCartItem } from '@/api/index.js'
export default {
  name: 'IndexPage',
  data() {
    return {
      classList: [],
      shoppingList: [],
    }
  },
  computed: {
    ...mapState(['isLogin']),
    subtotal() {
      let result = 0
      this.shoppingList.forEach((x) => {
        result = result + x.subtotal
      })
      return result
    },
    total() {
      let result = 0
      this.shoppingList.forEach((x) => {
        result = result + x.total
      })
      return result
    },
  },
  watch: {
    isLogin() {
      this.addCartItem()
    },
  },
  mounted() {
    this.addCartItem()
    this.getClassList()
  },
  methods: {
    async getClassList() {
      try {
        const res = await classList()
        this.classList = res
      } catch (err) {
        console.err(err)
      }
    },
    async addCartItem(item) {
      const payload = item
        ? [
            {
              id: item.id,
              coupon: '',
            },
          ]
        : []

      try {
        const res = await addCartItem(payload)
        this.shoppingList = localStorage.getItem('token') ? res.data : []
      } catch (err) {
        console.err(err)
      }
    },
    async removeCartItem(item) {
      const payload = [
        {
          id: item.id,
          coupon: '',
        },
      ]

      try {
        await removeCartItem(payload)
        this.addCartItem()
      } catch (err) {
        console.err(err)
      }
    },
    switchCartItem(item) {
      let result = true
      this.shoppingList.forEach((x) => {
        if (item.id === Number(x.id)) {
          result = false
        }
      })
      result ? this.addCartItem(item) : this.removeCartItem(item)
    },
    remainingDate(item, type) {
      const today = Date.parse(new Date())
      let result = null
      let index = null
      for (let i = 0; i < item.prices.length; i++) {
        const targetDay = Date.parse(item.prices[i].schedule_at)
        if (targetDay > today) {
          result = Math.floor((targetDay - today) / 1000 / 60 / 60 / 24)
          index = i
          break
        }
      }
      return type === 'date' ? result : item.prices[index - 1].price
    },
    progress(item, type) {
      const result = Math.floor(
        (item.consumers / item.fundraising_tickets) * 100
      )
      return type === 'rate' ? result : result > 100 ? 100 : result
    },
    formatMoney(num) {
      return String(num).replace(/(-?\d+)(\d{3})/, '$1,$2')
    },
  },
}
</script>
<style lang="postcss" scoped>
.flexbox {
  @apply flex items-center justify-center;
}
.bg-gray-top {
  background: #fafafa;
}
.bg-gray-bottom {
  background: #f5f5f5;
}
.text-gray-name {
  color: #8c8c8c;
}
.text-gray-tips {
  color: #595959;
}
.gray-progress {
  background: #f0f0f0;
}
.red-progress {
  background: #eb6767;
}
.text-gray-money {
  color: #bfbfbf;
}
.bg-pink {
  background: #ffe6e6;
}
.text-red {
  color: #e34a4a;
}
.bg-red {
  background: #e34a4a;
}
</style>
