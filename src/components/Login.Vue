<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="email" v-model="input.email" placeholder="E-mail" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
    <fb:login-button
      scope="public_profile,email"
      v-on:click="checkLoginState();">
    </fb:login-button>
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

function checkLoginState(){
  FB.getLoginStatus(function(response) {
    console.log(response)
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '415097349334292',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.3'
  });

  FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



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
