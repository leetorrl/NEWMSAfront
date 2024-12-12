<template>
  <div class="p-10 mt-10 ml-3">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">휴가 신청 현황
      </h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />
    <div class="flex justify-center mt-3 font-sans">

      <main v-if="useravail" class="flex justify-center w-[68rem]">
        <section class="flex-1 p-5 bg-white border-gray-500 border-1">
          <div class="overflow-x-auto">
            <table class="w-full mb-5 ">
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-1 border-r border-gray-300 w-[30vw]">사유</th>
                  <th class="p-1 border-gray-300 border-x">휴가 신청일</th>
                  <th class="p-1 border-gray-300 border-x">휴가 당일</th>
                  <th class="p-1 border-gray-300 border-x">승인 대기</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(vacation, index) in vacationList" :key="index" @click="selectedVacation = vacation"
                  class="text-center hover:bg-gray-100 hover:cursor-pointer">
                  <td class="p-1 pl-4 text-left border-r border-gray-300 border-y">
                    {{ vacation.reason.length > 35 ? vacation.reason.substring(0, 35) + '...' : vacation.reason }}
                  </td>
                  <td class="p-1 border-gray-300 border-y border-x">{{ vacation.wdate }}</td>
                  <td class="p-1 border-gray-300 border-y border-x">{{ vacation.date }}</td>
                  <td class="p-1 border-l border-gray-300 border-y">
                    <span v-if="vacation.accept == '대기중'" class="text-blue-600">대기중</span>
                    <span v-else :class="vacation.accept === '허가됨' ? 'text-green-600' : 'text-red-600'">
                      {{ vacation.accept }}
                    </span>
                  </td>

                </tr>
              </tbody>
            </table>
            <button v-if="!unchecking" @click="unChecked(1)"
              class="px-4 py-2 text-white bg-blue-900 rounded hover:opacity-80">대기 중인 요청만 보기</button>
            <button v-if="unchecking" @click="fetchVacations(1)"
              class="px-4 py-2 text-white bg-blue-900 rounded hover:opacity-80">모든 요청 보기</button>
            <button class="px-4 py-2 text-white bg-blue-900 rounded float-end hover:opacity-80"
              @click="govacationForm">휴가 신청</button>
          </div>

          <div class="flex justify-center mt-5 space-x-2">
            <button @click="prevPageGroup" :disabled="currentPageGroup === 0"
              class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&lt;</button>
            <span v-for="page in currentPageNumbers" :key="page"
              class="px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100" @click="getPage(page)">
              {{ page }}
            </span>
            <button @click="nextPageGroup" :disabled="currentPageGroup >= maxPageGroup"
              class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&gt;</button>
          </div>
        </section>
      </main>

      <div v-else class="mt-44 w-[1100px] mb-24">
        <h1 class="flex justify-center">
          << 먼저 강좌를 선택하여 주시길 바랍니다.>>
        </h1>
        <div class="flex justify-center">
          <button class="p-2 pl-8 pr-8 m-5 text-white bg-blue-800 border-2 border-blue-800 rounded-md "
            @click="golectureselect">강좌 리스트 보러가기</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="selectedVacation" @click.self="closeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="w-[33vw] p-6 bg-white rounded-lg">
      <hr class="mt-3 border-b-4 border-blue-200" />
      <h1 class="my-5 text-xl text-center">실업자 훈련생 휴가신청서</h1>
      <hr class="border-b-4 border-blue-200" />
      <div class="flex justify-center w-full mt-5">
        <table class="w-[28vw]">
          <thead>
            <tr class="border border-black">
              <th class="bg-blue-200 w-[7vw] p-2 border-r border-black">훈련과정명</th>
              <td class="p-3">{{ selectedVacation.lecture }}</td>
            </tr>
            <tr class="border border-black">
              <th class="bg-blue-200 w-[7vw] p-2 border-r border-black">훈련기간</th>
              <td class="p-3">--작업중--</td>
            </tr>
            <tr class="border border-black">
              <th class="bg-blue-200 w-[7vw] p-2 border-r border-black">성명</th>
              <td class="p-3">{{ selectedVacation.user }}</td>
            </tr>
            <tr class="border border-black">
              <th class="bg-blue-200 w-[7vw] p-2 border-r border-black">주민등록번호</th>
              <td class="p-3">{{ selectedVacation.personalNum }}</td>
            </tr>
            <tr class="border border-black">
              <th class="bg-blue-200 w-[7vw] p-2 border-r border-black">사유</th>
              <td class="p-3">{{ selectedVacation.reason }}</td>
            </tr>
            <tr class="border border-black">
              <th class="bg-blue-200 w-[7vw] p-2 border-r border-black">희망일자</th>
              <td class="p-3">{{ selectedVacation.date }}</td>
            </tr>
            <tr class="border border-black">
              <th class="bg-blue-200 w-[7vw] p-2 border-r border-black">비상연락망</th>
              <td class="p-3">{{ selectedVacation.phonecall }}</td>
            </tr>
            <tr class="text-right border border-black">
              <th></th>
              <td class="p-2 text-2xl">신청일 {{ selectedVacation.wdate }}
                <br>신청인 {{ selectedVacation.user }}
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <hr class="border-b border-[#eee] my-[0.5vw]" />
      <div class="flex">
        <a v-if="selectedVacation.accept === '허가됨'"
          :href="`http://greencomart.kro.kr:716/vacation/download/hwp/${selectedVacation.idx}`"
          class="px-2 py-1 text-xl text-white bg-blue-800 rounded hover:opacity-80 hover:cursor-pointer"
          target="_blank">다운로드</a>
        <span v-else class="px-2 py-1 text-xl text-white bg-gray-400 rounded">대기중</span>
        <span @click="closeModal"
          class="px-2 py-1 ml-auto text-xl text-white bg-red-800 rounded hover:opacity-80 hover:cursor-pointer">닫기</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import router from '@/router';
