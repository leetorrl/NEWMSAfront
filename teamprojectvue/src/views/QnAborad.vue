<template>
     <div class="p-10 mt-10 ml-3">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">문의사항
      </h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />


    <div class="border border-gray-300 ml-8 mr-8 mt-4 w-5/12">
            <h1 class="m-2 border-b">◎자주하는 질문</h1>
            <ul class="m-2">
              <li class=" hover:cursor-pointer ml-4 p-1 border-b">
                Q : 출결 증빙자료가 없어요. 어떡하죠?
              </li>
              <li class="hover:cursor-pointer ml-4 p-1 border-b">
                Q : 당일에 증빙자료 제출을 까먹었어요.
              </li>
              <li class="hover:cursor-pointer ml-4 p-1 border-b">
                Q : 휴가 신청서 제출은 어떻게 하나요?
              </li>
            </ul>
          </div>

    <main class="flex justify-center w-[68rem]">
      <section class="flex-1 p-6 m-2 bg-white">
        <div >
          <select class="mr-3 border border-gray-500" v-model="selectedlecture" name="" id="">
            <option value="전체">전체</option>
            <option v-for="item in arr" :key="item.idx" :value="item.idx">
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
                <th class="p-1 border border-gray-300 w-1/12">구분</th>
                <th class="p-1 border border-gray-300 w-4/12">제목</th>
                <th class="p-1 border border-gray-300 w-1/12">글쓴이</th>
                <th class="p-1 border border-gray-300 w-2/12">작성일</th>
                <th class="p-1 border border-gray-300 w-1/12">진행상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for=" item in arr " :key="item.idx" class="text-center hover:cursor-pointer hover:bg-gray-200" @click="goQnAboradView(item.idx)">
               
                <td 
                  class="p-1 border border-gray-300  ">{{ item.type }}</td>
                  <td 
                  class="p-1 border border-gray-300  ">
                  {{ item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title }}
                </td>
                <td class="p-1 border border-gray-300">{{ item.user }}</td>
                <td class="p-1 border border-gray-300">{{ item.wdate  }}</td>
                <td class="p-1 border border-gray-300">{{  item.qnastate === 'QnA_Hold' 
      ? '문의대기' 
      : item.qnastate === 'QnA_Complete' 
        ? '답변완료' 
        : item.qnastate  }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button  class="px-4 py-2 mr-3 text-white bg-green-600 rounded hover:opacity-80">최신순</button>
        <button  class="px-4 py-2 text-white bg-blue-600 rounded hover:opacity-80">과거순</button>
        <button @click="goQnAsave" class="px-4 py-2 float-right text-white bg-blue-600 rounded hover:opacity-80">글쓰기</button>
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
import { stQnAlistapi } from '../api/student';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const arr = ref([])
const router = useRouter()

const goQnAsave = ()=>{
  router.push('/qnaboradsave')
}

const QnAlist = async ()=> {

  try{

    const res = await stQnAlistapi()

    arr.value = res.list

  }catch(e){
    console.log(e)
  }
}

const goQnAboradView = (idx)=>{
  router.push(`/qnaboradview/${idx}`)
}

onMounted(()=>{
  QnAlist()
})

</script>

<style lang="scss" scoped>

</style>