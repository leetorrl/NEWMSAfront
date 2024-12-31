<template>
  <div class="p-10 mt-10 ml-3">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">문의사항</h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />
    <div class="w-5/12 mt-4 ml-8 mr-8 border border-gray-300">
      <h1 class="m-2 border-b">◎자주하는 질문</h1>
      <ul class="m-2">
        <li class="p-1 ml-4 border-b">
          Q : 출결 증빙자료가 없어요. 어떡하죠?
        </li>
        <li class="p-1 ml-4 border-b">
          Q : 당일에 증빙자료 제출을 까먹었어요.
        </li>
        <li class="p-1 ml-4 border-b">
          Q : 휴가 신청서 제출은 어떻게 하나요?
        </li>
      </ul>
    </div>

    <div>
      <!-- <form action="">
        <label for="">서치 테스트</label><input class="border" type="search" v-model="query">
        <button @click="qnasearch(query)">검색</button>
      </form> -->
    </div>

    <main class="flex justify-center w-[68rem]">
      <section class="flex-1 p-6 m-2 bg-white">
        <div class="mb-3">
          <select
  class="w-32 mr-3 border border-gray-500"
  v-model="type"
  name="type"
  id="type"
  @change="fetchPageData(type, 0)"
>
  <option value="구분">구분</option>
  <option value="강좌">강좌</option>
  <option value="시설">시설</option>
  <option value="환불">환불</option>
  <option value="기타">기타</option>
</select>
          <!-- <select class="w-32 mr-3 border border-gray-500" v-model="selectedlecture" name="" id="">
            <option value="전체">전체</option>
            <option v-for="item in arr" :key="item.idx" :value="item.idx">{{}}</option>
          </select> -->
          <!-- <button class="px-2 py-1 mr-1 text-white bg-blue-600 rounded hover:opacity-80">
            초기화
          </button> -->
        </div>
        <div class="overflow-x-auto">
          <table class="w-full mb-5 border border-collapse border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="w-1/12 p-3 border border-gray-300">구분</th>
                <th class="w-5/12 p-3 border border-gray-300">제목</th>
                <th class="w-2/12 p-3 border border-gray-300">글쓴이</th>
                <th class="w-2/12 p-3 border border-gray-300">작성일</th>
                <th class="w-1/12 p-3 border border-gray-300">진행상태</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in QnAlistarr"
                :key="item.idx"
                class="text-center hover:cursor-pointer hover:bg-gray-200"
                @click="goQnAboradView(item.idx)"
              >
                <td class="p-3 border border-gray-300">{{ item.type }}</td>
                <td class="p-3 border border-gray-300">
                  {{ item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title }}
                </td>
                <td class="p-3 border border-gray-300"> <span>{{item.name}}</span><span class="text-xs">({{ item.userid }})</span></td>
                <td class="p-3 border border-gray-300">{{ item.wdate }}</td>
                <td class="p-3 border border-gray-300">
                  {{
                    item.qnaState === 'WAITING'
                      ? '답변대기'
                      : item.qnaState === 'IN_PROGRESS'
                      ? '답변중'
                      : item.qnaState === 'COMPLETE'
                        ? '답변완료'
                        : item.qnaState
                  }}
                </td>
                <!-- /// <td colspan="5" class="p-3 border border-gray-300">비공개글 입니다.</td> -->
              </tr>
            </tbody>
          </table>
        </div>
<!-- 
        <button class="px-4 py-2 mr-3 text-white bg-green-600 rounded hover:opacity-80">
          최신순
        </button>
        <button class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">과거순</button> -->
        <button
          @click="goQnAsave"
          class="float-right px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80"
        >
          글쓰기
        </button>


     <!-- 페이지 네이션 부분 -->
<div class="flex justify-center mt-5 space-x-2">
  <!-- 이전 페이지 버튼 -->
  <button
  class="px-3 py-1 bg-white border cursor-pointer border-gray-300 hover:bg-gray-100"
  @click="fetchPageData(type, currentPage - 1)"
  :disabled="currentPage === 0"
  aria-label="이전 페이지"
>
  &lt;
</button>

<!-- 페이지 번호 버튼 -->
<span
  v-for="page in totalPages"
  :key="page"
  class="px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100"
  :class="{ 'bg-blue-500 text-white': currentPage === page - 1 }"
  @click="fetchPageData(type, page - 1)"
>
  {{ page }}
</span>

<!-- 다음 페이지 버튼 -->
<button
  class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100"
  @click="fetchPageData(type, currentPage + 1)"
  :disabled="currentPage === totalPages - 1"
  aria-label="다음 페이지"
>
  &gt;
</button>
</div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia.js';
import { storeToRefs } from 'pinia';
// import { computed } from 'vue';
import { qna_list_api, qna_search_api } from '@/api/qnaApi.js';
import Cookies from 'js-cookie';

const loginStore = useloginStore();
const { userloginid } = storeToRefs(loginStore);

const type = ref('구분')

const router = useRouter();

const QnAlistarr = ref([]);
const query = ref();

const currentPage = ref(0);       // 현재 페이지 번호 (0부터 시작)
const totalPages = ref(0);        // 전체 페이지 수
const totalElements = ref(0);     // 전체 항목 수
const pageSize = ref(5);         // 한 페이지에 표시할 항목 수

const goQnAsave = () => {
  router.push('/qnaboradsave');
};

const fetchPageData = async (typeValue, pageNum = 0) => {
  try {
    const res_qna = await qna_list_api(typeValue, pageNum, pageSize.value);

    if (res_qna.list && res_qna.list.length) {
      QnAlistarr.value = res_qna.list;
      totalElements.value = res_qna.totalElements;
      totalPages.value = res_qna.totalPages;
      currentPage.value = pageNum; // currentPage를 올바르게 업데이트
    } else {
      console.log("No data found for the current page.");
    }
  } catch (e) {
    console.log(e);
  }
};

// 검색 기능
// const qnasearch = async (query) => {
//   const searchquery = query.value;

//   try {
//     const res_search_qna = await qna_search_api(searchquery);

//     QnAlistarr.value = res_search_qna.list;
//     totalElements.value = res_search_qna.totalElements;
//     totalPages.value = res_search_qna.totalPages;
//     currentPage.value = 0; // 검색 결과는 첫 페이지부터 표시
//   } catch (e) {
//     console.log(e);
//   }
// };

// 글 보기로 이동
const goQnAboradView = (idx) => {
  router.push(`/qnaboradview/${idx}`);
};

// 초기 데이터 로드
watchEffect(async () => {
  if (!Cookies.get('token')) {
    router.push({ name: 'loginview' });
  }
  await fetchPageData(type.value, currentPage.value);
});
</script>

<style lang="scss" scoped></style>