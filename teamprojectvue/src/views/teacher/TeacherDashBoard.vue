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
                        {{ username }}<span class="text-sm items-center flex">({{ email }})</span>
                    </h1>
                    <div class="absolute inline-flex text-gray-100 bg-blue-900 top-5 right-5">
                        <button class="px-5 py-1 border-r border-gray-100"
                            @click="router.push({ name: 'mypage' })">마이페이지</button>
                        <button class="px-5 py-1 border-l border-gray-100" @click="logout">로그아웃</button>
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
                            <tr v-for="(announce, index) in announcelist" :key="index"
                                class="text-center hover:underline hover:cursor-pointer hover:bg-gray-200"
                                @click="viewPage(announce.idx)">
                                <td @click="viewPage(announce.idx)"
                                    class="pl-3 text-left border-t border-r border-gray-300">{{ announce.title.length >
                                        23 ? announce.title.substring(0, 23) + '...' : announce.title }}</td>
                                <td @click="viewPage(announce.idx)" class="border-t border-l border-gray-300">{{
                                    announce.wdate.substring(0, 8) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="right" class="w-[34rem]">
                <div id="calander" class="w-full p-4 bg-white rounded-lg">
                    <!-- 달력 헤더 -->
                    <div class="w-full p-2 text-2xl font-bold text-center text-gray-100 bg-blue-900 rounded-t-lg">
                        {{ now.format('YYYY년 MM월') }}
                    </div>

                    <hr class="border-b border-[#eee]" />

                    <div class="grid grid-cols-7 text-center text-gray-100 bg-blue-900">
                        <div class="p-2 px-4 pb-4 text-xl">일</div>
                        <div class="p-2 px-4 pb-4 text-xl">월</div>
                        <div class="p-2 px-4 pb-4 text-xl">화</div>
                        <div class="p-2 px-4 pb-4 text-xl">수</div>
                        <div class="p-2 px-4 pb-4 text-xl">목</div>
                        <div class="p-2 px-4 pb-4 text-xl">금</div>
                        <div class="p-2 px-4 pb-4 text-xl">토</div>
                    </div>

                    <!-- 달력 날짜 -->
                    <div class="grid grid-cols-7" v-for="group in groupColumns" :key="group.length">
                        <div v-for="(column, index) in group" :key="column.format('YYYY-MM-DD')"
                            class="p-2 text-center cursor-pointer hover:bg-blue-200 min-h-20 border-t-2 border-[#eee] text-gray-500"
                            :class="{
                                'text-red-500 border-r border-[#eee]': index % 7 == 0,
                                'text-blue-500 border-l border-[#eee]': index % 7 == 6,
                                'border-x border-[#eee]': index % 7 != 0 && index % 7 != 6,
                                '[background-color:rgba(238,238,238,0.3)]': index % 7 == 0 || index % 7 == 6,
                                'bg-red-200': column.format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD'),
                                'opacity-20': !column.isSame(now, 'month')
                            }">
                            <!-- 날짜 -->
                            <span>{{ column.get('date') }}</span>

                            <!-- 지각/조퇴/외출(▲), 결석(X), 휴가(O) 표시 -->
                            <template v-for="items in attlist" :key="items.adate">
                                <div v-if="items.adate == column.format('YYYY-MM-DD')">
                                    <!-- 부분 결석 표시 ▲ -->
                                    <div v-if="attlist.filter(att => att.adate == column.format('YYYY-MM-DD') && att.approval == null && (att.type === '조퇴' || att.type === '외출' || att.type === '지각')).indexOf(items) === 0"
                                        class="mt-2 text-green-600">
                                        <div
                                            class="w-full font-semibold text-white bg-green-500 rounded focus:outline-none focus:shadow-outline">
                                            ▲x{{ attlist.filter(att => att.adate == column.format('YYYY-MM-DD') &&
                                                att.approval == null && (att.type === '조퇴' || att.type === '외출' || att.type
                                                    === '지각')).length }}
                                        </div>
                                    </div>
                                    <!-- 결석 표시 X -->
                                    <div v-if="items.approval == null && items.type === '결석'" class="mt-2 text-red-600">
                                        <div
                                            class="w-full font-semibold text-white bg-red-500 rounded focus:outline-none focus:shadow-outline">
                                            X
                                        </div>
                                    </div>
                                    <!-- 휴가 표시 O -->
                                    <div v-if="items.approval != null && items.type === '휴가'"
                                        class="mt-2 text-blue-600">
                                        <div
                                            class="w-full font-semibold text-white bg-blue-500 rounded focus:outline-none focus:shadow-outline">
                                            O
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="mt-2 text-gray-100">
                        <div
                            class="w-full font-semibold text-gray-100 bg-blue-900 rounded focus:outline-none focus:shadow-outline">
                            결석 {{ totalX }}회, 부분 결석 {{ totalTardy }}회
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { profiledata, getmylecture, stfetchannounceapi, stshowuserattapi, stshowuseratt2api } from '@/api/student';
import { onMounted, ref, watch, computed } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { userrole } from '@/api/loginapi';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';

const router = useRouter();
const loginStore = useloginStore();
const { userrl } = storeToRefs(loginStore)
const { loginchecktrue } = loginStore;

const username = ref('');
const email = ref('');
const lecturename = ref('');
const announcelist = ref([]);

dayjs.locale('ko');
const now = ref(dayjs());
const columns = ref([]);
const groupColumns = ref([]);
const attlist = ref([]);

const user = ref(null);

const dailyCounts = ref({});

const calculateDailyCounts = () => {
    // 초기화
    dailyCounts.value = {};

    // attlist가 비어있는 경우를 확인
    if (!attlist.value || attlist.value.length === 0) return;

    attlist.value.forEach((item) => {
        const date = item.adate;

        // 날짜별 데이터를 초기화
        if (!dailyCounts.value[date]) {
            dailyCounts.value[date] = { x: 0, triangle: 0 };
        }

        // 조건에 따라 ▲와 X를 계산
        if (item.type === '결석') {
            dailyCounts.value[date].x += 1;
        } else if (['지각', '조퇴', '외출'].includes(item.type)) {
            dailyCounts.value[date].triangle += 1;
        }
    });

    // ▲가 3개 이상이면 X로 변환
    Object.keys(dailyCounts.value).forEach((date) => {
        const triangles = dailyCounts.value[date].triangle;
        if (triangles >= 3) {
            const additionalX = Math.floor(triangles / 3);
            dailyCounts.value[date].x += additionalX;
            dailyCounts.value[date].triangle = triangles % 3;
        }
    });
};

const totalX = computed(() => {
    // 결석 X의 개수
    const xCount = attlist.value.filter(att => att.type === '결석' && att.approval === null).length;

    // 지각, 조퇴, 외출(▲)의 개수
    const tardies = attlist.value.filter(
        att => (att.type === '지각' || att.type === '조퇴' || att.type === '외출') && att.approval === null
    );

    // ▲ 3개를 1개의 X로 변환
    const totalConvertedX = Math.floor(tardies.length / 3); // 3개를 X 1개로 변환

    return xCount + totalConvertedX; // 결석(X) + 변환된 X 총합
});

const totalTardy = computed(() => {
    // 지각, 조퇴, 외출(▲)의 개수
    const tardies = attlist.value.filter(
        att => (att.type === '지각' || att.type === '조퇴' || att.type === '외출') && att.approval === null
    );

    // ▲ 3개를 X 1개로 변환할 때, ▲ 개수만 계산
    return tardies.length % 3; // 남은 ▲ 개수 (3개가 1개의 X로 변환되므로, 남은 ▲는 % 3)
});


watch(
    now,
    (newValue, _) => {
        columns.value = []; // 원래 있던 값 제거
        groupColumns.value = []; // 원래 있던 값 제거
        // 제일 처음 로딩 할때는 now는 현재 달력...
        const startday = dayjs(now.value).startOf('month');
        const lastday = dayjs(now.value).endOf('month');
        const startdayOfWeek = startday.get('day');
        const lastdayOfWeek = lastday.get('day');

        // 저번달에 날짜 추가
        for (let i = 1; i <= startdayOfWeek; i++) {
            columns.value.unshift(dayjs(startday).subtract(i, 'day'));
        }
        // 현재 달력에 날짜 추가
        for (let i = 0; i < lastday.get('date'); i++) {
            columns.value.push(dayjs(startday).add(i, 'day'));
        }
        // 다음달에 날짜 추가
        for (let i = 1; i <= 6 - lastdayOfWeek; i++) {
            columns.value.push(dayjs(lastday).add(i, 'day'));
        }
        // groupColumns
        //   7                 7                   7                     7                      7
        // ([29,30,1,2,3,4,5],[6,7,8,9,10,11,12],[13,14,15,16,17,18,19],[20,21,22,23,24,25,26],[27,28,29,30,31,1,2]))

        groupColumns.value.push(columns.value.slice(0, 7));
        groupColumns.value.push(columns.value.slice(7, 14));
        groupColumns.value.push(columns.value.slice(14, 21));
        groupColumns.value.push(columns.value.slice(21, 28));
        groupColumns.value.push(columns.value.slice(28, 35));
    },
    {
        immediate: true, // 현재페이지 처음 로딩 될때 도 실행
        deep: true // 안에 값이 객체이면 객체 안에 변수도 변경 될때 watch안에 있는 함수 실행
    }
);

const showuser = async () => {
    try {

        const resuser = await stshowuserattapi()
        console.log(resuser.data);
        user.value = resuser.data;
        const data = {
            user: user.value,
            month: dayjs(now.value).format('YYYY-MM')
        };

        const resatt = await stshowuseratt2api(data)

        attlist.value = resatt.data;
        console.log(attlist.value);
    } catch (e) {
        console.log(e);
    }
};

const viewPage = (annoidx) => {

    const idx = Number(annoidx)

    console.log(idx)

    router.push({ name: 'announceview', params: { idx } });
};

onMounted(async () => {

    if (Cookies.get('token') == null) {
        router.push({ name: 'loginview' })
    }

    const profileres = await profiledata();

    username.value = profileres.data.name;
    email.value = profileres.data.email;

    const arr = await getmylecture();

    const activeLecture = arr.data.find(item => item.state === "수강중");

    lecturename.value = activeLecture ? activeLecture.title : null;

    const response = await stfetchannounceapi(1);
    announcelist.value = response.data.list;

    await showuser();
    calculateDailyCounts();

});

const logout = async () => {

    userrl.value = null

    Cookies.remove('token')
    // localStorage.removeItem('token');
    loginchecktrue();
    userrole();
    router.push({ name: 'loginview' });
};

watch(attlist, calculateDailyCounts);
</script>

<style lang="scss" scoped></style>