<template>
  <div :class="['toast', item.class]">
    <app-icon :icon="item.icon" />
    <span> {{ item.message }}</span>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'ToastItem',

  components: { AppIcon },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
