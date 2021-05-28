<template>
  <div v-if="toasts.length" class="toasts">
    <toast-item v-for="(toast, idx) in toasts"
    :key="idx"
    :itemId="idx"
    :item="toast"
    @delete="delToast($event)"></toast-item>
  </div>
</template>

<script>
import ToastItem from './ToastItem';

// const DELAY = 5000;

export default {
  name: 'TheToaster',

  components: { ToastItem },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    error(message) {
      this.toasts.push({
        icon: 'alert-circle',
        class: 'toast_error',
        message,
      });
    },

    success(message) {
      this.toasts.push({
        icon: 'check-circle',
        class: 'toast_success',
        message,
      });
    },

    delToast(id) {
      if (this.toasts.find((toast) => toast.id === id)) {
        this.toasts.splice(id, 1);
      }
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
