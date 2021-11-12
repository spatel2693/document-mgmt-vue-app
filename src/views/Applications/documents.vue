<template>
  <v-container class="mt-10 flex-container" style="border: 1px solid grey; border-radius: 4px">
    <v-row class="pt-3">
      <documents-list />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import DocumentsList from '@/components/documentsList.vue';
export default {
  components: {
    DocumentsList,
  },
};
</script>

<style>
.flex-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
}
</style>
