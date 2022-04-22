export default {
  MaddBase(state, payload) {
    state.token = payload.token
    state.username = payload.username
    state.userId = payload.userId
    state.avatar = payload.avatar
  },
  DeledtBase(state, payload) {
    state.token = payload.token
    state.username = payload.username
    state.userId = payload.userId
    state.avatar = payload.avatar
  },
  MUploadAvatar(state, payload) {
    state.avatar = payload.avatar
  }
}