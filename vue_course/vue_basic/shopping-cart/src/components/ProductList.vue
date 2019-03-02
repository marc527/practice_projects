<template>
  <div>
    <h1>Product List</h1>
    <p v-if="loading">Loading...</p>
    <ul v-else>
      <li v-for="product in products">
        <p>{{product.title}} - {{ product.inventory }} - {{ product.price | currency }}
        <button :disabled="!productAvailable(product)" @click="addProductToCart(product)">Add to Cart</button></p>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductList',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState({
      'products': state => state.products.items
    }),

    ...mapGetters('products', {
      'productAvailable': 'productAvailable'
    })
  },
  created () {
    this.fetchProducts()
      .then(() => this.loading = false)
  },
  methods: {
    ...mapActions('products', {
      fetchProducts: 'fetchProducts'
    }),
    ...mapActions('cart', {
      addProductToCart: 'addProductToCart'
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
