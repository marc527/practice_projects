import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    productAvailable (state, getters) {
      return (item) => item.inventory > 0
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(items => {
          commit('setProducts', items)
          resolve()
        })
      })
    }
  },
  mutations: {
    setProducts (state, items) {
      state.items = items
    },
    decreaseProductQuantity (state, id) {
      state.items.map(p => {
        if (p.id === id) {
          p.inventory--
        }
      })
    }
  }
}
