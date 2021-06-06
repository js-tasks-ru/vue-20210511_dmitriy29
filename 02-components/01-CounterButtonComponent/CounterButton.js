const CounterButton = {
  // Компонент должен иметь входной параметр
  // Компонент должен иметь модель
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  // Шаблон потребуется отредактировать

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
  },

  methods: {
    increase() {
      this.counter += 1;
      this.$emit('increment', this.counter);
    },
  },

  template: `<button type="button" @click="increase">{{ counter }}</button>`,
};

export default CounterButton;
