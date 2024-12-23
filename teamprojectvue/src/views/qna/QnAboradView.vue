<template>
  <div class="p-10 mt-10 ml-3">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">문의사항</h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />

    <div class="ml-2 w-[68rem]">
      <div class="m-10 border border-gray-300">
        <hr class="m-1 ml-2 mr-2 border border-blue-500" />
        <div class="overflow-x-auto">
          <h1 class="m-2 ml-5 text-2xl font-bold">
            {{ title }}
            <span class="text-sm"
              >({{ type }}) ({{
                qnaState === 'WAITING'
                  ? '문의대기'
                  : qnaState === 'COMPLETE'
                    ? '답변완료'
                    : qnaState
              }})</span
            >
            <span class="inline-block mt-2 mr-5 text-sm float-end"
              >[ {{ userid }} ] {{ wdate }}
            </span>
          </h1>
          <hr class="m-1 ml-2 mr-2 border border-blue-500" />
          <div class="p-5">
            <div class="mt-8 mb-10">
              {{ content }}
            </div>
          </div>
        </div>
        <div class="bg-gray-300">
          <div
            @click="goQnAboradList"
            class="flex float-left p-1 pl-3 pr-3 my-8 text-xl border-2 rounded cursor-pointer bg-blue-800 opacity-80 text-white"
          >
            문의사항 리스트
          </div>
          <div
            @click="goQnAboradsave"
            class="flex float-right p-1 pl-3 pr-3 my-8 text-xl border-2 rounded cursor-pointer bg-blue-800 opacity-80 text-white"
          >
            글쓰기
          </div>
        </div>
        <div class=""></div>
      </div>
      <br />
      <br />
      <div class="flex justify-center w-full">
        <div class="border border-gray-300 w-[63rem]">
          <div class="p-1">
            <textarea
              v-model="commentInput"
              class="border mt-2 w-11/12 resize-none h-16"
              name=""
              id=""
              placeholder="답변을 작성하세요"
            ></textarea>
            <button
              @click="savecomment"
              class="w-1/12 mt-2 text-center h-16 rounded bg-blue-800 opacity-80 text-white float-right"
            >
              답글입력
            </button>
            <div class="flex flex-col" v-for="comment in comments" key="comment.idx">
              <h3 class="text-[1.2rem]">답글 내용 :</h3>
              <div class="border border-gray-200 p-3 m-3 rounded-sm">{{ comment.comment }}</div>
              <div class="flex justify-end mr-3">
                <h3 class="text-[1.2rem] p-3">작성자 : {{ comment.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { qna_one_api } from '@/api/qnaApi.js';
import { commnet_list_api, save_comment_api } from '@/api/commentApi.js';

const route = useRoute();
const router = useRouter();

const title = ref('');
const type = ref('');
const userid = ref('');
const wdate = ref('');
const content = ref('');
const qnaState = ref('');
const commentInput = ref('');
const comments = ref([]);

const QnAview = async () => {
  const res = await qna_one_api(route.params.idx);
  console.log(res.data);

  title.value = res.data.title;
  qnaState.value = res.data.qnaState;
  userid.value = res.data.userid;
  wdate.value = res.data.wdate;
  content.value = res.data.content;
  type.value = res.data.type;

  const res_comments = await commnet_list_api(route.params.idx);
  comments.value = res_comments.data;
};

const goQnAboradsave = () => {
  router.push('/qnaboradsave');
};

const goQnAboradList = () => {
  router.go(-1);
};

const savecomment = async () => {
  const data = {
    comment: commentInput.value
  };

  try {
    await save_comment_api(route.params.idx, data);

    alert('댓글입력 완료');
  } catch (e) {
    console.log(e);
  }
};

watchEffect(() => {
  console.log(route.params.idx);
  QnAview();
});
</script>

<style lang="scss" scoped></style>