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
                  : qnaState === 'IN_PROGRESS'
                  ? '답변중'
                  : qnaState === 'COMPLETE'
                    ? '답변완료'
                    : qnaState
              }})</span
            >
            <span class="inline-block mt-2 mr-5 text-sm float-end"
              >{{name}} [ {{ userid }} ] -{{ wdate }}-
            </span>
          </h1>
          <hr class="m-1 ml-2 mr-2 border border-blue-500" />
          <div class="p-5">
            <div class="mt-8 mb-10">
              {{ content }}
            </div>

        <div v-if="userchk">
            <div v-if="WAITINGQnAch" @click="chkcomment" 
            :class="{'bg-blue-900 text-white ': !commentchk, 'bg-gray-300 text-black cursor-pointer': commentchk}"
            class=" border-1 p-4">
            <h1 v-if="commentchk">문의해결</h1>
            <h1 v-else>문의완료 게시물 입니다.</h1>
          </div>
        </div>

          </div>
        </div>
        
        <div class="">
         
          <div
            @click="goQnAboradList"
            class="flex float-left p-1 pl-3 pr-3 my-8 text-xl border-2 rounded cursor-pointer bg-blue-800 opacity-80 text-white"
          >
            문의사항 리스트
          </div>
                                 
          <div v-if="userchk"
          @click="deleteqnaborad()"
            class="flex float-right p-1 pl-3 pr-3 my-8 text-xl border-2 rounded cursor-pointer bg-red-400 opacity-80 text-white"
          >
            삭제
          </div>
          <div v-if="userchk"
          @click="changeQnAborad()"
            class="flex float-right p-1 pl-3 pr-3 my-8 text-xl border-2 rounded cursor-pointer bg-blue-400 opacity-80 text-white"
          >
            수정
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
            <div class="m-2" v-if="commentchk"> 댓글 작성자 : - {{username}}<span class="text-xs">({{
    userrl === 'ROLE_STUDENT'
      ? '학생'
      : userrl === 'ROLE_TEACHER'
      ? '강사'
      : userrl === 'ROLE_MANAGER'
      ? '매니저'
      : '미확인 유저'}})</span> - </div>
            <textarea v-if="commentchk"
              v-model="commentInput"
              class="border mt-2  w-11/12 resize-none h-16"
              name=""
              id=""
              placeholder="답변을 작성하세요"
            ></textarea>

            <button v-if="commentchk"
              @click="savecomment"
              class="w-1/12 mt-2 text-center h-16 rounded bg-blue-800 opacity-80 text-white float-right"
            >
              답글입력
            </button>
            <h1 class="mt-10" v-if="commentlistchk">-답변항목-</h1>
            <div class="flex flex-col mb-5  rounded-md" :class="item.name === username ? 'bg-blue-100' : 'bg-red-100'" v-for=" item in comments" :key="item.idx">
              <div class="border ">
              <h3 class="text-[1.2rem] mt-2 ml-2">답변 : </h3>
              
              <div class=" border-gray-200 m-3 rounded-sm">{{ item.comment }}</div>
              <div class="flex justify-end mr-3">
                <h3 class="text-[1rem] p-3">작성자 : {{ item.name }}({{item.userid}})<span class="text-xs">({{
    item.role === 'ROLE_STUDENT'
      ? '학생'
      : item.role === 'ROLE_TEACHER'
      ? '강사'
      : item.role === 'ROLE_MANAGER'
      ? '매니저'
      : '미확인 유저'}})</span></h3>
              </div>
<h3 class="flex justify-end mb-3 mr-3">{{
      new Date(item.wdate).getFullYear() + '-' +
      String(new Date(item.wdate).getMonth() + 1).padStart(2, '0') + '-' +
      String(new Date(item.wdate).getDate()).padStart(2, '0') + ' ' +
      String(new Date(item.wdate).getHours()).padStart(2, '0') + ':' +
      String(new Date(item.wdate).getMinutes()).padStart(2, '0')
    }}</h3>
              </div>

             <div >
              <div v-if="commentchk" class=""> 
                <button v-if="commentlistchk && item.userid === userloginid" @click="deletecomment(item.idx)" class="float-end mb-1 ml-1 mr-1 pl-1 pr-1 text-white bg-red-400">삭제</button>
              <button v-if="commentlistchk && item.userid === userloginid" @click="changecomment" class="float-end mb-1 ml-1 mr-1 pl-1 pr-1 bg-blue-800 text-white ">수정</button>
            </div>
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
import { onMounted, watchEffect } from 'vue';
import { ref } from 'vue';
import { qna_chkcomment_api, qna_delete_api, qna_one_api } from '@/api/qnaApi.js';
import { commnet_list_api, deletecommentapi, save_comment_api } from '@/api/commentApi.js';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const loginStore = useloginStore();
const { username,userrl,userloginid } = storeToRefs(loginStore); 

