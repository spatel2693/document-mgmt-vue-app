<template>
  <v-app id="inspire">
    <v-app-bar max-height="5em">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" absolute>
      <div id="app">
        <v-app id="inspire">
          <v-card elevation="0" height="100%" width="auto" class="">
            <v-navigation-drawer v-model="drawer">
              <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                  <v-list-item to="/">
                    <v-list-item-title>Dashboard</v-list-item-title>
                  </v-list-item>

                  <v-list-item to="/applications">
                    <v-list-item-title>Application</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-app>
      </div>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    drawer: null,
  }),
});
</script>
