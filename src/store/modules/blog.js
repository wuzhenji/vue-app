const state = {
    showLeftBar: false,
    tagid: ''
}

const mutations = {
    SET_LeftBarStatus: (state, val) => {
        state.showLeftBar = val
    },
    SET_TagId: (state, val) => {
        state.tagid = val
    }
}

const actions = {
    setLeftBarStatus({ commit }, val) {
        commit('SET_LeftBarStatus', val)
    },
    setTagId({ commit }, val) {
        commit('SET_TagId', val ? val : '')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
