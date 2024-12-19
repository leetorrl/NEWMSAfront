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
      <br />
      <div>
        <p class="py-6 font-bold text-xl text-blue-900">내용</p>
        <textarea
          id="message"
          v-model="content"
          rows="5"
          class="w-full p-4 transition-all duration-300 ease-in-out border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent"
          placeholder="내용을 입력하세요"
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
import { stgetuserapi, stQnAboardsaveapi } from '@/api/student.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const typelist = ref([]);

const title = ref('');
const content = ref('');
const type = ref('기타');

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
    const res = await stQnAboardsaveapi(data);

    console.log(res.data);

    router.push('/qnaborad');
  } catch (e) {
    console.log(e);
  }
};
</script>

<style lang="scss" scoped></style>