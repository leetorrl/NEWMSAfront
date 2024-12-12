<template>
    <div class="p-10 mt-10 ml-3">
        <div>
            <h1 class="text-3xl font-bold text-blue-900">대시보드
            </h1>
        </div>
        <hr class="border-b border-[#eee] mt-4" />
        <hr class="mt-3 border-b-4 border-blue-900" />
        <main class="w-[68rem] flex">
            <div id="left" class="w-[34rem] relative h-[60vh]">
                <div id="left-top" class="relative p-5 border border-black top-5 rounded-2xl">
                    <h1 class="inline-flex text-2xl">
                        {{ username }}<span class="text-sm">({{ email }})</span>
                    </h1>
                    <div class="absolute inline-flex text-gray-100 bg-blue-900 top-5 right-5">
                        <button class="px-5 py-1 border-r border-gray-100">마이페이지</button>
                        <button class="px-5 py-1 border-l border-gray-100">로그아웃</button>
                    </div>
                    <p>{{ dayjs().format('YYYY년 MM월 DD일') }}</p>
                    <p class="mt-5">그린컴퓨터아트학원 | {{ lecturename }}</p>
                </div>

                <div id="left-bottom" class="absolute bottom-5">
                    <h1 class="w-full text-lg">그린컴퓨터아트학원 공지사항 Top 10</h1>
                    <table class="w-[33rem]">
                        <thead class="text-gray-100 bg-blue-900">
                            <tr>
                                <th class="p-1 border-r border-gray-300">제목</th>
                                <th class="p-1 border-l border-gray-300">작성일</th>
                            </tr>
                        </thead>
                        <tbody class="border-b border-blue-900">
                            <tr v-for="(announce, index) in announcelist" :key="index" class="text-center hover:underline hover:cursor-pointer hover:bg-gray-200" @click="viewPage(announce.idx)">
                                <td @click="viewPage(announce.idx)" class="pl-3 text-left border-t border-r border-gray-300">{{ announce.title.length > 23 ? announce.title.substring(0, 23) + '...' : announce.title }}</td>
                                <td @click="viewPage(announce.idx)" class="border-t border-l border-gray-300">{{
                                    announce.wdate.substring(0, 8) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="right" class="w-[34rem] bg-yellow-200">
                달력
            </div>
        </main>
    </div>
</template>

<script setup>
import { profiledata, getmylecture, stfetchannounceapi } from '@/api/student';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const email = ref('');
const lecturename = ref('');
const announcelist = ref([]);

const viewPage = (annoidx) => {

    const idx = Number(annoidx)

    console.log(idx)

    router.push({ name: 'announceview', params: { idx } });
};

onMounted(async () => {
    const profileres = await profiledata();

    username.value = profileres.data.name;
    email.value = profileres.data.email;

    const arr = await getmylecture();

    const activeLecture = arr.data.find(item => item.state === "수강중");

    lecturename.value = activeLecture ? activeLecture.title : null;

    const response = await stfetchannounceapi(1)
    announcelist.value = response.data.list;


    if (Cookies.get('token') == null) {
        router.push({ name: 'loginview' })
    }

});
</script>

<style lang="scss" scoped></style>