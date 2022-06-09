import router from './index'

router.beforeEach((to) => {
  // console.log(to.meta.auth)
  if (to.meta.auth) {
    const { name } = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (name) {
      return true
    } else {
      return '/'
    }
  }

  return true
})
