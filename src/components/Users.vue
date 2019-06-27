<template>
  <div class="users">
    <h1>Usuários</h1>
    <div v-if="users.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewUser' }" class="">Add User</router-link>
      </div>

      <table>
        <tr>
          <th>Nome</th>
          <th width="550">E-mail</th>
          <th width="100" align="center">Action</th>
        </tr>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditUser', params: { id: user._id } }">Edit</router-link> |
            <a href="#">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no users.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewUser' }" class="add_user_link">Add User</router-link>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'users',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const response = await UserService.fetchUsers()
      this.users = response.data
    }
  }
}
</script>
