<template>
      <div class="ml-4 font-sans flex justify-center">
    <main class="flex justify-center w-[74.5rem]">
      <section class="flex-1 p-6 m-2 bg-white border border-gray-500">
        <h1 class="mb-5 text-2xl font-semibold">공지사항</h1>

        <div >
          <select class="border border-gray-500 mr-3" v-model="selectedlecture" name="" id="">
            <option value="전체">전체</option>
            <option v-for="lecture in lecturelist" :key="lecture.idx" :value="lecture.idx">
              {{  }}
            </option>
          </select>
          <button  class="px-2 py-1 mr-1 text-white bg-blue-600 rounded hover:opacity-80">
            초기화
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full mb-5 border border-collapse border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-1 border border-gray-300 w-2/12">구분</th>
                <th class="p-1 border border-gray-300 w-5/12">제목</th>
                <th class="p-1 border border-gray-300 w-1/12">진행상태</th>
                <th class="p-1 border border-gray-300 w-1/6">작성일</th>
                <th class="p-1 border border-gray-300 w-1/12">조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in arr" :key="item.idx" class="text-center">
                <td 
                  class="p-1 border border-gray-300 hover:underline hover:cursor-pointer hover:bg-gray-200">{{
                    item.type }}</td>
                <td 
                  class="p-1 border border-gray-300 hover:underline hover:cursor-pointer hover:bg-gray-200">{{
                    itme.title }}</td>
                <td class="p-1 border border-gray-300">{{ item.state }}</td>
                <td class="p-1 border border-gray-300">{{ item.wdate }}</td>
                <td class="p-1 border border-gray-300">{{ item.views }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button  class="px-4 py-2 text-white bg-green-600 rounded hover:opacity-80 mr-3">최신순</button>
        <button  class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">과거순</button>

        <div class="flex justify-center mt-5 space-x-2">
          <button 
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&lt;</button>
          <span v-for="page in currentPageNumbers" :key="page"
            class="px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100"
            >
            {{  }}
          </span>
          <button 
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&gt;</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const arr = ref([])




</script>

<style lang="scss" scoped>

</style>