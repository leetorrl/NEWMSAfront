<template>
  <div class="w-[360px] h-[640px] border">
    <!--사이드바-->
    <MobileTopBar></MobileTopBar>
    <!-- 상단 알람바, 내용-->
    <div class="flex m-4 justify-between">
      <div class="mr-4">
        <img src="/src/image/usericon.png" alt="" class="border rounded-full w-20" />
      </div>
      <div class="w-[220px]">
        <span>이름 : {{ name }} </span><br />
        <span>전화번호 : {{ phoneNum }} </span><br />
        <span>e-mail : {{ email }} </span>
      </div>
    </div>
    <hr class="w-11/12 mx-auto my-4" />
    <!-- 내 강좌 -->
    <p>내 강좌</p>
    <div class="flex border mx-auto w-2/3 rounded-md">
      <div class="bg-slate-500 w-[3rem] text-white text-center text-">강좌</div>
      <div class="">
        파이썬 기초 - IT기초 <br />
        <p class="text-xs text-end">종료일 :</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobileTopBar from '@/components/MobileTopBar.vue'
import { ref } from 'vue'

const name = ref('')
const phoneNum = ref()
const email = ref('')

name.value = ''
phoneNum.value = ''
email.value = ''
</script>

<style lang="scss" scoped></style>
