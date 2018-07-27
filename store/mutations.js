export default {
  async changeCL({ commit }, { tabNav, Messages }) {
    console.log(commit)
    try {
      let data = { tabNav: tabNav, Messages: Messages }
      commit("CANNEL_MESSAGE", data)
    } catch (e) {
      throw e
    }
  }
}
