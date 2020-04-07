
import { isNull, isEmpty } from '@/libs/common'

export default {
  state: {
    userInfo: undefined
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      if (state.userInfo) {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
    }
  },
  getters: {
    getUserInfo: (state) => () => {
      if (isNull(state.userInfo)) {
        let json = sessionStorage.getItem('userInfo');
        if (!isEmpty(json)) {
          state.userInfo = JSON.parse(json)
        }
      }
      return state.userInfo
    }
  },
  actions: {

  }
}
