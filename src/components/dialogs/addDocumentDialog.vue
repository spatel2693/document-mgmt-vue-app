<template>
  <v-dialog
    :value="openNewDocDailog"
    @click:outside="$emit('update:openNewDocDailog', false)"
    max-width="50%"
    persistent
  >
    <v-card class="pa-9 card-container">
      <v-card-text>
        <h3>
          {{ uploadDocTitle }}
        </h3>
      </v-card-text>
      <div class="dropbox">
        <form @submit.prevent="sendFile" enctype="multipart/form-data">
          <div>
            <input
              type="file"
              :ref="'upload'"
              @change="selectFile(documentTypeUploading.id)"
              class="file-input input-file"
            />
            <span>
              Drag and drop here to upload Document<br />
              or click to browse
            </span>
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
            </span>
          </div>
        </form>
      </div>
      <v-card-text class="pt-3">
        <span v-if="file">
          <h4>You choose {{ file.name }} to upload</h4>
        </span>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="loading" class="mr-2" width="140px" v-on:click="$emit('update:openNewDocDailog', false)">
          <span style="margin: 0; color: black; text-transform: capitalize">Cancel</span>
        </v-btn>
        <v-btn :loading="loading" width="140px" v-on:click="uploadDocument()">
          <span style="margin: 0; color: purple; text-transform: capitalize">Upload</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import DocumentStore from '@/store/modules/documents/documents';
import { AddDocumentState } from '@/components/dialogs/interface';

export default {
  data: () =>
    ({
      loading: false,
      file: '',
    } as AddDocumentState),

  props: {
    documentTypeUploading: {
      type: Object,
      default: () => null,
    },
    openNewDocDailog: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    uploadDocTitle() {
      const title = 'Upload Document';
      return this.documentTypeUploading && this.documentTypeUploading.name
        ? `${title} in ${this.documentTypeUploading.name}`
        : title;
    },
  } as any,
  methods: {
    selectFile() {
      console.log(this.$refs);
      this.file = this.$refs[`upload`].files[0];
    },

    async uploadDocument(): Promise<void> {
      try {
        this.loading = true;
        const name: string = this.file.name;

        const typeId = this.documentTypeUploading.id ? this.documentTypeUploading.id : null;
        console.log(typeof typeId);
        const uploadSuccessful = await DocumentStore.createDocument({ name, typeId });

        if (uploadSuccessful) {
          await DocumentStore.fetchDocuments();
          this.$emit('documentList');
          this.$emit('update:openNewDocDailog', false);
          this.$toast.success('Document Uploaded Successfully');
        } else {
          this.$toast.error('Failed To Upload Document');
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  } as any,
};
</script>

<style lang="" scoped></style>
