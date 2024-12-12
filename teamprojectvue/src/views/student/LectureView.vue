<template>
  <div class="w-full p-10 mx-auto">
    <div class="mb-4">
      <h1 class="mb-2 text-2xl font-bold">과정 선택</h1>

      <hr class="border-t-2 border-blue-600" />
    </div>

    <div class="p-6 bg-white rounded-lg shadow">
      <h2 class="inline-block mb-4 text-xl font-bold">강좌 선택</h2>

      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="검색"
          class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="grid grid-cols-4 gap-4 mx-auto">
        <button v-for="course in filteredCourses" :key="course" class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          {{ course }}
        </button>
      </div>
    </div>

    <div class="p-6 mx-auto mt-10 bg-white rounded-lg shadow">
      <div class="grid grid-cols-4 gap-4">
        <button v-for="course in courses" :key="course + '-dup'" class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          {{ course }}
        </button>
      </div>
    </div>
  </div>
  <div class="mb-64"></div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();

const search = ref('');
const courses = ['강좌1', '강좌2', '강좌3', '강좌4', '강좌5', '강좌6', '강좌7', '강좌8', '강좌9', '강좌10', '강좌11', '강좌12'];

const filteredCourses = computed(() => courses.filter((course) => course.toLowerCase().includes(search.value.toLowerCase())));

// const golectureinsert = () => {
//   router.push({ name: 'lectureinsert' });
// };

// const golecturelist = () => {
//   router.push({ name: 'lectureapprovallist' });
// };

onMounted(()=>{

  if(Cookies.get('token')==null){
  // if(localStorage.getItem('token')==null){
    router.push({name:'loginview'})
  }
})
</script>

<style scoped></style>
