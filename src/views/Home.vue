<script setup>
import { ref } from 'vue'
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>


<template>
  <header>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
      <el-sub-menu index="2">
        <template #title>会员</template>
        <el-menu-item index="2-1">添加会员</el-menu-item>
        <el-menu-item index="2-2">会员列表</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4">订单</el-menu-item>
      <el-menu-item index="5">买玩具</el-menu-item>
      <el-menu-item index="6">租玩具</el-menu-item>
      <el-menu-item index="7">还玩具</el-menu-item>
    </el-menu>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.el-menu {
  width: 100%;
}
</style>