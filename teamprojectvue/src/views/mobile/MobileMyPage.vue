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
        <span>이름 : {{ name }}</span
        ><br />
        <span>전화번호 : {{ number }}</span
        ><br />
        <span>e-mail : {{ email }}</span>
      </div>
    </div>
    <div class="flex justify-end items-center">
      <button
        @click="openModal"
        class="px-3 py-1 mr-10 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md shadow-sm hover:bg-blue-100 hover:text-blue-700 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition duration-300"
      >
        내 정보 수정
      </button>
    </div>
    <hr class="w-11/12 mx-auto my-4" />
    <!-- 내 강좌 -->
    <p>내 강좌</p>
    <div class="flex border mx-auto w-2/3 rounded-md">
      <div class="bg-slate-500 w-[3rem] text-white text-center">강좌</div>
      <div class="p-2">
        파이썬 기초 - IT기초 <br />
        <p class="text-xs text-end">종료일 :</p>
      </div>
    </div>

    <!-- 모달 -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-bold mb-4">내 정보 수정</h2>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium mb-1">이름</label>
          <input
            id="name"
            v-model="updatedName"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div class="mb-4">
          <label for="number" class="block text-sm font-medium mb-1">전화번호</label>
          <input
            id="number"
            v-model="updatedNumber"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="전화번호를 입력하세요"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-1">이메일</label>
          <input
            id="email"
            v-model="updatedEmail"
            type="email"
            class="w-full p-2 border rounded"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="cancelEdit"
            class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 mr-2"
          >
            취소
          </button>
          <button
            @click="confirmEdit"
            class="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobileTopBar from '@/components/MobileTopBar.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const name = ref('')
const number = ref('')
const email = ref('')
const isModalOpen = ref(false)

const updatedName = ref('')
const updatedNumber = ref('')
const updatedEmail = ref('')

const fetchUserData = async () => {
  try {
    const response = await axios.get('http://192.168.0.111:8080/user/select/1')
    const userData = response.data
    name.value = userData.name
    number.value = userData.number
    email.value = userData.email
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const openModal = () => {
  isModalOpen.value = true
  updatedName.value = name.value
  updatedNumber.value = number.value
  updatedEmail.value = email.value
}

const cancelEdit = () => {
  isModalOpen.value = false
}

const confirmEdit = async () => {
  try {
    const updatedUser = {
      name: updatedName.value,
      number: updatedNumber.value,
      email: updatedEmail.value,
    }
    const response = await axios.put('http://192.168.0.111:8080/user/update', updatedUser)
    console.log('정보수정:', response.data)

    name.value = updatedName.value
    number.value = updatedNumber.value
    email.value = updatedEmail.value
    isModalOpen.value = false
  } catch (error) {
    console.error('Error updating user data:', error)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<style scoped></style>
