<script setup>
import { ref } from 'vue'
const activeIndex = ref('1')
</script>

<template>
  <header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
      <el-menu-item index="member">会员</el-menu-item>
      <el-menu-item index="orderlist">订单</el-menu-item>
      <el-sub-menu index="4">
        <template #title>订单</template>
        <el-menu-item index="2-1">出售订单</el-menu-item>
        <el-menu-item index="2-2">出租订单</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="hire">租玩具</el-menu-item>
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
