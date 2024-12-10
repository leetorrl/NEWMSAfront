<template>
    <div class="min-h-screen bg-gray-100">
<TopBar></TopBar>
  
      
      <div class="flex mt-6">
        <Sidebar></Sidebar>
  
        <!-- Main Content -->
        <main class="w-3/4 bg-white shadow-md p-6">
          <!-- Board Header -->
          <div class="flex justify-between items-center border-b pb-3 mb-6">
            <h2 class="text-lg font-bold text-blue-800">문의 게시판</h2>
            <button class="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700">글쓰기</button>
          </div>
  
          <!-- FAQ Section -->
          <section class="mb-6">
            <h3 class="text-md font-semibold mb-2">자주하는 질문</h3>
            <ul class="list-disc pl-6 text-sm text-gray-700">
              <li>출결 증빙자료가 없어요. 어떻게하죠?</li>
              <li>당일에 증빙자료 제출을 깜빡했어요.</li>
              <li>휴가 신청서 제출은 어떻게 하나요?</li>
            </ul>
          </section>
  
          <!-- Board Table -->
          <section>
            <h3 class="text-md font-semibold text-blue-800 mb-4">학생 문의</h3>
            <table class="w-full border-collapse border border-gray-200 text-sm text-left">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-200 px-4 py-2">제목</th>
                  <th class="border border-gray-200 px-4 py-2">상태</th>
                  <th class="border border-gray-200 px-4 py-2">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-200 px-4 py-2">증빙자료 안 넣고 이유만 써도 외출해도 되나요?</td>
                  <td class="border border-gray-200 px-4 py-2">답변 완료된 질문입니다.</td>
                  <td class="border border-gray-200 px-4 py-2">2024-10-10</td>
                </tr>
                <tr>
                  <td class="border border-gray-200 px-4 py-2">작성만 볼 수 있습니다.</td>
                  <td class="border border-gray-200 px-4 py-2">답변 완료된 질문입니다.</td>
                  <td class="border border-gray-200 px-4 py-2">2024-10-08</td>
                </tr>
                <tr>
                  <td class="border border-gray-200 px-4 py-2">작성만 볼 수 있습니다.</td>
                  <td class="border border-gray-200 px-4 py-2">답변 완료된 질문입니다.</td>
                  <td class="border border-gray-200 px-4 py-2">2024-10-01</td>
                </tr>
              </tbody>
            </table>
          </section>
  
          <!-- Pagination -->
          <div class="mt-6 flex justify-center space-x-2">
            <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">1</button>
            <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">2</button>
            <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">3</button>
            <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">4</button>
          </div>
        </main>
      </div>
  
      <!-- Quick Menu -->
      <div class="fixed right-4 top-1/3 space-y-4">
        <button class="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center">
          <span class="sr-only">학생 출결관리</span>
        </button>
        <button class="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center">
          <span class="sr-only">문의 게시판</span>
        </button>
        <button class="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center">
          <span class="sr-only">마이페이지</span>
        </button>
        <button class="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center">
          <span class="sr-only">알림 마당</span>
        </button>
      </div>
    </div>
  </template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/TopBar.vue';



</script>

<style lang="scss" scoped>

</style>