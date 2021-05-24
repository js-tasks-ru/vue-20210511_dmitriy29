const CounterButton = {
  // Компонент должен иметь входной параметр
  // Компонент должен иметь модель
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  // Шаблон потребуется отредактировать

  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      counter: this.inputCount || this.inputValue,
      // counter: 0,
    }
  },

  computed: {
    inputCount() {
      return this.count;
    },
    inputValue() {
      return this.value;
    }
  },

  methods: {
    increase() {
      this.counter += 1;
      this.$emit('increment', this.counter);
      this.$emit('input', this.counter);
    }
  },

  created() {
    this.counter = this.inputCount || this.inputValue;
  },
  
  template: `<button type="button" @click="increase">{{ counter }}</button>`,
};

export default CounterButton;
