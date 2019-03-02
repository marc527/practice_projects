import shop from '@/api/shop'

export default {
  namespaced: true,
  state: {
    cart: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts (state, getters, rootState) {
      return state.cart.map(item => {
        const product = rootState.products.items.find(product => product.id === item.id)

        if (product) {
          return {
            title: product.title,
            quantity: item.quantity,
            price: product.price
          }
        }
      })
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, item) => total += item.price * item.quantity, 0)
    }
  },
  actions: {
    checkout ({ commit, state }) {

      shop.buyProducts (
        state.cart,
        () => {
          commit('setCheckoutStatus', 'success')
          commit('emptyCart')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )

    },
    addProductToCart({ commit, state, getters, rootState, rootGetters }, product) {

      if (rootGetters['products/productAvailable'](product)) {
        const cartItem = state.cart.find(p => p.id === product.id)

        if (cartItem) {
          commit("increaseCartProductQuantity", product.id)
        } else {
          commit("pushProductToCart", product)
        }

        commit("products/decreaseProductQuantity", product.id, { root: true })
      }
    }

  },
  mutations: {
    increaseCartProductQuantity (state, id) {
      state.cart.map(p => {
        if (p.id === id) {
          p.quantity++
        }
      })
    },
    pushProductToCart (state, product) {
      state.cart.push({
        id: product.id,
        quantity: 1
      })
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },
    emptyCart (state) {
      state.cart = []
    }
  }
}
