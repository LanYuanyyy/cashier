<script setup>
import { ref, reactive } from 'vue'
import Axios from '../../utils/axios'
import { ElMessage, ElMessageBox } from 'element-plus'
const dialogVisible = ref(true)
const formAdduser = reactive({ name: '', phone: '', pay_type: '', deposit: '', start_time: '', end_time: '' })
const dateTime = ref([])
const open = () => {
  dialogVisible.value = true
}
const changeTimeDate = (val) => {
  formAdduser.start_time = val[0]
  formAdduser.end_time = val[1]
}
const emit = defineEmits(['on-update'])
const addUserApi = async () => {
  const res = await Axios.post('cashier/user_vip', formAdduser)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage({ type: 'success', message: '添加成功' })
    emit('on-update')
  } else {
    ElMessage({ type: 'danger', message: res.message })
  }
}
defineExpose({ open })
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新增会员" width="35%">
    <el-form label-position="left" label-width="100px" :model="formAdduser" style="max-width: 460px">
      <el-form-item label="用户名">
        <el-input v-model="formAdduser.name" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formAdduser.phone" />
      </el-form-item>
      <el-form-item label="押金">
        <el-input v-model="formAdduser.deposit" />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="dateTime" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" size="large" value-format="YYYY-MM-DD" @change="changeTimeDate" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-radio-group v-model="formAdduser.pay_type">
          <el-radio :label="1">现金</el-radio>
          <el-radio :label="2">微信</el-radio>
          <el-radio :label="3">支付宝</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addUserApi"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
