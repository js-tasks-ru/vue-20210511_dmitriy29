<template>
  <form class="form" @submit.prevent="submitForm">
    <form-group v-for="(field, idx) in formFields" :key="idx" :label="field.label">
      <div class="input-group">
        <input v-model="form[field.name]" :type="field.type" class="form-control" />
      </div>
    </form-group>
    <div class="form-group">
      <label class="checkbox">
        <input v-model="form.agreement" type="checkbox" /> Я согласен с условиями <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="/login">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import FormGroup from '../../../03-sfc/02-FormGroup/components/FormGroup';
import { register } from '../data';

export default {
  name: 'RegisterPage',

  components: { FormGroup },

  data() {
    return {
      formFields: [
        { id: 1, label: 'Email', type: 'email', name: 'email' },
        { id: 2, label: 'Имя', type: 'text', name: 'fullname' },
        { id: 3, label: 'Пароль', type: 'password', name: 'password' },
        { id: 4, label: 'Повтор пароля', type: 'password', name: 'passwordRepeat' },
      ],

      form: {
        email: '',
        fullname: '',
        password: '',
        passwordRepeat: '',
        agreement: false,
      },
    };
  },

  methods: {
    submitForm() {
      if (!this.form.email) {
        return alert('Требуется ввести Email');
      }
      if (!this.form.fullname) {
        return alert('Требуется ввести полное имя');
      }
      if (!this.form.password) {
        return alert('Требуется ввести пароль');
      } else if (this.form.password !== this.form.passwordRepeat) {
        return alert('Пароли не совпадают');
      }
      if (!this.form.agreement) {
        return alert('Требуется согласиться с условиями');
      }
      register(this.form.email, this.form.fullname, this.form.password).then((result) => {
        if (result.id) {
          alert(result.id);
          this.$router.push('/login');
        } else {
          alert(result.message);
        }
      });
    },
  },
};
</script>

<style></style>
