<template>
  <img src="/src/images/wall5.png" alt="" class="absolute w-screen h-screen opacity-50" />
  <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-[48%] left-1/2">
    <div class="flex justify-center bg-gray-300 bg-opacity-30">
      <img src="/src/images/LOGO.png" alt="" class="w-28" />
      <h1
        class="font-mono font-black italic text-3xl tracking-tight flex items-center text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">
        GREEN COMPUTER ACADEMY
      </h1>
    </div>
    <div class="w-[1000px] flex mt-8 bg-white shadow-md rounded-lg">
      <!-- 로그인 섹션 -->
      <div class="w-[60%] flex flex-col items-center">
        <div class="w-full space-y-3">
          <div class="flex w-full">
            <div
              class="flex items-center justify-center w-1/3 h-16 text-xl bg-white border rounded-tl-lg cursor-pointer"
              @click="Choicest" :style="{ backgroundColor: isClicked1 ? '#eee' : 'white' }">학생</div>
            <div class="flex items-center justify-center w-1/3 h-16 text-xl bg-white border cursor-pointer "
              @click="Choicete" :style="{ backgroundColor: isClicked2 ? '#eee' : 'white' }">강사</div>
            <div class="flex items-center justify-center w-1/3 h-16 text-xl bg-white border cursor-pointer"
              @click="Choicema" :style="{ backgroundColor: isClicked3 ? '#eee' : 'white' }">매니저</div>
            <br>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <div class="py-16">
            <div class="flex flex-col justify-between space-y-10 text-center">
              <div class="flex flex-col justify-between h-32 space-y-10 text-center mt-5">
                <div class="flex h-8">
                  <p class="text-left w-36 items-center flex">ID</p>
                  <input class="flex-1 transition duration-200 border-b border-gray-400 w-80 focus:outline-none"
                    type="text" name="userid" id="userid" placeholder="아이디를 입력해주세요" v-model="userid" />
                </div>
                <div class="flex h-8">
                  <p class="text-left w-36 items-center flex">PASSWORD</p>
                  <input class=" flex-1 transition duration-200 border-b border-gray-400 w-80 focus:outline-none"
                    type="password" name="password" id="password" v-model="password" placeholder="비밀번호를 입력해주세요"
                    @keydown.enter="LoginSequence" />
                </div>
              </div>
              <div class="h-20">
                <div class="h-16">
                  <input @click="LoginSequence"
                    class="px-16 py-2 mt-2 font-bold text-white transition duration-200 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-300 hover:scale-x-105"
                    type="button" value="로그인" />
                <p class="block mt-2 font-bold text-rose-600" v-if="loginError">{{ loginError }}</p>
                </div>
                <div class="mt-5">
                  <router-link to="jointermsofuse">
                    <button class="text-sm text-blue-900">회원이 아니신가요?</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Notice Box Section -->
      <div class="w-[40%] flex items-center justify-center bg-gray-100 p-4 rounded-r-lg shadow-inner">
        <div class="text-center">
          <div>
            <div v-if="arr">
              <p class="py-2 text-[1.5rem] font-semibold text-left text-gray-600">공지사항</p>
              <ul v-for="(item, index) in arr" :key="item.idx">
                <li v-if="index < 5" class="text-[1vw] text-left mt-1">{{ item.title }}</li>
                <li v-if="index < 5" class="text-[0.7vw] text-right mb-1">{{ item.wdate.substring(0, 8) }}</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useloginStore } from '@/stores/loginpinia';
import { storeToRefs } from 'pinia';
import { userdata, userrole, logincontrol } from '@/api/loginapi';
import { onMounted } from 'vue';
import Cookies from 'js-cookie';
import { announce_list_api } from '@/api/announceApi.js';

const loginpinia = useloginStore();

const { userrl, useraccept } = storeToRefs(loginpinia);
const { userL } = loginpinia;

const userid = ref('');
const password = ref('');
const role = ref('ROLE_STUDENT')

const loginError = ref('');
const router = useRouter();

const arr = ref([]);

const radiocheck = ref('ROLE_STUDENT')

const isClicked1 = ref(true)
const isClicked2 = ref(false)
const isClicked3 = ref(false)

const getannounce = async () => {
  const res = await announce_list_api();
  arr.value = res.data.list;
}

const LoginSequence = async () => {
  const data = {
    userid: userid.value,
    password: password.value
    // role: role.value
  };
  // 백엔드로 보낼 데이터
  try {
    const token = await logincontrol(data);

    if (await token === undefined) {
      loginError.value = '아이디와 비밀번호, 권한체크를 확인해 주세요'
      return;
    }
    console.log('최종 토큰' + token);
    await userdata();
    userL()
    if ( !useraccept.value) {
      userL();
      Cookies.remove('token')
      alert("승인요청이 되지 않은 계정입니다.")
      return
    }
    await userrole();
    if (userrl.value == 'ROLE_STUDENT') {
      console.log('학생계정');
      router.push({ name: 'studentmain' });
    } else if (userrl.value == 'ROLE_TEACHER') {

      console.log(useraccept.value)
        console.log('선생계정');
        router.push({ name: 'teacherdashboard' });
     
    } else if (userrl.value == 'ROLE_MANAGER') {
      console.log('매니저계정');
      router.push({ name: 'deskdashboard' });
    } else {
      console.log('맵핑문제');
    }
  } catch (e) {
    console.log('로그인실패 ' + e);
    loginError.value = '아이디와 비밀번호를 확인해 주세요';
    return;
  }
};


const Choicest = () => {
  isClicked1.value = true
  isClicked2.value = false
  isClicked3.value = false
  radiocheck.value = 'ROLE_STUDENT'
  role.value=radiocheck.value
  console.log(radiocheck.value)
}
const Choicete = () => {
  isClicked1.value = false
  isClicked2.value = true
  isClicked3.value = false
  radiocheck.value = 'ROLE_TEACHER'
  role.value=radiocheck.value
  console.log(radiocheck.value)
}
const Choicema = () => {
  isClicked1.value = false
  isClicked2.value = false
  isClicked3.value = true
  radiocheck.value = 'ROLE_MANAGER'
  role.value=radiocheck.value
  console.log(radiocheck.value)
}


onMounted(async () => {
  await getannounce();
  userL();
});
</script>

<style lang="scss" scoped></style>
