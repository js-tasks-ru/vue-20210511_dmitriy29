<template>
  <button @click="$emit('increment', ++localCount)">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: 0,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newVal) {
        this.localCount = newVal;
      },
    },
  },
};
</script>
