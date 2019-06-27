<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="email" v-model="input.email" placeholder="E-mail" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
    <!-- <fb:login-button
      language="pt_BR"
      scope="public_profile,email"
      onlogin="checkLoginState();">
    </fb:login-button> -->
    <div id="fb-root"></div>
    <div class="fb-login-button" data-width="" data-size="medium"
        data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false"
        v-on:click="checkLoginState()"></div>
  </div>
</template>

<script>
/* eslint-disable */
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
    },
    async checkLoginState () {
      /*FB.getLoginStatus( function (response) {
        console.log(response)
        token = response.access_token
        user_id = response.id
        console.log(token)
        console.log(user_id)
        statusChangeCallback(response);
      });*/
      var response = FB.api('/me', {'fields': 'id,name,email,picture'});

      console.log(JSON.stringify(response));

        var data = {
          email: response.email,
          name: response.name,
          user_facebook_id: response.id,
          picture: response.picture.data.url
        }
        console.log(data)

        updateUser(data);
    },
    async updateUser (data) {

      console.log(data)
      await UserService
          .updateFacebookUser(data)
          .then(function (response) {
            if (response.status === 200) {
              alert('Autenticado via Facebook!')
              router.push({ path: '/users' })
            }
            console.log(response)
          })
          .catch(function (error) {
            alert(error.response.data.message)
          });
    }
  }
}

/*window.fbAsyncInit = function() {
  FB.init({
    appId      : '<appID>',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.3'
  })
  FB.AppEvents.logPageView()
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))*/

</script>


<style scoped>
#login {
  width: 500px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
