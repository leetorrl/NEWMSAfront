<template>
  <div class="p-10 mt-10 ml-3">
    <div id="user">
      <h1 class="text-3xl font-bold text-blue-900" v-if="user">출결 관리
        <span v-if="useravail" class="text-2xl font-bold text-green-700">◆ {{ attlist.at(0).lecture }}</span>
        <span v-if="!useravail" class="text-2xl font-bold text-red-700">◆ {{ usererror }}</span>
      </h1>

    </div>
    <hr class="border-b border-[#eee] mt-4" />
    <div id="main" class="items-center justify-center mt-3 w-[68rem]">
      <hr class="border-b-4 border-blue-900" />
      <h1 class="my-4 text-xl font-bold text-center text-blue-900">
        <button @click="subMonth()" class="mr-2">
          <p class="fas fa-arrow-left">◀</p>
        </button>
        {{ now.format('YYYY.MM') }}
        <button @click="addMonth()" class="ml-2">
          <p class="fas fa-arrow-right">▶</p>
        </button>
      </h1>
      <hr class="border-b-4 border-blue-900" />

      <div v-if="useravail" id="attendance" class="flex">
        <div id="calander" class="w-full p-4 bg-white rounded-lg ">
          <div class="grid grid-cols-7 text-center text-gray-500">
            <div class="p-2 px-4 pb-4 text-xl text-red-500 border-r border-[#eee]">일</div>
            <div class="p-2 px-4 pb-4 text-xl border-x border[#eee]">월</div>
            <div class="p-2 px-4 pb-4 text-xl border-x border[#eee]">화</div>
            <div class="p-2 px-4 pb-4 text-xl border-x border[#eee]">수</div>
            <div class="p-2 px-4 pb-4 text-xl border-x border[#eee]">목</div>
            <div class="p-2 px-4 pb-4 text-xl border-x border[#eee]">금</div>
            <div class="p-2 px-4 pb-4 text-xl border-l border-[#eee] text-blue-500">토</div>
          </div>
          <div class="grid grid-cols-7 " v-for="group in groupColumns" :key="group.length">
            <div @click="selectDateFn(column, index)" v-for="(column, index) in group"
              :key="column.format('YYYY-MM-DD')"
              class="p-2 text-center cursor-pointer hover:bg-blue-200 min-h-24 max-h-36 border-t-2 border-[#eee] text-gray-500"
              :class="{
                'text-red-500 border-r border-[#eee]': index % 7 == 0,
                'text-blue-500 border-l border-[#eee]': index % 7 == 6,
                'border-x border-[#eee]': index % 7 != 0 && index % 7 != 6,
                '[background-color:rgba(238,238,238,0.3)]': index % 7 == 0 || index % 7 == 6,
                'bg-red-200': column.format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD'),
                'opacity-20': !column.isSame(now, 'month')
              }">
              <span>{{ column.get('date') }}</span>
              <template v-for="items in attlist" :key="items.adate">
                <div v-if="items.adate == column.format('YYYY-MM-DD')">
                  <div class="mt-2 text-green-600">
                    <div class="w-full font-semibold text-white rounded focus:outline-none focus:shadow-outline" :class="{
                      'bg-green-500':
                        items.approval == null &&
                        (items.type === '조퇴' || items.type === '외출' || items.type === '지각'),
                      'bg-red-500': items.approval == null && items.type === '결석',
                      'bg-blue-500': items.approval != null
                    }">
                      {{ items.type }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div id="attadd" v-show="selectDate" class="p-2 bg-blue-900 w-[17.5vw] mt-2 rounded-lg">
          <h1 class="text-xl text-gray-100">{{ selectDate }}</h1>
          <div v-for="items in attlist" :key="items.adate">
            <div v-if="items.adate == selectDate">
              <div @click="(event) => selectAttFn(event, items, column)"
                class="w-full py-2 my-2 font-semibold text-center text-white rounded focus:outline-none focus:shadow-outline"
                :class="{
                  'bg-green-500 hover:bg-green-700 hover:cursor-pointer':
                    items.approval == null &&
                    (items.type === '조퇴' || items.type === '외출' || items.type === '지각'),
                  'bg-red-500 hover:bg-red-700 hover:cursor-pointer': items.approval == null && items.type === '결석',
                  'bg-blue-500': items.approval != null
                }">{{ items.type }}<span v-if="items.type != '휴가'"> - 상세 보기</span></div>
            </div>
          </div>
          <div @click="AttAdd()"
            class="w-full py-2 my-2 font-semibold text-center text-gray-600 bg-white rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline hover:cursor-pointer">
            +
          </div>
          <div id="attadd" v-show="selectAttAdd" class="p-3 text-gray-600 rounded bg-slate-100">
            <h1>추가하기</h1>
            <div>
              <label for="attendance">1. 출결 변동 사항 선택</label>
              <form action="">
                <input type="radio" value="지각" id="type-1" name="attendance" v-model="type" checked />
                <label for="type-1" class="p-1 pr-3 text-sm">지각</label>

                <input type="radio" value="조퇴" id="type-2" name="attendance" v-model="type" />
                <label for="type-2" class="p-1 pr-3 text-sm">조퇴</label>
                <br>
                <input type="radio" value="외출" id="type-3" name="attendance" v-model="type" />
                <label for="type-3" class="p-1 pr-3 text-sm">외출</label>

                <input type="radio" value="결석" id="type-4" name="attendance" v-model="type" />
                <label for="type-4" class="p-1 pr-3 text-sm">결석</label>
              </form>
            </div>

            <p class="mt-1">2. 출결 변동의 원인</p>
            <p>
              <input type="text" placeholder="예시) 병원, 예비군 등" class="pl-1 border border-gray-500" v-model="reason" />
            </p>
            <div class="mt-2">
              <label for="approval">3. 출석 인정 사유에 해당</label>
              <form action="">
                <input type="radio" value="false" id="approval-1" name="approval" v-model="approval" required />
                <label for="approval-1" class="p-1 pr-3">예</label>
                <input type="radio" value="null" id="approval-2" name="approval" v-model="approval" required />
                <label for="approval-2" class="p-1 pr-3">아니오</label>
              </form>
            </div>
            <button @click="attupdate"
              class="px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button">
              제출하기
            </button>
          </div>

          <div id="attupdate" v-show="selectAtt" class="p-3 text-gray-600 rounded bg-slate-100">
            <h1 v-if="selectAtt">{{ selectAtt.type }}</h1>
            <div>
              <label for="attendance">1. 출결 변동 사항 선택</label>
              <form action="">
                <input type="radio" value="지각" id="type-1" name="attendance" v-model="type" />
                <label for="type-1" class="p-1 pr-3 text-sm">지각</label>

                <input type="radio" value="조퇴" id="type-2" name="attendance" v-model="type" />
                <label for="type-2" class="p-1 pr-3 text-sm">조퇴</label>
                <br>
                <input type="radio" value="외출" id="type-3" name="attendance" v-model="type" />
                <label for="type-3" class="p-1 pr-3 text-sm">외출</label>

                <input type="radio" value="결석" id="type-4" name="attendance" v-model="type" />
                <label for="type-4" class="p-1 pr-3 text-sm">결석</label>
              </form>
            </div>
            <p class="mt-1">2. 출결 변동의 원인</p>
            <p>
              <input type="text" placeholder="예시) 병원, 예비군 등" class="pl-1 border border-gray-500" v-model="reason" />
            </p>
            <div class="mt-2">
              <label for="approval">3. 출석 인정 사유에 해당</label>
              <form action="">
                <input type="radio" :value="false" id="approval-1" name="approval" v-model="approval" required />
                <label for="approval-1" class="p-1 pr-3">예</label>
                <input type="radio" :value="null" id="approval-2" name="approval" v-model="approval" required />
                <label for="approval-2" class="p-1 pr-3">아니오</label>
              </form>
            </div>
            <button @click="attupdate"
              class="px-3 py-2 mt-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button">
              수정하기
            </button>
            <button @click="attdelete"
              class="px-3 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              type="button">
              삭제하기
            </button>
          </div>
        </div>
      </div>

      <div v-else class="mt-44">
        <h1 class="flex justify-center">
          << 먼저 강좌를 선택하여 주시길 바랍니다.>>
        </h1>
        <div class="flex justify-center">
          <button class="p-2 pl-8 pr-8 m-5 text-white bg-blue-800 border-2 border-blue-800 rounded-md"
            @click="golectureselect">
            강좌 리스트 보러가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { stshowuserattapi } from '@/api/student';
