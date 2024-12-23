<template>
  <div class="p-10 mt-10 ml-3">
    <div>
      <h1 class="text-3xl font-bold text-blue-900">공지사항
      </h1>
    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <hr class="mt-3 border-b-4 border-blue-900" />

    <div class="ml-2 w-[68rem]">
      <div class="m-10 border border-gray-300">
        <hr class="m-1 ml-2 mr-2 border border-blue-500" />
        <div class="overflow-x-auto">
          <h1 class="m-2 ml-5 text-2xl font-bold ">{{ title }} <span class="text-sm">({{ lecture }})</span> <span
              class="inline-block mt-2 mr-5 text-sm float-end">{{ user }} {{ wdate }} </span> </h1>
          <hr class="m-1 ml-2 mr-2 border border-blue-500" />
          <div class="p-5">
            <div class="mt-8 mb-10 ">
              {{ body }}
            </div>
          </div>
        </div>
        <div @click="godeskannouncelist"
          class="flex float-left p-1 pl-3 pr-3 my-8 text-xl border-2 border-blue-300 rounded cursor-pointer hover:bg-blue-300 hover:opacity-80 hover:text-white">
          공지사항 리스트
        </div>
      </div>
      <div class="">
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { announce_list_api } from '@/api/announceApi.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const route = useRoute()
const router = useRouter()

const title = ref('')
const body = ref('')
const wdate = ref('')
const user = ref('')
const lecture = ref('')


const godeskannouncelist = () => {

  router.go(-1)
}

onMounted(async () => {
  const res = await announce_list_api(route.params.idx)

  title.value = res.data.title
  body.value = res.data.body
  wdate.value = res.data.wdate
  user.value = res.data.user
  lecture.value = res.data.lecture

  if (Cookies.get('token') == null) {
    //  if(localStorage.getItem('token')==null){
    router.push({ name: 'loginview' })
  }
})

</script>

<style lang="scss" scoped></style>