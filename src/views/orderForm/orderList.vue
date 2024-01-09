<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
const orderStore = useCounterStore()
const tableData = ref([])
const formInline = reactive({ name: '', phone: '' })
const total = ref(0)
const getorderList = async (page = 1) => {
  const res = await orderStore.orderDataApi(page, formInline)
  if (res) {
    console.log(orderStore.orderData)
    const { list, meta } = orderStore.orderData
    tableData.value = list
    total.value = meta.total
  }
}
const onSubmit = () => {}
const cleanUp = () => {}
const handleSizeChange = (val) => {}
onMounted(() => {
  getorderList()
})
</script>

<template>
  <el-descriptions title="User Info">
    <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</el-descriptions-item>
  </el-descriptions>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="订单编号-查询">
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
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="80" align="center" />
    <el-table-column prop="created_at" label="Date" width="200" />
    <el-table-column prop="name" label="会员名" width="200" />
    <el-table-column prop="phone" label="手机号" width="200" />
    <el-table-column prop="deposit" label="冻结押金" width="200" />
    <el-table-column label="订单状态">
      <template #default="{ row }">
        <el-button link type="primary" size="small">进行中</el-button>
        <el-button link type="success" size="small">已完结</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="250">
      <template #default="{ row }">
        <el-button link type="primary" size="small">处理订单</el-button>
        <!-- <el-button link type="info" size="small" @click="modifyPhone(row.id)">修改手机号</el-button> -->
        <el-button link type="danger" size="small">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="fr" :default-page-size="15" layout="prev, pager, next" :total="total" @change="handleSizeChange" />
</template>
<style lang="scss" scoped>
.el-form {
  display: flex;
  justify-content: flex-end;
}
</style>
