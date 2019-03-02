<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="item in cartItems">
        <p>{{item.title}} - {{ item.quantity }} - {{ item.price | currency }}</p>
      </li>
    </ul>
    <p>{{ cartTotal | currency }}</p>
    <button @click="checkout">Checkout</button>
    <p>Checkout Status: {{ checkoutStatus }}</p>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShoppingCart',
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      cartItems: 'cartProducts',
      cartTotal: 'cartTotal'
    })
  },
  methods: {
    ...mapActions('cart', {
      checkout: 'checkout'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