import { stshowuseratt2api } from '@/api/student';
import { stattupdate } from '@/api/student';
import { stattdelete } from '@/api/student';
import Cookies from 'js-cookie';

// import StudentSideBar from '@/layout/StudentSideBar.vue';
dayjs.locale('ko');
const now = ref(dayjs());
const columns = ref([]);
const groupColumns = ref([]);

const selectDate = ref(dayjs().format('YYYY-MM-DD'));
const selectAtt = ref(null);
const selectAttAdd = ref(false);

const subMonth = () => {
  now.value = dayjs(now.value).subtract(1, 'month');
  showuser();
};
const addMonth = () => {
  now.value = dayjs(now.value).add(1, 'month');
  showuser();
};

// 상태 초기화를 위한 함수
const resetAttendanceFields = () => {
  type.value = '지각';
  reason.value = null;
  approval.value = null;
  oldtype.value = null;
  attDate.value = null;
};

const oldtype = ref('');
const attDate = ref('');

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

const router = useRouter();

const user = ref(null);
const type = ref('지각');
const reason = ref('');
const approval = ref(null);
const useravail = ref(false);
const usererror = ref('');

const attlist = ref([]);

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
    useravail.value = true;
    console.log(attlist.value);
  } catch (e) {
    console.log(e);
    useravail.value = false;
    usererror.value = '사용자를 찾을 수 없습니다.';
  }
};

