<script setup>
import { ref } from 'vue'
import Axios from '../utils/axios.js'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const username = ref('')
const password = ref('')
const Login = async () => {
  if (!username.value || !password.value) {
    ElMessage.error('用户名和密码必须')
    return
  }
  const res = await Axios.post('cashier/login', {
    username: username.value,
    password: password.value
  })
  if (res.code === 200) {
    const { token, user } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    router.push({ path: '/Home' })
  }
}
</script>


<template>
  <main>
    <div class="video-box">
      <video x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5" preload="auto" muted="muted" autoplay="autoplay" loop="loop">
        <source src="@/assets/video/login_bg_media.mp4">
      </video>
    </div>
    <div class="login">
      <div class="bian"></div>
      <h4>LOGIN<br>多多兔收银系统</h4>
      <img src="@/assets/img/01.png" alt="">
      <input v-model="username" placeholder="username input" />
      <input v-model="password" placeholder="Please input" />
      <el-button @click="Login" type="primary">登录</el-button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  .video-box {
    width: 100vw;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .login {
    top: 50%;
    right: 50px;
    height: 70%;
    width: 400px;
    background: #fff;
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start; // 定义多根轴对齐的方式
    justify-content: center;
    padding-top: 150px;
    h4 {
      left: 10%;
      top: 50px;
      position: absolute;
      font-size: 25px;
      color: #208cf9;
    }
    input {
      width: 300px;
      height: 50px;
      border-bottom: 1px solid #939292;
      margin-top: 20px;
      color: #646363;
      padding-left: 10px;
    }
    .el-button {
      width: 300px;
      margin-top: 70px;
    }
    .bian {
      width: 100%;
      height: 4px;
      background: #409eff;
      position: absolute;
      top: 0;
      left: 0;
    }
    img {
      width: 200px;
    }
  }
}
</style>