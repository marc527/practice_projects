<template>
    <div>
        <h1>Another Counter</h1>
        <button class="btn btn-primary" @click="asyncIncrement({by: 100, duration: 500})">Increment</button>
        <button class="btn btn-primary" @click="asyncDecrement({by: 50, duration: 2000})">Decrement</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions([
              'increment',
              'decrement',
              'asyncIncrement',
              'asyncDecrement'
            ])
        }
    }
</script>
