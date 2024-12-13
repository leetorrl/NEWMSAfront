<template>
  <div class="p-10 mt-10 ml-3">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">과정 선택
      </h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />
    <div class="w-[68rem] p-5 mx-auto mb-20 ml-5">

      <!-- Main Section -->
      <div class="p-5 bg-white rounded-lg">
        <button v-if="buttonchek" @click="golectureinsert()"
          class="inline-block px-4 py-2 ml-10 text-white bg-yellow-500 rounded-lg hover:bg-yellow-700">
          강좌 생성
        </button>

        <!-- Search Bar -->
        <div class="mb-4">
          <input v-model="search" type="text" placeholder="검색"
            class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <!-- Course Cards -->
        <div class="grid grid-cols-4 gap-4 mx-auto">
          <div v-for="course in courses" :key="course.name" class="flex flex-col p-4 bg-white rounded-lg shadow">
            <h3 class="text-lg font-bold">{{ course.title }}</h3>
            <p class="mb-3 text-sm">{{ course.content }}</p>
            <div class="mt-auto">
              <p class="text-sm text-gray-600">{{ course.startDate }} ~ {{ course.endDate }}</p>
              <button v-if="!ismanager" @click="lectureinfo(course)"
                class="w-full py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                자세히 보기
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
  <div v-if="selectedlecture" @click.self="closeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="w-1/3 p-6 bg-white rounded-lg">
      <!-- 모달 헤더 -->
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold"> {{ selectedlecture?.title }}</h2>

        <button @click="closeModal" class="text-4xl text-gray-400 hover:text-gray-600 hover:scale-105">&times;</button>
      </div>
      <!-- 모달 내용 -->
      <hr class="border-b border-[#eee] my-1" />

      <div class="mt-4">
        <p class="text-lg">{{ selectedlecture?.content }}</p>
        <p class="mt-4">기간: {{ selectedlecture.startDate }} 부터 {{ selectedlecture.endDate }} 까지</p>
        <p>수업시간: {{ selectedlecture.startTime.substring(0, 5) }} 부터 {{ selectedlecture.endTime.substring(0, 5) }} 까지</p>
        <input class="pl-2 border border-gray-300" maxlength="4" type="text" placeholder="비밀번호" v-model="password" />
      </div>
      <!-- 모달 버튼 -->

      <div class="mx-4 mt-6 text-right">
        <button @click="lecturejoin(selectedlecture.idx)" class="px-4 py-2 mx-2 text-white bg-green-500 rounded">
          신청
        </button>
        <button @click="closeModal" class="px-4 py-2 text-white bg-red-500 rounded">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';
import { getavaillectureapi } from '@/api/lectureapi';
import { lecturejoinapi } from '@/api/lectureapi';
import Cookies from 'js-cookie';

const loginstore = useloginStore()

const router = useRouter();

const buttonchek = ref(true)

const search = ref('');
const courses = ref([]);
const selectedlecture = ref(null);
const password = ref('');
const ismanager = ref(false);

const { userrl } = storeToRefs(loginstore)

const lectureinfo = (lecture) => {
  if (selectedlecture.value == null) { selectedlecture.value = lecture; }
  else { selectedlecture.value = null }
}

const closeModal = () => {
  selectedlecture.value = null;
}

const golectureinsert = () => {
  router.push({ name: 'lectureinsert' });
};

// const golecturelist = () => {
//   router.push({ name: 'lectureapprovallist' });
// };

const getavaillecture = async () => {

  try {
    const res = await getavaillectureapi()
    courses.value = res.data;
  } catch (e) {
    console.log(e)
  }
}

const lecturejoin = async (idx) => {
  try {
    const data = {
      "idx": idx,
      "password": password.value
    }

    const res = await lecturejoinapi(data)
    console.log(res.data);
    alert('가입되었습니다.')
    selectedlecture.value = null;


  } catch (e) {
    if (e.response.data.message == '틀린 비밀번호입니다.') {
      alert(e.response.data.message)
      password.value = '';
    } else { console.log(e) }
  }
}


onMounted(() => {

  if (userrl.value == 'ROLE_STUDENT') {
    buttonchek.value = false
  }
  if (userrl.value == 'ROLE_MANAGER') {
    ismanager.value = true;
  }
  getavaillecture()
  if (Cookies.get('token') == null) {
    // if(localStorage.getItem('token')==null){
    router.push({ name: 'loginview' })
  }
})

</script>

<style scoped></style>
