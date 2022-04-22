import {createStore} from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  token: '',
  username: '',
  userId: 0,
  avatar: ""
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store