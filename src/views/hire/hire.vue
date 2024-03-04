<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import Axios from '../../utils/axios.js'
const phone = ref('18705204931')
const user = ref('')
const goodsCode = ref('')
const inputcode = ref(null)
const tableData = ref(JSON.parse(localStorage.getItem('hireTableDate')) || [])
const dialogVisible = ref(false)
const dialogVisibleImg = ref(false)
const previewImgList = ref([])
const goodsImgList = ref([])
const keyDownPhone = (e) => {
  if (e.keyCode === 13 || e.key === 'Enter') checkUser()
}
const checkUser = async () => {
  const res = await Axios.get(`cashier/user/recommend/phone?phone=${phone.value}`)
  console.log(res)
  if (res.code === 200) {
    user.value = res.data
    if (user.value.vip) {
      dialogVisible.value = true
      setTimeout(() => {
        inputcode.value.focus()
      }, 500)
    }
  }
}
const checkGoods = async (e) => {
  if (e.keyCode === 13 || e.key === 'Enter') {
    const res = await Axios.get(`cashier/good/${goodsCode.value}`)
    console.log(res)
    if (res.code === 200) {
      dialogVisible.value = false
      tableData.value.push(res.data)
      if (localStorage.getItem('hireTableDate')) {
        let hireTableDate = JSON.parse(localStorage.getItem('hireTableDate'))
        hireTableDate.push(res.data)
        localStorage.setItem('hireTableDate', JSON.stringify(hireTableDate))
      } else {
        localStorage.setItem('hireTableDate', JSON.stringify([res.data]))
      }
    }
  }
}
const deleteGoods = (index) => {
  console.log(index)
  tableData.value.splice(index, 1)
  localStorage.setItem('hireTableDate', JSON.stringify(tableData.value))
}
const previewImg = (row) => {
  goodsImgList.value = row.images
  dialogVisibleImg.value = true
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="扫描商品码或输入商品编号" width="600">
    <img src="../../assets/img/southeast.jpeg" style="width: 200px; margin: auto" />
    <el-input ref="inputcode" v-model="goodsCode" placeholder="code" class="input-with-select" @keyup.enter="checkGoods($event)"></el-input>
  </el-dialog>
  <el-dialog v-model="dialogVisibleImg" title="商品预览" width="600">
    <el-carousel-item v-for="item in goodsImgList" :key="item">
      <img :src="item" />
    </el-carousel-item>
  </el-dialog>

  <el-descriptions border size="small">
    <el-descriptions-item label="Username">{{ user.name || 'defaultName' }}</el-descriptions-item>
    <el-descriptions-item label="Deposit" v-if="user.vip">{{ user.vip.deposit || 'defaultvip' }}</el-descriptions-item>
    <el-descriptions-item label="Phone">{{ user.phone || 'defaultPhone' }}</el-descriptions-item>
    <el-descriptions-item label="Date">
      <el-tag size="small">{{ user.created_at || 'Date' }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</el-descriptions-item>
  </el-descriptions>
  <el-input v-model="phone" placeholder="Phone input" class="input-with-select" @keyup.enter="keyDownPhone($event)">
    <template #append>
      <el-button :icon="Search" @click="checkUser"></el-button>
    </template>
    <template #prepend>
      <el-button type="success">搜索会员</el-button>
    </template>
  </el-input>

  <el-table :data="tableData" stripe style="width: 100%" size="small">
    <el-table-column prop="created_at" label="Date" width="300" />
    <el-table-column prop="name" label="商品名称" width="200" />
    <el-table-column prop="price" label="价格" width="200" />
    <el-table-column label="玩具照片">
      <template #default="{ row }">
        <img class="imgs" v-for="item in row.images" :src="item" @click="previewImg(row)" />
      </template>
    </el-table-column>
    <el-table-column label="留存照片">
      <template #default="{ row }">
        <img class="imgs" v-for="item in row.images" :src="item" @click="previewImg(row)" />
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="250" type="index">
      <template #default="{ row, $index }">
        <el-button link type="primary" size="small">拍照</el-button>
        <el-button link type="info" size="small">修改价格</el-button>
        <el-button link type="danger" size="small" @click="deleteGoods($index)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.imgs {
  width: 20px;
  cursor: pointer;
}
</style>