const name = ref('')
const uuid = ref('');
const title = ref('');
const type = ref('');
const userid = ref('');
const wdate = ref('');
const content = ref('');
const qnaState = ref('');
const commentInput = ref('');
const comments = ref([]);


const WAITINGQnAch = ref(false)
const commentchk = ref(true) //텍스트 에리어 숨김 체크
const commentlistchk = ref(false)

const userchk = ref(false)


const changeQnAborad = () => {

  router.push(`/qnaboardchange/${route.params.idx}`)

}

const goQnAboradsave = () => {
  router.push('/qnaboradsave');
};

const goQnAboradList = () => {
  router.go(-1);
};


const deleteqnaborad = async () => {

  const deleteqnaalert = confirm("정말 삭제하시겠습니까?")

  if(deleteqnaalert){
try{

const res = await qna_delete_api(route.params.idx)

alert(res.data)
router.push({name:'qnaborad'})

}catch(e){
console.log(e)
}

  }else{
    alert('삭제취소'+route.params.idx)
    return
  }
}


const savecomment = async () => {
  
  if(commentInput.value.trim()===''){
    
    alert("내용을 입력 바랍니다.")
    return
  }

  else{
    const data = {
    comment: commentInput.value
  };

  try {
    await save_comment_api(route.params.idx, data);

    // alert('댓글입력 완료');
    await QnAview();
    await QnAview(); //리렌더링(화면갱신) 이슈 때문에 두번 부름 삭제 ㄴㄴ
    
    commentInput.value = null
    // router.push(`/qnaboradview/${route.params.idx}`)
    // commentchksettime.value = false

  } catch (e) {
    console.log(e);
  }
  }
};


const changecomment = () => {

  alert('아직 못만듬')

}

const chkcomment = async() => {

  if(commentchk.value===false){
    return
  }
  const commentalert = confirm("문의해결 체크시 문의완료 게시물로 변경되며 더이상 답글을 추가하실 수 없습니다.")

  if(commentalert){
  try{
    const res = await qna_chkcomment_api(route.params.idx)
    console.log("문의체크"+res)

    await QnAview();
  }catch(e){
    
    console.log(e)
  }

}else{
  return
}
}
   
const deletecomment = async(idx) => {

  const deletealert = confirm("해당 댓글을 삭제하시겠습니까")

  if(deletealert){

  try{
   const res = await deletecommentapi(idx, route.params.idx)
   alert("삭제완료"+res.data)
  await QnAview();

  }catch(e){
    console.log(e)
  }
}else{
  return
}
}


const QnAview = async () => {

const res = await qna_one_api(route.params.idx);

name.value = res.data.name
title.value = res.data.title;
qnaState.value = res.data.qnaState;
userid.value = res.data.userid;
wdate.value = res.data.wdate;
content.value = res.data.content;
type.value = res.data.type;
uuid.value = res.data.uuid

console.log(userid.value)
console.log(userloginid._object.userloginid)

if(userid.value === userloginid._object.userloginid){ //수정 삭제버튼 드러나기

  userchk.value = true
}else{
  userchk.value = false
}


const res_comments = await commnet_list_api(route.params.idx);
comments.value = res_comments;

if(qnaState.value==='COMPLETE'){

  commentchk.value = false
}

if(comments.value.length > 0){
  
  commentlistchk.value = true
  WAITINGQnAch.value = true
}
else{
  commentlistchk.value = false
  WAITINGQnAch.value = false
}


};
watchEffect(async()=>{
  await QnAview();
})


</script>

<style lang="scss" scoped></style>