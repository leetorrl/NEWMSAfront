<template>
  <header class="bg-white shadow-md h-24">
    <div class="flex items-center justify-between h-24">
      <!-- 토글바 -->
      <button type="button" class="p-2" @click="toggleSideBar()">
        <img v-if="isSideBar" src="../image/baricon.png" class="" />
        <img v-else src="../image/Xicon.png" alt="" />
      </button>

      <!-- 로고 -->
      <div>
        <img src="../image/LOGO2.png" alt="" class="w-32" />
      </div>

      <!-- 우측 아이콘 -->
      <div class="space-x-8 justify-center flex mr-3">
        <button type="button">
          <router-link to="/"> <img src="../images/mycon.png" alt="" /></router-link>
        </button>
        <button type="button" @click="toggleNotification">
          <img v-if="isBell1" src="../image/bell1.png" alt="" />
          <img v-else src="../image/bell2.png" alt="" />
        </button>
        <!-- 토글 알림 창-->
        <div
          v-show="showNotifications"
          class="absolute top-28 mt-2 left-20 w-60 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all transform origin-top duration-300 ease-in-out"
          :class="{ 'scale-y-100 ': showNotifications, 'scale-y-0': !showNotifications }"
        >
          <ul class="divide-y divide-gray-200">
            <li
              v-for="(notification, index) in notifications"
              :key="index"
              class="p-4 text-gray-800 hover:bg-gray-100"
            >
              {{ notification }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <!-- 토글 사이드바 -->
  <div
    class="fixed w-[360px] h-[640px] bg-slate-950 opacity-70 z-40"
    v-show="!isSideBar"
    @click="toggleSideBar"
  ></div>
  <div
    class="fixed bg-white w-52 h-full z-50 transform transition-transform duration-300 ease-in-out"
    :class="{ '-translate-x-full': isSideBar, 'translate-x-0': !isSideBar }"
  >
    <ul class="space-y-4">
      <li>내 출결 관리</li>
      <hr />
      <li>휴가 신청</li>
      <hr />
      <li>과정 선택</li>
      <hr />
      <li>마이페이지</li>
      <hr />
      <li>공지사항</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isBell1 = ref(true)
const showNotifications = ref(false)
const isSideBar = ref(true)

const notifications = ref([
  '새로운 알림 1',
  '새로운 알림 2',
  '새로운 알림 3',
  '새로운 알림 4',
  '새로운 알림 5',
])
function toggleNotification() {
  isBell1.value = !isBell1.value
  showNotifications.value = !showNotifications.value
}
const toggleSideBar = () => {
  isSideBar.value = !isSideBar.value
}
</script>
<style lang="scss" scoped></style>