import dayjs from 'dayjs';
import { stunCheckedapi } from '@/api/student';
import { stfetchVacationsapi } from '@/api/student';
import { stshowuserapi } from '@/api/student';
import { stshowuserttapi } from '@/api/student';
import Cookies from 'js-cookie';

const vacationList = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
const currentPage = ref(1); // 현재 페이지를 관리하는 상태
const itemsPerPage = 10; // 페이지당 항목 수
const currentPageGroup = ref(0); // 현재 페이지 그룹
const totalPageGroups = computed(() => Math.ceil(totalPages.value / itemsPerPage)); // 총 페이지 그룹 수

const unchecking = ref(false);

const user = ref(null);
const now = ref(dayjs());
const useravail = ref(false);
const usererror = ref('');
const attlist = ref([]);
const selectedVacation = ref(null);

const closeModal = () => {
  selectedVacation.value = null;
}

const unChecked = async (pageNum = 1) => {
  unchecking.value = true;
  try {

    const response = await stunCheckedapi(pageNum)

    vacationList.value = response.data.list;
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 현재 페이지 업데이트
  } catch (error) {
    console.error('휴가 요청을 가져오는 중 오류 발생:', error);
  }
};


const fetchVacations = async (pageNum = 1) => {
  unchecking.value = false;
  try {
    const response = await stfetchVacationsapi(pageNum)

    vacationList.value = response.data.list;
    vacationList.value.sort((a, b) => b.idx - a.idx);
    totalElements.value = response.data.totalElements;
    totalPages.value = response.data.totalPages;
    currentPage.value = pageNum; // 현재 페이지 업데이트
  } catch (error) {
    console.error('휴가 요청을 가져오는 중 오류 발생:', error);
  }
};

const getPage = (index) => {

  if (unchecking.value == true) {
    unChecked(index);
    return;
  }

  fetchVacations(index); // 현재 페이지 번호로 데이터를 가져옴

};

// 페이지 그룹과 관련된 상태
const maxPageGroup = computed(() => totalPageGroups.value - 1);
const currentPageNumbers = computed(() => {
  const start = currentPageGroup.value * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalPages.value);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// 이전 페이지 그룹으로 이동
const prevPageGroup = () => {
  if (currentPageGroup.value > 0) {
    currentPageGroup.value--;
    getPage(currentPage.value); // 첫 페이지로 이동
  }
};

// 다음 페이지 그룹으로 이동
const nextPageGroup = () => {
  if (currentPageGroup.value < maxPageGroup.value) {
    currentPageGroup.value++;
    getPage(currentPage.value); // 첫 페이지로 이동
  }
};



const govacationForm = () => {
  router.push({ name: 'vacationform' })
}


const showuser = async () => {
  try {

    const resuser = stshowuserapi()
    console.log(resuser.data);
    user.value = resuser.data;
    const data = {
      user: user.value,
      month: dayjs(now.value).format('YYYY-MM')
    };

    const resatt = stshowuserttapi(data)

    attlist.value = resatt.data;
    useravail.value = true;
    console.log(attlist.value);
  } catch (e) {
    console.log(e);
    useravail.value = false;
    usererror.value = '사용자를 찾을 수 없습니다.';

  }
};

onMounted(() => {
  fetchVacations(currentPage.value);
  showuser()

  if (Cookies.get('token') == null) {
    // if(localStorage.getItem('token')==null){
    router.push({ name: 'loginview' })
  }
});

</script>