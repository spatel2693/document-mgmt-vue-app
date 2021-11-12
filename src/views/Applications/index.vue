<template>
  <v-container class="px-3" style="max-width: unset">
    <v-row class="pt-12" justify="center" width="100%">
      <v-tabs centered grow color="purple">
        <v-tabs-slider></v-tabs-slider>
        <v-tab to="application">
          <h4 class="tab">Application</h4>
        </v-tab>
        <v-tab to="documents">
          <h4 class="tab">Documents</h4>
        </v-tab>
        <v-tab to="filogix">
          <h4 class="tab">Filogix</h4>
        </v-tab>
        <v-tab to="directToLender">
          <h4 class="tab">Direct To Lender</h4>
        </v-tab>
      </v-tabs>
    </v-row>
    <router-view></router-view>
  </v-container>
</template>
