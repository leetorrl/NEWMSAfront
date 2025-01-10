<template>
  <div class="w-[360px] h-[640px] border">
    <!-- 이미지 -->
    <div class="">
      <img src="/src/images/qwe.png" alt="" class="" />
    </div>
    <!-- 로그인 창 -->
    <div class="h-[512px] flex items-start justify-center bg-gray-100">
      <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- 아이디 입력 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              id="email"
              v-model="email"
              placeholder="아이디를 입력하세요"
              class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <!-- 비밀번호 입력 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호를 입력하세요"
              class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <!-- 로그인 버튼 -->
          <div>
            <button
              @click="LoginSequence()"
              type="button"
              class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              로그인
            </button>
          </div>
        </form>
        <!-- 회원가입 및 비밀번호 찾기 -->
        <div class="mt-4 text-center text-sm text-gray-600">
          <div>
            계정이 없으신가요?
            <RouterLink to="/jointermsofuse">
              <div class="text-blue-500 hover:underline">회원가입</div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { userdata, logincontrol } from '@/api/loginapi';
import { useRouter } from 'vue-router';

const router = useRouter();
const userid = ref('');
const password = ref('');

const LoginSequence = async () => {
  const data = {
    userid: userid.value,
    password: password.value
  };
  try {
    const token = await logincontrol(data);
    console.log('최종 토큰' + token);
    await userdata();
    router.push({ name: 'mobilemypage' });
  } catch (e) {
    console.log('로그인실패 ' + e);
  }
};
</script>

<style lang="scss" scoped></style>
