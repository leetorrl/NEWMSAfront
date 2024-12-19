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
            <span class="inline-block mt-2 mr-5 text-sm float-end">[ {{ userid }} ]  {{ wdate }} </span>
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
             
              v-model="commentmodel"
              class="border mt-2 w-11/12 resize-none h-16"
              name=""
              id=""
              placeholder="답변기입"
            ></textarea>
            <button  @click="savecomment"
              class="w-1/12 mt-2 text-center h-16 rounded bg-blue-800 opacity-80 text-white float-right"
            >
              답글입력
            </button>
            <div>{{comment}} 왜 안뜸{{commentuser}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { savecommentapi, stQnAviewapi } from '@/api/student.js';



const route = useRoute();
const router = useRouter();

const title = ref('');
const type = ref('');
const userid = ref('');
const wdate = ref('');
const content = ref('');
const qnaState = ref('');
const commentmodel = ref('')
const comment = ref('');
const commentuser = ref('')

const QnAview = async () => {
  const res = await stQnAviewapi(route.params.idx);

  title.value = res.data.title;
  qnaState.value = res.data.qnaState;
  userid.value = res.data.userid;
  wdate.value = res.data.wdate;
  content.value = res.data.content;
  type.value = res.data.type;
  comment.value = res.comment
  commentuser.value = res.commentuser
};

const goQnAboradsave = () => {
  router.push('/qnaboradsave');
};

const goQnAboradList = () => {
  router.go(-1);
};


const savecomment = async() => {

  const data = {
    comment: commentmodel.value,
  }

  try{
   await savecommentapi(route.params.idx, data)

   commentmodel.value =''

   alert('댓글입력 완료')
  }catch(e){

    console.log(e)

  }



  

}

onMounted(() => {
  console.log(route.params.idx);
  QnAview();
});
</script>

<style lang="scss" scoped></style>