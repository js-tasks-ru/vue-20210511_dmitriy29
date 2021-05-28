<template>
  <div v-if="showToast" :class="['toast', item.class]">
    <app-icon :icon="item.icon" />
    <span> {{ item.message }}</span>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'ToastItem',

  components: { AppIcon },

  props: {
    itemId: {
      type: Number,
      required: true,
    },

    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showToast: false,
    };
  },

  watch: {
    item: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.showToast = true;
          this.hideToast();
        }
      },
    },
  },

  methods: {
    hideToast() {
      setTimeout(() => {
        this.showToast = false;
        this.$emit('delete', this.id);
      }, DELAY);
    },
  },
};
</script>

<style></style>
