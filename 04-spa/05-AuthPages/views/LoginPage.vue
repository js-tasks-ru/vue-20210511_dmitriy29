<template>
  <form class="form" @submit.prevent="loginForm">
    <form-group label="Email">
      <div class="input-group">
        <input v-model="form.email" type="email" placeholder="demo@email" class="form-control" />
      </div>
    </form-group>
    <form-group label="Пароль">
      <div class="input-group">
        <input v-model="form.password" type="password" placeholder="password" class="form-control" />
      </div>
    </form-group>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import FormGroup from '../../../03-sfc/02-FormGroup/components/FormGroup';
import { login } from '../data';

export default {
  name: 'LoginPage',

  components: { FormGroup },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    loginForm() {
      if (!this.form.email) {
        return alert('Требуется ввести Email');
      }
      if (!this.form.password) {
        return alert('Требуется ввести пароль');
      }
      login(this.form.email, this.form.password).then((result) => {
        if (result.fullname) {
          alert(result.fullname);
          const to = this.$route.query.from ?? '/';
          this.$router.push(to);
        } else {
          alert(result.message);
        }
      });
    },
  },
};
</script>

<style></style>
