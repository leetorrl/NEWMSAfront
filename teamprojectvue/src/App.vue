<template>
  <div class="w-full">
    <!--
user1,2 선생
user3,4 매니저
user5~15 학생
마스터
-->

    <div class="">
      <TopBar v-if="$route.name !== 'loginview'" class="w-full hidden"></TopBar>
    </div>
    <div class=""></div>
    <div style="width: 1200px; margin: 0 auto" class="font-[GmarketSansMedium] flex justify-center">
      <RouterView />
    </div>
    <LayoutFooter class=""></LayoutFooter>

    <button
      v-if="Cookies.get('token')"
      @click="toggleDrawer"
      class="fixed top-4 left-4 1920px:hidden p-2 bg-gray-800 text-white rounded"
    >
      Menu
    </button>

    <template v-if="userrlvalue == 'ROLE_STUDENT'">
      <div
        :class="[
          'fixed top-0 left-0 h-full w-80 bg-gray-100 shadow-xl ' +
            'transform transition-transform duration-300 z-10',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <StudentSideBar class="fixed top-0 left-12" />
        <button
          @click="toggleDrawer"
          class="absolute top-4 right-8 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </template>
    <template v-if="userrlvalue == 'ROLE_TEACHER'">
      <div
        :class="[
          'fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-xl ' +
            'transform transition-transform duration-300 z-10',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <TeacherSideBar class="fixed top-0 left-12" />
        <button
          @click="toggleDrawer"
          class="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </template>
    <template v-if="userrlvalue == 'ROLE_MANAGER'">
      <div
        :class="[
          'fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-xl ' +
            'transform transition-transform duration-300 z-10',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <ManagerSideBar class="fixed top-0 left-12" />
        <button
          @click="toggleDrawer"
          class="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </template>
    <template v-if="userrlvalue == 'ROLE_STUDENT'">
      <StudentSideBar class="invisible 1920px:visible 1920px:fixed 1920px:top-[1%] 1920px:left-[11%]" />
    </template>
    <template v-if="userrlvalue == 'ROLE_TEACHER'">
      <TeacherSideBar class="invisible 1920px:visible 1920px:fixed 1920px:top-[1%] 1920px:left-[11%]" />
    </template>
    <template v-if="userrlvalue == 'ROLE_MANAGER'">
      <ManagerSideBar class="invisible 1920px:visible 1920px:fixed 1920px:top-[1%] 1920px:left-[11%]" />
    </template>
  </div>
</template>

<script setup>
import ManagerSideBar from './layout/ManagerSideBar.vue';
import StudentSideBar from './layout/StudentSideBar.vue';
import TeacherSideBar from './layout/TeacherSideBar.vue';
import LayoutFooter from './layout/layoutFooter.vue';
import { useloginStore } from './stores/loginpinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { userdata, userrole } from './api/loginapi';
import { computed } from 'vue';
import Cookies from 'js-cookie';
// import TopBar from './layout/TopBar.vue';

const router = useRouter();

const loginStore = useloginStore();
const { userrl } = storeToRefs(loginStore);
const { logincheckfalse } = loginStore;
const { userL } = loginStore;

const userrlvalue = computed(() => loginStore.userrl);

console.log(`userrl = ${JSON.stringify(userrl)}`);

const homelogin = async () => {
  try {
    await userrole();
  } catch (e) {
    // e.response나 e.data가 있을 경우에만 접근하도록 처리
    if (e && e.response && e.response.data && e.response.data.status === 401) {
      // 401 오류인 경우 처리
      
      Cookies.removeItem('token');
      userL(); // 로그아웃 함수 (로그아웃 관련 로직이 제대로 구현되어 있어야 함)
      router.push({ name: 'loginview' }); // 로그인 화면으로 이동
    } else {
      console.error('Unexpected error:', e); // 예상치 못한 에러가 발생했을 때 로그 출력
    }
  }

// if(await Cookies.get('token') !== null){
//   // if (localStorage.getItem('token') !== null) {
//     console.log('로그인 유지');
//     if (userrl.value == 'ROLE_STUDENT') {
//       console.log('학생계정');
//       router.push({ name: 'studentmain' });
//     } else if (userrl.value == 'ROLE_TEACHER') {
//       console.log('선생계정');
//       router.push({ name: 'teachertoday' });
//     } else if (userrl.value == 'ROLE_MANAGER') {
//       console.log('매니저계정');
//       router.push({ name: 'deskcalander' });
//     } else {
//       console.log('맵핑문제');
//     }
//   } else {
//     console.log('로그아웃 상태');
//     router.push({ name: 'loginview' });
//   }
};

const homepage = () => {

  if(!Cookies.get("token")){
    router.push({name:'loginview'})
  }else{
    userdata();
    logincheckfalse();
  }
}

onMounted(async () => {
  homepage();
  userdata();
  homelogin();
});
const isOpen = ref(false);

function toggleDrawer() {
  isOpen.value = !isOpen.value;
}
</script>

<style>
body.drawer-open {
  overflow: hidden;
}
</style>
