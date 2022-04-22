export default {
  AaddBase(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('MaddBase', payload)
    })
  },
  AUploadAvatar(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('MUploadAvatar', payload)
    })
  }
}