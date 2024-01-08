import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Axios from '@/utils/axios'
import { ElMessage } from 'element-plus'

export const useCounterStore = defineStore('counter', () => {
  const memberListApi = async (page = 1, formInline = {}) => {
    const res = await Axios.get(`cashier/user_vip?limit=15&page=${page}&name=${formInline.name}&phone=${formInline.phone}`)
    if (res.code === 200) {
      return res.data
    } else {
      ElMessage({ type: 'danger', message: res.message })
    }
  }

  return { memberListApi }
})
