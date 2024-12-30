<template>
    <div class="flex justify-center"><h1 class="text-2xl font-bold text-blue-900 border-b-2 mb-5">회원가입</h1></div>
    
    <div class="w-full px-5 flex justify-center">
      
      <div class="flex justify-center items-stretch  w-[600px]">
        <!-- Step 1 -->
        <div class="relative flex-1 text-center p-5 bg-blue-900 text-white border rounded-xl">
          <div class="text-2xl font-bold mb-2">01.</div>
          <div class="text-sm leading-tight">
            이용약관 및<br>개인정보수집 및<br>이용에 관한 동의
          </div>
          <div class="absolute -right-[30px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-blue-900 clip-arrow z-10 ml-[20px]"></div>
        </div>
  
        <!-- Step 2 -->
        <div class="relative flex-1 text-center p-5 border rounded-xl">
          <div class="text-2xl font-bold mb-2">02.</div>
          <div class="text-sm leading-tight">
            본인인증 및<br>기본정보 입력
          </div>
          <div  class="absolute -right-[30px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-white clip-arrow z-10"></div>
        </div>
  
        <!-- Step 3
        <div class="relative flex-1 text-center p-5 bg-blue-900 text-white border rounded-xl">
          <div class="text-2xl font-bold mb-2">03.</div>
          <div class="text-sm leading-tight">
            아이디 및<br>패스워드 설정
          </div>
          <div class="absolute -right-[30px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-blue-900 clip-arrow z-10 ml-[20px]"></div>
        </div> -->
  
        <!-- Step 4 -->
        <div class="relative flex-1 text-center p-5 bg-blue-900 text-white border rounded-xl" >
          <div class="text-2xl font-bold mb-2">03.</div>
          <div class="text-sm leading-tight">
            회원가입 완료
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    currentStep: {
      type: Number,
      default: 1
    }
  });
  </script>
  
  <style scoped>
  .clip-arrow {
    clip-path: polygon(0 0, 50% 50%, 0 100%);
    
  }
  
  
  </style>
  
  
  