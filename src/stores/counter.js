import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Axios from '@/utils/axios'
import { ElMessage } from 'element-plus'

export const useCounterStore = defineStore('counter', () => {
  const memberData = ref({})
  const memberListApi = async (page = 1, formInline) => {
    const res = await Axios.get(`cashier/user_vip?limit=15&page=${page}&name=${formInline.name}&phone=${formInline.phone}`)
    if (res.code === 200) {
      memberData.value = res.data
      return 200
    } else {
      ElMessage({ type: 'danger', message: res.message })
    }
  }

  return { memberListApi, memberData }
})
