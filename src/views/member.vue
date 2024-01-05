<script setup>
import { ref, onMounted } from 'vue'
import Axios from '../utils/axios.js'
import { ElMessage } from 'element-plus'
const name = ref('')
const phone = ref('')
const total = ref(0)
const tableData = ref([])
const user_vip = ref({})
const getMemberList = async (page = 1) => {
  const res = await Axios.get(`cashier/user_vip?limit=10&page=${page}&name=${name.value}&phone=${phone.value}`)
  if (res.code === 200) {
    console.log(res)
    tableData.value = res.data.list
    total.value = res.data.meta.total
    user_vip.value = tableData.value[0]
  }
}
const rowClick = (row, column, event) => {
  user_vip.value = row
}
const handleSizeChange = (val) => {
  getMemberList(val)
}
onMounted(() => {
  getMemberList()
})
</script>

<template>
  <el-descriptions title="User Info">
    <el-descriptions-item label="Username">{{user_vip.name}}</el-descriptions-item>
    <el-descriptions-item label="Telephone">{{user_vip.phone}}</el-descriptions-item>
    <el-descriptions-item label="Date 时间">{{user_vip.created_at}}</el-descriptions-item>
    <el-descriptions-item label="租借订单数">
      <el-tag size="small">{{user_vip.hire_count}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="押金" v-if="user_vip.vip">{{user_vip.vip.deposit}}</el-descriptions-item>
  </el-descriptions>
  <el-table :data="tableData" stripe style="width: 100%" @row-click="rowClick" highlight-current-row>
    <el-table-column prop="created_at" label="Date 时间" />
    <el-table-column prop="name" label="Name 用户名" />
    <el-table-column prop="phone" label="phone 手机号" />
    <el-table-column prop="vip.deposit" label="押金" />
  </el-table>
  <el-pagination layout="prev, pager, next" :total="total" @change="handleSizeChange" />
</template>