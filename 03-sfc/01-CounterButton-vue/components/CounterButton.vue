<template>
  <div>
    <button type="button" @click="increase">{{ count }}</button>
  </div>
</template>

<script>
export default {
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

  methods: {
    increase() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>

<style></style>
