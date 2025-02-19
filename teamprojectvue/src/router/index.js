import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/guest/LoginView.vue'
// import LoginHome from '@/views/LoginHome.vue'
import VacationForm from '@/views/student/VacationForm.vue'
import JoinView from '@/views/guest/JoinView.vue'
import Mypage from '@/views/MyPage.vue'
import LectureSelect from '@/views/LectureSelect.vue'
import AttendanceCheck from '@/views/AttendanceCheck.vue'
import GuestAttendance from '@/views/guest/GuestAttendance.vue'
import JoinTermsOfUse from '@/views/JoinTermsOfUse.vue'
import LectureApprovallist from '@/views/LectureApprovallist.vue'
import JoinComplete from '@/views/JoinComplete.vue'
import LectureInsert from '@/views/LectureInsert.vue'
import StudentAttendance from '@/views/student/StudentAttendance.vue'
import TeacherCalander from '@/views/teacher/TeacherCalander.vue'

import VacationManage from '@/views/Desk/VacationManage.vue'
import DeskCalander from '@/views/Desk/DeskCalander.vue'
import StudentVacation from '@/views/student/StudentVacation.vue'
import DeskAnnounceList from '@/views/Desk/DeskAnnounceList.vue'
import DeskAnnouncewrite from '@/views/Desk/DeskAnnouncewrite.vue'
import Announceview from '@/views/AnnounceView.vue'
import TeacherAnnounceList from '@/views/teacher/TeacherAnnounceList.vue'
import StudentAnnounceList from '@/views/student/StudentAnnounceList.vue'
import TeacherVacation from '@/views/teacher/TeacherVacation.vue'
import TeacherAnnouncewrite from '@/views/teacher/TeacherAnnouncewrite.vue'
import StudentDashBoard from '@/views/student/StudentDashBoard.vue'
import QnAborad from '@/views/qna/QnAborad.vue'
import QnAboradView from '@/views/qna/QnAboradView.vue'
import QnAboardsave from '@/views/qna/QnAboardsave.vue'
import QnAboardchange from '@/views/qna/QnAboardchange.vue'
import TeacherToday from '@/views/teacher/TeacherToday.vue'
import TeacherDashBoard from '@/views/teacher/TeacherDashBoard.vue'
import DeskDashBoard from '@/views/Desk/DeskDashBoard.vue'
import MobileMyPage from '@/views/mobile/MobileMyPage.vue'
import MobileLogIn from '@/views/mobile/MobileLogIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'loginhome',
    //   component: LoginHome
    // },
    {
      path: '/qnaboardchange/:idx',
      name: 'qnaboardchange',
      component: QnAboardchange
    },
    {
      path: '/qnaboradsave',
      name: 'qnaboradsave',
      component: QnAboardsave
    },
    {
      path: '/qnaborad',
      name: 'qnaborad',
      component: QnAborad
    },
    {
      path: '/qnaboradview/:idx',
      name: 'qnaboradview',
      component: QnAboradView
    },
    {
      path: '/announceview/:idx',
      name: 'announceview',
      component: Announceview
    },
    {
      path: '/studentmain',
      name: 'studentmain',
      component: StudentDashBoard
    },
    {
      path: '/teacherannouncewrite',
      name: 'teacherannouncewrite',
      component: TeacherAnnouncewrite
    },
    {
      path: '/teachervacation',
      name: 'teachervacation',
      component: TeacherVacation
    },
    {
      path: '/studentannouncelist',
      name: 'studentannouncelist',
      component: StudentAnnounceList
    },
    {
      path: '/teacherannouncelist',
      name: 'teacherannouncelist',
      component: TeacherAnnounceList
    },
    {
      path: '/DeskAnnouncewrite',
      name: 'deskannouncewrite',
      component:  DeskAnnouncewrite
    },
    {
      path: '/DeskAnnounceList',
      name: 'deskannouncelist',
      component:  DeskAnnounceList
    },
    {
      path: '/loginview',
      name: 'loginview',
      component: LoginView
    },
    {
      path: '/studentvacation',
      name: 'studentvacation',
      component: StudentVacation
    },
    {
      path: '/teachertoday',
      name: 'teachertoday',
      component: TeacherToday
    },
    {
      path: '/DeskCalander',
      name: 'deskcalander',
      component: DeskCalander
    },
    {
      path: '/VacationManage',
      name: 'vacationmanage',
      component: VacationManage
    },
    {
      path: '/TeacherToday',
      name: 'teachertoday',
      component: TeacherToday
    },
    {
      path: '/guestattendance',
      name: 'guestattendance',
      component: GuestAttendance
    },
    {
      path: '/stdatt',
      name: 'stdatt',
      component: StudentAttendance
    },

    {
      path: '/joinview',
      name: 'joinview',
      component: JoinView
    },
    {
      path: '/vacationform',
      name: 'vacationform',
      component: VacationForm
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage
    },
    {
      path: '/lectureselect',
      name: 'lectureselect',
      component: LectureSelect
    },
    {
      path: '/attendancecheck',
      name: 'attendancecheck',
      component: AttendanceCheck
    },
    {
      path: '/jointermsofuse',
      name: 'jointermsofuse',
      component: JoinTermsOfUse
    },
    {
      path: '/LectureApprovallist',
      name: 'lectureapprovallist',
      component: LectureApprovallist
    },
    {
      path: '/joincomplete',
      name: 'joincomplete',
      component: JoinComplete
    },
    {
      path: '/lectureinsert',
      name: 'lectureinsert',
      component: LectureInsert
    },
    // {

    //   path: '/Devmenu',
    //   name: 'devmenu',
    //   component: Devmenu
    // },
    {
      path: '/TeacherCalander',
      name: 'teachercalander',
      component: TeacherCalander
    },
    {
      path: '/studentvacation',
      name: 'studentvacation',
      component: StudentVacation
    },
    {
      path: '/teacherdashboard',
      name: 'teacherdashboard',
      component: TeacherDashBoard
    },
    {
      path: '/deskdashboard',
      name: 'deskdashboard',
      component: DeskDashBoard
    },
    {
      path: '/mobilemypage',
      name: 'mobilemypage',
      component: MobileMyPage
    },
    {
      path: '/mobilelogin',
      name: 'mobilelogin',
      component: MobileLogIn
    },
  ],


  scrollBehavior (to, from, savePositior){ //라우터시 스크롤 맨위로 올라가게해줌

    return {top : 0}
  }
})


export default router