const attupdate = async () => {
  if (!useravail.value) {
    alert('사용자가 유효하지 않습니다.');
    return;
  }

  const data = {
    type: type.value,
    reason: reason.value,
    adate: selectDate.value == null ? attDate.value : selectDate.value,
    approval: approval.value,
    oldtype: oldtype.value,
    user: user.value
  };

  try {
    const res = await stattupdate(data)
    console.log(res);
    alert(
      `${selectDate.value == null ? attDate.value : selectDate.value}, ${type.value} 요청 완료!`
    );
    await showuser();
  } catch (e) {
    console.log(e);
    alert('에러');
  }
};

const attdelete = async () => {
  if (!useravail.value) {
    alert('사용자가 유효하지 않습니다.');
    return;
  }

  try {
    const res = stattdelete(selectAtt.value.idx)
    console.log(res);
    alert(`${attDate.value}, ${type.value} 삭제 요청 완료!`);
    selectAtt.value = null;
    showuser();
  } catch (e) {
    console.log(e);
    alert('에러');
  }
};

const selectDateFn = (date, index) => {
  // 사용자가 유효하지 않다면 바로 리턴
  if (!useravail.value) return;
  if (index % 7 == 0 || index % 7 == 6) return;
  if (dayjs(date).format('YYYY-MM') != dayjs(now.value).format('YYYY-MM')) return;

  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  selectDate.value = formattedDate;
  selectAtt.value = null; // 출결 수정용 선택 비활성화
  selectAttAdd.value = false;
  resetAttendanceFields();
};

const selectAttFn = (event, items, date) => {
  // 사용자가 유효하지 않다면 바로 리턴
  event.stopPropagation();
  if (!useravail.value) return;
  if (items.type == '휴가') return;
  if (dayjs(date).format('YYYY-MM') != dayjs(now.value).format('YYYY-MM')) return;

  // 이미 선택된 출결 항목을 클릭하면 선택 취소
  if (selectAtt.value === items) {
    selectAtt.value = null;
    resetAttendanceFields();
  } else {
    // 새로운 출결 항목을 선택할 경우 상태 초기화 및 설정
    selectAtt.value = items;
    selectAttAdd.value = false;
    type.value = items.type;
    reason.value = items.reason;
    oldtype.value = items.type;
    attDate.value = items.adate;
    approval.value = items.approval == null ? null : false;
  }
};

const AttAdd = () => {
  selectAtt.value = null;

  if (selectAttAdd.value) {
    selectAttAdd.value = false;
    resetAttendanceFields();
  } else {
    selectAttAdd.value = true;
    resetAttendanceFields();
  }
}

const golectureselect = () => {
  router.push({ name: 'lectureselect' });
};

onMounted(async () => {
  await showuser();

  if (Cookies.get('token') == null) {
    // if(localStorage.getItem('token')==null){  
    router.push({ name: 'loginview' })
  }
});
</script>

<style lang="scss" scoped></style>
