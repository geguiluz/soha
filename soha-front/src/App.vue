<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>SoHa</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn @click="logOut">
        Logout
      </v-btn>
    </v-app-bar>


    <v-content>
      <v-navigation-drawer
      absolute
      mini-variant
      permanent
      >
        <template v-slot:prepend>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="../public/images/profile-pictures/Profile-geguiluz.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <!-- <v-list-item
              link
              two-line
            >
              <v-list-item-content>
                <v-list-item-title class="title">User name</v-list-item-title>
                <v-list-item-subtitle>user_email@gmail.com</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item> -->
          </v-list>
        </template>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link to="/dashboard">
              <v-icon>mdi-view-dashboard</v-icon>
            <v-list-item-title>Mi Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item link>
              <v-icon>mdi-calendar-question</v-icon>
            <v-list-item-title>Planear mi semana</v-list-item-title>
          </v-list-item>
          <v-list-item link>
              <v-icon>mdi-bullseye-arrow</v-icon>
            <v-list-item-title>Mis Metas</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container class="router-view-container">
        <v-layout align-space-around justify-center fill-height row>
          <v-flex>
            <router-view></router-view>

          </v-flex>
          
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data: () => ({
    //
  }),
  methods: {
        logOut(){
          console.log('Logging out');
            fetch("http://localhost:3000/logout",{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            })
                .then(data => {                
                    console.log('Fetch passed. Response from API. Status:', data.status)
                    if(data.status === 200) {
                        // Redirect user to Dashboard if login is successful.
                        this.$router.push({ name: 'Login', query: { redirect: '/login' } });
                    }
                })
                .catch(error => {
                    if (!error.response) {
                    // network error
                    this.errorStatus = 'Error: Network Error';
                    } else {
                        this.errorStatus = error.response.data.message;
                    }
                })
        }
    }
};
</script>

<style scoped>
  .router-view-container {
    margin-left: 6.2vw;
  }
</style>
