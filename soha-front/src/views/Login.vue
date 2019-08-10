<template>
  <v-container
    fluid
    fill-height
    >
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
            <v-form>

                <v-text-field
                autofocus
                label="E-mail"
                name="email"
                type="text"
                v-model="email"
                ></v-text-field>
                <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                v-model="password"
                @keyup.enter="loginUser"
                ></v-text-field>
            </v-form>
            </v-card-text>
            <v-card-actions>            
            Not a user? 
            <v-btn to="/signup" color="primary" text >Signup</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="loginUser">Login</v-btn>
            </v-card-actions>
        </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
                email: "",
                password: ""
        };
    },
    mounted () {

    },
    methods: {
        loginUser(){
          console.log('Logging in user', this.email, this.password);
          const url = `${process.env.VUE_APP_URL}/login`

            fetch(url,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ email: this.email, password: this.password })
            })
                .then(data => {
                    this.password = '';
                    this.email = '';
                    console.log('Fetch passed. Response from API. Status:', data.status)
                    if(data.status === 200) {
                        // Redirect user to Dashboard if login is successful.
                        this.$router.push({ name: 'Dashboard', query: { redirect: '/dashboard' } });
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
}
</script>

