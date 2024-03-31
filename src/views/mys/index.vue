<script setup lang="ts">
import { ref,onMounted } from 'vue'
const todoList = ref([])
const timeString = (timeStamp:number):string => {
    let date = new Date(timeStamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
    let D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
    let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
    let m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
    return Y+M+D+h+m+s;
}
const checkedAll = () => {
    if(todoList.value.filter((item:{checked:boolean}) => item.checked === false).length > 0){
        todoList.value.forEach((t:{checked:Boolean}) => t.checked = true)
    }else{
        todoList.value.forEach((t:{checked:Boolean}) => t.checked = false)
    }
}
const AddList = () => {
    const Data:object = {id:1,contentText:'',checked:false,date:timeString(Date.now())}
    todoList.value.push(JSON.parse(JSON.stringify(Data)))
    preserve()
}
const deleted = (index:number) => todoList.value.splice(index,1)
const deletedAll = () => {
    todoList.value = todoList.value.filter((item:{checked:boolean}) => item.checked === false)
    preserve()
}
const clearCache = () => localStorage.setItem('todolist',JSON.stringify([]))
const preserve = () => localStorage.setItem('todolist',JSON.stringify(todoList.value))
onMounted(() => {if(JSON.parse(localStorage.getItem('todolist'))) todoList.value = JSON.parse(localStorage.getItem('todolist'))})

</script>

<template>
    <div class="content">
        <header>
            <div>
                <button class="add">+</button>
                <h2>Todo List</h2>
            </div>
            <el-button-group>
                <el-button type="primary" @click="checkedAll">Select All</el-button>
                <el-button type="primary" @click="deletedAll">Delete Select All</el-button>
                <el-button type="primary" @click="clearCache">Clear cache</el-button>
                <el-button type="primary" @click="AddList"> add</el-button>
        </el-button-group>
        </header>
        <ul>
            <li v-for="(item,index) of todoList" :key="item.id">
                <el-checkbox v-model="item.checked"  size="large" />
                <input type="text" v-model="item.contentText" @blur="preserve">
                <div class="date">{{item.date}}</div>
                <el-button type="danger" @click="deleted(index),preserve()">delete</el-button>
            </li>
        </ul>
    </div>
</template>

<style>
    .content{
        width: 40%;
        min-height: 400px;
        background: #36394b;
        border-radius: 10px;
        margin:auto;
        margin-top: 200px;
        padding: 20px;
    }
    .content header{
        padding: 20px;
        border-bottom: 1px solid #9c9c9c;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .content header div{
        display: flex;
        align-items: center;
    }
    .content header .add {
        width: 50px;
        height: 50px;
        font-size: 35px;
        color: #fff;
        border-radius: 50%;
        background: #b099db;
        margin-right: 30px;
    }
    .content header h2 {
        font-size: 18px;
        color: #fff;
    }
    .content ul{
        padding-top: 30px;
    }
    .content ul li {
        height: 70px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 10px;
        justify-content: space-between;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .content ul li:hover{
        transition: .5s all;
        background: #A8ABB2;
    }
    .content ul li input{
        width: 60%;
        color: #fff;
        letter-spacing: 1px;
        background: transparent;
        border-bottom: 1px solid #b8b6b6;
        padding-bottom: 5px;
        padding-left: 10px;
    }
    .content ul li .date {
        color: #fff;
    }
</style>