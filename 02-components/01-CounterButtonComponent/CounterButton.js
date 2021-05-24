const CounterButton = {
  // Компонент должен иметь входной параметр
  // Компонент должен иметь модель
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  // Шаблон потребуется отредактировать

  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      counter: 0,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.counter = newValue;
      },
    },

    value: {
      immediate: true,
      handler(newValue) {
        this.counter = newValue;
      },
    },
  },

  methods: {
    increase() {
      this.counter += 1;
      this.$emit('increment', this.counter);
      this.$emit('input', this.counter);
    },
  },

  created() {
    this.counter = this.count || this.value;
  },

  template: `<button type="button" @click="increase">{{ counter }}</button>`,
};

export default CounterButton;
