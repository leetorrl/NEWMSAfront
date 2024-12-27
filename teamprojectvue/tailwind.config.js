/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '1920px': '1920px', // 1920px 기준 브레이크포인트 추가
      },
    },
  },
  plugins: []
}
