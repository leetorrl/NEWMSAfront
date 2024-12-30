<template>
  <div class="w-40 rounded-sm">
    <div class="rounded-md bg-blue-50 cursor-pointer">
      <img src="../images/LOGO2.png" alt="Logo" @click="setActiveItem(null,'deskdashboard')" />
    </div>
    <div class="bg-blue-900 h-[680px]">
      <aside class="p-3 text-gray-100 font-bold font-[GmarketSansMedium]">
        <div class="h-16 text-lg font-bold">매니저</div>
        <ul class="flex flex-col justify-center p-1 space-y-3 text-gray-800 rounded-lg bg-slate-100">
          <li @click="setActiveItem('deskdashboard', 'deskdashboard')">
            <div :class="{ 'bg-blue-200 rounded-md': activeItem === 'deskdashboard' }"
                 class="flex items-center py-1 my-2 text-sm cursor-pointer">
              <img src="../images/announ.png" alt="" class="mr-2" />
              대시보드
            </div>
          </li>
          <hr class="p-0 m-0 border-gray-300" />
          <li @click="setActiveItem('deskcalander', 'deskcalander')" class="cursor-pointer">
            <div :class="{ 'bg-blue-200 rounded-md': activeItem === 'deskcalander' }"
              class="flex items-center py-1 my-2 text-sm ">
              <img src="../images/AtenCheck.png" alt="" class="mr-2" />
              출결리스트
            </div>
          </li>
          <hr class="border-gray-300" />
          <li @click="setActiveItem('vacationmanage', 'vacationmanage')" class="cursor-pointer">
            <div :class="{ 'bg-blue-200 rounded-md': activeItem === 'vacationmanage' }"
              class="flex items-center py-1 my-2 text-sm ">
              <img src="../images/check.png" alt="" class="mr-2" />
              휴가 신청 관리
            </div>
          </li>
          <hr class="border-gray-300" />
          <li @click="setActiveItem('lectureselect', 'lectureselect')" class="cursor-pointer">
            <div :class="{ 'bg-blue-200 rounded-md': activeItem === 'lectureselect' }"
              class="flex items-center py-1 my-2 text-sm ">
              <img src="../images/wlearn.png" alt="" class="mr-2" />
              강좌 관리
            </div>
          </li>
          <hr class="border-gray-300" />
          <li @click="setActiveItem('mypage', 'mypage')" class="cursor-pointer">
            <div :class="{ 'bg-blue-200 rounded-md': activeItem === 'mypage' }"
              class="flex items-center py-1 my-2 text-sm ">
              <img src="../images/mycon.png" alt="" class="mr-2" />
              마이페이지
            </div>
          </li>
          <hr class="border-gray-300" />
          <li @click="setActiveItem('deskannouncelist', 'deskannouncelist')" class="cursor-pointer">
            <div :class="{ 'bg-blue-200 rounded-md': activeItem === 'deskannouncelist' }"
              class="flex items-center py-1 my-2 text-sm ">
              <img src="../images/announ.png" alt="" class="mr-2" />
              공지사항
            </div>
          </li>
          <hr class="border-gray-300" />
          <li @click="setActiveItem('studentQnA', 'qnaborad')" class="cursor-pointer">
            <div :class="{ 'bg-blue-200 rounded-md': activeItem === 'studentQnA' }"
              class="flex items-center py-1 my-2 text-sm">
              <img src="../images/announ.png" alt="" class="mr-2" />
              문의사항
            </div>
          </li>
        </ul>
      </aside>

      <div @click="logout" class=" font-[GmarketSansMedium] mt-8 border-gray-300 bg-slate-100 m-3 rounded-md cursor-pointer hover:bg-red-400"><span class="flex justify-center p-2 pb-1 ">로그아웃</span></div>

    </div>
  </div>
</template>

<script setup>
import { useloginStore } from '../stores/loginpinia.js';
import { userrole } from '../api/loginapi.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Cookies from 'js-cookie';


const router = useRouter()

const loginStore = useloginStore()

const {userrl} = storeToRefs(loginStore)

const { loginchecktrue } = loginStore;

const activeItem = ref(''); // Tracks the active item

// Sets the active item based on the button clicked
const setActiveItem = (item, url) => {
  activeItem.value = item;
  router.push(`/${url}`);

};


const logout =async () => {

  userrl.value =null

  Cookies.remove('token')
//  localStorage.removeItem('token');
 loginchecktrue();
   userrole();
   router.push({ name: 'loginview' });
};



</script>
