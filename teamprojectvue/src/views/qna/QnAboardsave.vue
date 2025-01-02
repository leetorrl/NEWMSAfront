<template>
  <div class="p-10 mt-10 ml-3 w-[68rem]">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">문의사항 작성</h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />
    <br />
    <div>
      <p class="py-4 font-bold text-xl text-blue-900">제목</p>
      <div>
        <input
          type="text"
          v-model="title"
          placeholder="제목을 입력하세요"
          class="w-full pl-4 pr-4 py-2 transition-all duration-300 ease-in-out border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:border-transparent"
        />
      </div>
      
      <div>
        <p class="py-4 font-bold text-xl text-blue-900">구분선택</p>

      <div >

        <ul class="border rounded-md py-4">
          <li
      class="rounded-md p-2 ml-5 m-2 inline cursor-pointer"
      :class="{ 'bg-blue-200': item === type, 'bg-gray-100': item !== type }"
      v-for="(item, index) in typelist"
      :key="index"
      @click="selectType(item)"
    >
      {{ item }}
    </li>
        </ul>

      </div>
    </div>
      <br />
      <br>
      <div>
        <p class="py-6 font-bold text-xl text-blue-900">내용</p>
        <textarea
          id="message"
          v-model="content"
          rows="5"
          class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent"
          placeholder="바르고 고운말을 사용합시다 ㅎㅎ"
        ></textarea>
      </div>

      <div class="flex justify-end">
        <button
          @click="goback"
          type="button"
          class="flex justify-start p-2 pl-5 pr-5 text-white bg-red-600 border-2 rounded-lg hover:opacity-85"
        >
          취소
        </button>
        <button
          @click="QnAboardsave()"
          type="button"
          class="flex justify-end p-2 pl-5 pr-5 text-white bg-blue-600 border-2 rounded-lg hover:opacity-85"
        >
          제출
        </button>
      </div>
    </div>
  </div>
  <hr class="mx-auto my-5" />
  <div class="flex items-center justify-center"></div>

  <div class="mb-64"></div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { qna_save_api } from '@/api/qnaApi.js';

const router = useRouter();
const typelist = ref(['강좌', '시설', '환불', '기타']);

const title = ref('');
const content = ref('');
const type = ref('기타');


const selectType = (selectedType) => {
      type.value = selectedType;

    };

const goback = () => {
  router.go(-1);
};

const QnAboardsave = async () => {
  const data = {
    title: title.value,
    content: content.value,
    type: type.value,
  };

  try {
    const res = await qna_save_api(data);

    router.push('/qnaborad');
  } catch (e) {
    console.log(e);
  }
};
</script>

<style lang="scss" scoped></style>