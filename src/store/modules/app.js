const state = {
    bodyWidth: 0,
}

const mutations = {
    SET_BODYWIDTH: (state, val) => {
        state.bodyWidth = val
    }
}

const actions = {
    setBodyWidth({ commit }, val) {
        commit('SET_BODYWIDTH', val)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
