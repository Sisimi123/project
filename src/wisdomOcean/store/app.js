
export default {
  state: {
    searchHeight: 0,
    orginalSinglePage: 0,
    orginalFlexWrap: 0,
    treeHeight: 0,
    bottomHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
    contentHeight: 0
  },
  mutations: {
    setWidthAndHeight (state, height, width, contentHeight) {
      state.clientHeight = height
      state.clientWidth = width
      state.contentHeight = contentHeight
    },
    setSearchHeight (state, height) {
      state.searchHeight = height
    },
    setBottomHeight (state, height) {
      state.bottomHeight = height
    },
    setPageHeight (state, height) {
      if (height > 900) {
        state.orginalSinglePage = height - 45
      } else {
        state.orginalSinglePage = height
      }
      state.orginalFlexWrap = 0
      state.treeHeight = state.orginalSinglePage - 50 - 32 - 6
    },
    setWrapHeight (state, height) {
      state.orginalSinglePage = 0
      state.orginalFlexWrap = height - 55 - 10 - 16 - 7
      state.treeHeight = state.orginalFlexWrap - 50 - 32 - 6
    }
  },
  actions: {
  }
}
