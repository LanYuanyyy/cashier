<script setup>
import { ref, onMounted, reactive } from 'vue'
import Axios from '../utils/axios.js'
import { ElMessage, ElMessageBox } from 'element-plus'
const total = ref(0)
const tableData = ref([])
const user_vip = ref({})
const formInline = reactive({
  name: '',
  phone: '',
})
const onSubmit = () => { getMemberList() }
const cleanUp = () => {
  formInline.name = ''
  formInline.phone = ''
  getMemberList()
}
const getMemberList = async (page = 1) => {
  const res = await Axios.get(`cashier/user_vip?limit=15&page=${page}&name=${formInline.name}&phone=${formInline.phone}`)
  if (res.code === 200) {
    tableData.value = res.data.list
    total.value = res.data.meta.total
    user_vip.value = tableData.value[0]
  }
}
const renewApi = async (id, value) => {
  const res = await Axios.post(`cashier/user_vip/renew/${id}`, { year: value })
  if (res.code === 200) {
    ElMessage({ type: 'success', message: `成功续费:${value}年` })
  } else {
    // danger
    ElMessage({ type: 'danger', message: res.msg })

  }
}
const modifyPhoneApi = async (id, value) => {
  const res = await Axios.post(`cashier/user/change/phone/${id}`, { phone: value })
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '修改成功' })
  } else {
    ElMessage({ type: 'danger', message: res.msg })
  }
}
const rowClick = (row, column, event) => {
  user_vip.value = row
}
const handleSizeChange = (val) => {
  getMemberList(val)
}
const detailUser = (id) => {
  console.log(id)
}
const renew = (id) => {
  ElMessageBox.prompt('请输入续费时间 (年)', '会员续费', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => { renewApi(id, value) })
    .catch(() => { ElMessage({ type: 'info', message: '取消续费' }) })
}
const modifyPhone = (id) => {
  ElMessageBox.prompt('请输入新的手机号码', '会员续费', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /^1[3456789]\d{9}$/,
    inputErrorMessage: 'Invalid Phone'
  })
    .then(({ value }) => { modifyPhoneApi(id, value) })
    .catch(() => { ElMessage({ type: 'info', message: '取消修改' }) })
}
onMounted(() => { getMemberList() })
</script>

<template>
  <el-descriptions title="User Info" v-if="user_vip">
    <el-descriptions-item label="Username">{{user_vip.name}}</el-descriptions-item>
    <el-descriptions-item label="Telephone">{{user_vip.phone}}</el-descriptions-item>
    <el-descriptions-item label="Date 时间">{{user_vip.created_at}}</el-descriptions-item>
    <el-descriptions-item label="租借订单数">
      <el-tag size="small">{{user_vip.hire_count}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="押金" v-if="user_vip.vip">{{user_vip.vip.deposit}}</el-descriptions-item>
  </el-descriptions>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="会员名-查询">
      <el-input v-model="formInline.name" placeholder="name" clearable />
    </el-form-item>
    <el-form-item label="手机号-查询">
      <el-input v-model="formInline.phone" placeholder="phone" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
      <el-button type="danger" @click="cleanUp">清除</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" stripe style="width: 100%" @row-click="rowClick" highlight-current-row>
    <el-table-column type="index" label="序号" width='80' align='center' />
    <el-table-column prop="created_at" label="Date 时间" width='200' />
    <el-table-column prop="name" label="Name 用户名" width='200' />
    <el-table-column prop="phone" label="phone 手机号" width='200' />
    <el-table-column prop="vip.deposit" label="押金" width='200' />
    <el-table-column prop="hire_count" label="订单数" />
    <el-table-column fixed="right" label="Operations" width='250'>
      <template #default='{row}'>
        <el-button link type="primary" size="small" @click="renew(row.id)">续费</el-button>
        <el-button link type="info" size="small" @click="modifyPhone(row.id)">修改手机号</el-button>
        <el-button link type="danger" size="small" @click="detailUser(row.id)">Detail</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination layout="prev, pager, next" :total="total" @change="handleSizeChange" />
</template>


<style lang="scss" scoped>
.el-form {
  display: flex;
  justify-content: flex-end;
}
</style>