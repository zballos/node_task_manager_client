import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('users')
  },

  addUser (params) {
    return Api().post('users', params)
  },

  login (params) {
    return Api().post('users/authenticate', params)
  },

  updateFacebookUser (params) {
    return Api().post('users/save_facebook_user', params)
  }
}
