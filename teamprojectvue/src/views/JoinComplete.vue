<template>


<div class="  mt-5 p-8 w-[1500px] bg-white rounded shadow-2xl  mb-12">
        <div class=" "   >
            
    <div class="  m-3 rounded ">
            <!-- Step Progress Bar --><joinHeader />
             <div class="flex justify-center"></div>
            
        <div class="text-center pt-5 ">
         <div class=" flex justify-center mb-5"><h1 class="text-2xl font-bold text-blue-900 pt-8 pb-3 flex justify-center border-b-2">회원가입이 완료되었습니다!</h1></div>
        
        
        <div class="flex justify-center">
        <div class="bg-[rgb(243,249,255)] p-8 h-80 font-bold w-[520px] text-blue-900 cursor-pointer border-2 rounded-xl shadow-xl" @click="gologinview">
            <p class="font-bold text-xl">로그인 페이지로 돌아가기 >></p>
            
            <div class="m-10 pt-8 flex justify-center">
                <svg class="text-blue-900" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
<path fill="currentColor" d="M 32 9 C 24.832 9 19 14.832 19 22 L 19 27.347656 C 16.670659 28.171862 15 30.388126 15 33 L 15 49 C 15 52.314 17.686 55 21 55 L 43 55 C 46.314 55 49 52.314 49 49 L 49 33 C 49 30.388126 47.329341 28.171862 45 27.347656 L 45 22 C 45 14.832 39.168 9 32 9 z M 32 13 C 36.963 13 41 17.038 41 22 L 41 27 L 23 27 L 23 22 C 23 17.038 27.037 13 32 13 z"></path>
</svg>
</div>

  
        </div>
    </div>
        <div class="p-2">
            <!-- <button class="border border-1 p-3 mr-5 pr-10 pl-10 rounded" @click="gologinhome">메인으로</button> -->
            <!-- <button class="border border-1  p-3 mr-3 pr-7 pl-7 bg-blue-800 text-white rounded" >로그인 페이지로</button> -->
        </div>
    </div>
    </div>
</div>
</div>

<div class="mb-64">

</div>
</template>

<script setup>
import joinHeader from '@/layout/joinHeader.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// const gologinhome = () => {

// router.push({name:'loginhome'})
// }


const gologinview = () => {
    router.push({name:'loginview'})
}

</script>

<style lang="scss" scoped>


</style>