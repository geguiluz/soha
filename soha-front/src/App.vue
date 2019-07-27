<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>SoHa</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>
