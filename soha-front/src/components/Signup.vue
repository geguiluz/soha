<template>
  <v-container
    fluid
    fill-height
    >
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar dark flat>
                <v-toolbar-title>Signup</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
            <v-form>
                <v-text-field
                label="Nombre"
                name="name"
                type="text"
                prepend-icon="person"                
                autofocus
                v-model="name"
                ></v-text-field>

                <v-text-field
                label="E-mail"
                name="email"
                type="text"
                prepend-icon="email"
                v-model="email"
                ></v-text-field>
                <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                prepend-icon="lock"
                v-model="password"
                @keyup.enter="signupUser"
                ></v-text-field>
            </v-form>
            </v-card-text>
            <v-card-actions>            
            Already a user? 
            <v-btn to="/login" color="primary" text >Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signupUser">Signup</v-btn>
            </v-card-actions>
        </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "signup",
    data() {
        return {
                name: "",
                email: "",
                password: ""
        };
    },
    mounted () {

    },
    methods: {
        signupUser(){
          console.log('Signing up user', this.name, this.email, this.password);
    
          const url = `${process.env.VUE_APP_URL}/signup`

            fetch(url,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({name: this.name, email: this.email, password: this.password})
            })
                .then(data => {
                    this.name = '';
                    this.password = '';
                    this.email = '';
                    alert('Usuario registrado correctamente', data.text)
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

