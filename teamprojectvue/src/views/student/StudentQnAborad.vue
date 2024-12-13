<template>
     <div class="p-10 mt-10 ml-3">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">문의사항
      </h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />

    <main class="flex justify-center w-[68rem]">
      <section class="flex-1 p-6 m-2 bg-white">
        <div >
          <select class="mr-3 border border-gray-500" v-model="selectedlecture" name="" id="">
            <option value="전체">전체</option>
            <option v-for="item in arr" :key="item.idx" :value="item.idx">
              {{  }}
            </option>
          </select>
          <button @click="resetSort(1)" class="px-2 py-1 mr-1 text-white bg-blue-600 rounded hover:opacity-80">
            초기화
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full mb-5 border border-collapse border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-1 border border-gray-300 w-1/12">구분</th>
                <th class="p-1 border border-gray-300 w-4/12">제목</th>
                <th class="p-1 border border-gray-300 w-1/12">글쓴이</th>
                <th class="p-1 border border-gray-300 w-2/12">작성일</th>
                <th class="p-1 border border-gray-300 w-1/12">진행상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in arr" :key="item.idx" class="text-center">
               
                <td 
                  class="p-1 border border-gray-300 hover:underline hover:cursor-pointer hover:bg-gray-200">{{ item.idx }}</td>
                  <td 
                  class="p-1 border border-gray-300 hover:underline hover:cursor-pointer text-center hover:bg-gray-200">
                  {{ item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title }}
                </td>
                <td class="p-1 border border-gray-300">{{ item.user }}</td>
                <td class="p-1 border border-gray-300">{{ item.wdate  }}</td>
                <td class="p-1 border border-gray-300">{{  }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button @click="sortAsc" class="px-4 py-2 mr-3 text-white bg-green-600 rounded hover:opacity-80">최신순</button>
        <button @click="sortDesc" class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">과거순</button>

        <div class="flex justify-center mt-5 space-x-2">
          <button @click="prevPageGroup" :disabled="currentPageGroup === 0"
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&lt;</button>
          <span v-for="page in currentPageNumbers" :key="page"
            class="px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100"
            @click="(ascdesc) ? getPage(page) : getdescPage(page)">
            {{ page }}
          </span>
          <button @click="nextPageGroup" :disabled="currentPageGroup >= maxPageGroup"
            class="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100">&gt;</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { stQnAlistapi } from '../../api/student';
import { onMounted } from 'vue';

const arr = ref([])
const body = ref('')
const title = ref('')


const QnAlist = async ()=> {

  try{

    const res = await stQnAlistapi()

    arr.value = res.list

    console.log( arr.value)
    console.log("arrtitle" + arr.value[0].title)
  }catch(e){
    console.log(e)
  }
}

onMounted(()=>{
  QnAlist()
})

</script>

<style lang="scss" scoped>

</style>