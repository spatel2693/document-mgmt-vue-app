<template>
  <v-dialog
    :value="documentType !== null"
    @click:outside="$emit('update:documentType', null)"
    max-width="50%"
    persistent
  >
    <v-card class="pa-9 card-container">
      <v-card-text class="mb-3"> <h3>Change Document Type Description</h3> </v-card-text>
      <v-card-text v-if="loading">
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </v-card-text>
      <v-card-text v-else>
        <v-text-field v-model="updatedDescriptionValue" outlined clearable label="Description"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="loading" width="140px" v-on:click="$emit('update:documentType', null)">
          <span style="margin: 0; color: black; text-transform: capitalize">Cancel</span>
        </v-btn>
        <v-btn :loading="loading" width="140px" v-on:click="updatedDescription">
          <span style="margin: 0; color: purple; text-transform: capitalize">Update</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import DocumentStore from '@/store/modules/documents/documents';

import { UpdateDescriptionState } from '@/components/dialogs/interface';

export default {
  data: () =>
    ({
      loading: false,
      newDescription: null,
    } as UpdateDescriptionState),

  props: {
    originalDescription: {
      type: String,
      default: () => null,
    },
    documentType: {
      type: Object,
      default: () => null,
    },
  },

  computed: {
    updatedDescriptionValue: {
      get(): string {
        if (!this.newDescription) return this.documentType.description;
        return this.newDescription;
      },
      set(description: string) {
        this.newDescription = description;
      },
    } as any,
  } as any,
  methods: {
    async updatedDescription(): Promise<void> {
      this.loading = true;
      const updatedDescription = this.documentType;
      delete updatedDescription.children;
      updatedDescription.description = this.newDescription;
      try {
        const updateSuccessful = await DocumentStore.updateDocumentType(updatedDescription);
        if (updateSuccessful) {
          await DocumentStore.fetchDocuments();
          this.$emit('documentList');
          this.$emit('update:documentType', null);
          this.$toast.success('Document Description Updated');
        } else {
          this.$toast.error('Failed To Update Document Type Description');
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$toast.error('Failed To Update Document Type Description');
      }
    },
  } as any,
};
</script>

<style lang="" scoped></style>
