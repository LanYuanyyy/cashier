import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Axios from '@/utils/axios'
import { ElMessage } from 'element-plus'

export const useCounterStore = defineStore('counter', () => {
  const memberData = ref({}) // 会员数据
  const orderData = ref({}) // 订单数据
  const memberListApi = async (page = 1, formInline) => {
    const res = await Axios.get(`cashier/user_vip?limit=15&page=${page}&name=${formInline.name}&phone=${formInline.phone}`)
    if (res.code === 200) {
      memberData.value = res.data
      return 200
    } else {
      ElMessage({ type: 'danger', message: res.message })
    }
  }
  const orderDataApi = async (page = 1, formInline) => {
    const res = await Axios.get(`cashier/hire?limit=15&page=${page}&phone=${formInline.phone}`)
    if (res.code === 200) {
      const { list, meta } = res.data
      orderData.value = res.data
      return 200
    } else {
      ElMessage({ type: 'danger', message: res.message })
    }
  }

  return { memberListApi, orderDataApi, memberData, orderData }
})
