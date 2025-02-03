// vue.config.js
module.exports = {
  publicPath: './', // 상대 경로로 설정 (배포 시 필요한 경우)
  devServer: {
    historyApiFallback: true // 모든 요청을 index.html로 리디렉션
  },
  pwa: {
    name: 'My PWA App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#ffffff'
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
}
