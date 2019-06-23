<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="email" v-model="input.email" placeholder="E-mail" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import router from '@/router'

export default {
  name: 'Login',
  data () {
    return {
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      if (this.input.email !== '' && this.input.password !== '') {
        await UserService
          .login(this.input)
          .then(function (response) {
            if (response.status === 200) {
              alert('Autenticado!')
              router.push({ path: '/users' })
            }
          })
          .catch(function (error) {
            alert(error.response.data.message)
          })
      } else {
        alert('Informe o e-mail e senha para logar!')
      }
    }
  }
}
</script>

<style scoped>
#logins {
  width: 500px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
