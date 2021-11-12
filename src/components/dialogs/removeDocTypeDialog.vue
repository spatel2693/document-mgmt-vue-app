<template>
  <v-dialog :value="openRemoveDocTypeDialog" max-width="50%">
    <v-card class="pa-9">
      <v-card-text>
        <h3 style="color: purple">Select Documents to Remove</h3>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="mt-2">
        <v-treeview
          v-model="selection"
          color="purple"
          selected-color="purple"
          selectable
          :items="currentDocuments"
          return-object
        >
        </v-treeview>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="mt-2 align-right">
        <v-btn class="mr-2" width="140px" v-on:click="$emit('update:openRemoveDocTypeDialog', false)">
          <span style="margin: 0; color: black; text-transform: capitalize">Cancel</span>
        </v-btn>
        <v-btn width="140px" v-on:click="onDeleteSelected()">
          <span style="margin: 0; color: purple; text-transform: capitalize">Delete Selected</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import DocumentStore from '@/store/modules/documents/documents';
import { RemoveDocumentsState } from '@/components/dialogs/interface';

export default {
  data: () =>
    ({
      selection: [],
    } as RemoveDocumentsState),
  props: {
    currentDocuments: {
      type: Array,
      default: () => [],
    },
    openRemoveDocTypeDialog: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    async onDeleteSelected(): Promise<void> {
      const deleteSuccessful = await DocumentStore.deleteDocuments(this.selection);

      if (deleteSuccessful) {
        await DocumentStore.fetchDocuments();
        this.$emit('documentList');
        this.$emit('update:openRemoveDocTypeDialog', false);
        this.$toast.success('Documents Removed Successfully');
      } else {
        this.$toast.error('Failed To Remove Documents');
      }
    },
  } as any,
};
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  border: 1px solid grey 4px !important;
  /* border-radius: 4px !important; */
}
</style>
