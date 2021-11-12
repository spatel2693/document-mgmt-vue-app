<template>
  <v-container width="100%">
    <v-card width="100%" elevation="0">
      <v-card-title class="mt-n3">
        <v-row>
          <v-col> Documents List </v-col>
          <v-col class="mt-n2" align="right">
            <v-btn :disabled="!clientDocumentsExits" height="3em" class="mt-1" @click="onRemoveDocTypes()">
              <span style="margin: 0; color: purple; text-transform: capitalize">
                <v-icon>mdi-delete</v-icon>
                Delete Documents</span
              >
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider class="mx-n2"></v-divider>
      <v-card-text class="mt-4">
        <draggable :list="item" class="list-group" handle=".handle">
          <div v-for="docType in item" :key="docType.id" style="color: black">
            <table width="100%">
              <tr>
                <td width="30%">
                  <v-icon class="mdi-format-align handle">mdi-drag-vertical</v-icon>
                  <v-treeview
                    color="purple"
                    selected-color="purple"
                    :ref="docType.name"
                    :items="[docType]"
                    return-object
                  >
                  </v-treeview>
                </td>
                <td width="40%" style="padding-top: 12px; vertical-align: top">
                  <div v-if="docType.id" @click="onEditDescription(docType)">
                    <span style="color: purple">Description: </span>
                    <span v-if="docType.description">{{ docType.description }} </span>
                    <span v-else style="color: grey; font-style: italic">Click here to edit </span>
                    <span><v-icon size="14">mdi-pencil</v-icon></span>
                  </div>
                </td>
                <td style="vertical-align: top; text-align: right" width="20%">
                  <v-btn class="mr-3" width="140px" v-on:click="onAddDoc(docType)">
                    <span style="margin: 0; color: purple; text-transform: capitalize">Add Document</span>
                  </v-btn>
                </td>
              </tr>
            </table>
          </div>
        </draggable>
      </v-card-text>
      <v-card-text v-if="clientDocumentsExits" class="mb-n4 note">
        <span style="font-weight: 400; font-size: 12px"
          >Note : Document Types having no Documents will be removed from the Document List</span
        >
      </v-card-text>
      <v-divider v-if="clientDocumentsExits" class="mx-n2"></v-divider>
      <v-card-text>
        <v-card elevation="0" class="mt-3 text-center">
          <v-card-text>
            <v-row>
              <v-col>
                <v-select
                  v-model="selected"
                  :items="documentTypeList"
                  :menu-props="{ bottom: true, offsetY: true }"
                  height="10"
                  item-text="name"
                  solo
                  placeholder="Select Document Type to add to the Document List"
                  flat
                  single-line
                  outlined
                  return-object
                  color="purple"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <removeDocTypeDialog
      v-if="openRemoveDocTypeDialog"
      :openRemoveDocTypeDialog.sync="openRemoveDocTypeDialog"
      :currentDocuments="item"
      @documentList="documentList"
    ></removeDocTypeDialog>
    <addDocumentDialog
      v-if="openNewDocDailog"
      :openNewDocDailog.sync="openNewDocDailog"
      :documentTypeUploading="documentTypeUploading"
      @documentList="documentList"
    ></addDocumentDialog>

    <updateDescription
      v-if="documentType"
      :documentType.sync="documentType"
      :originalDescription="originalDescription"
      @documentList="documentList"
    ></updateDescription>
  </v-container>
</template>

<script lang="ts">
import DocumentStore from '@/store/modules/documents/documents';
import { Document, DocumentTypes } from '@/store/modules/documents/interface';
import { DocumentListState, DocumentGroupMap, DocumentGroup } from '@/components/interface';
import removeDocTypeDialog from '@/components/dialogs/removeDocTypeDialog.vue';
import addDocumentDialog from '@/components/dialogs/addDocumentDialog.vue';
import updateDescription from '@/components/dialogs/updateDescription.vue';
import draggable from 'vuedraggable';

export default {
  data: () =>
    ({
      item: [],
      documentbyGroup: [],
      documentType: null,
      originalDescription: null,
      openNewDocDailog: false,
      documentTypeUploading: null,
      file: '',
      selected: null,
      openRemoveDocTypeDialog: false,
    } as DocumentListState),

  components: {
    draggable,
    removeDocTypeDialog,
    addDocumentDialog,
    updateDescription,
  },
  computed: {
    documentTypeList() {
      const docsAlreadyinList = Object.keys(this.documentbyGroup);
      const otherDocsAvailable = DocumentStore.getDocumentTypes.filter((docType: DocumentGroup) => {
        if (!docsAlreadyinList.includes(docType.name)) {
          return docType;
        }
      });
      return otherDocsAvailable;
    },
    clientDocumentsExits(): boolean {
      return this.item.length;
    },
  } as any,
  watch: {
    async selected(): Promise<void> {
      if (this.selected) {
        await this.addNewDocType();
      }
      return;
    },
  } as any,

  methods: {
    documentList(): DocumentGroup[] {
      // We are creating a tree view model using this function by grouping the documents by document Types..
      const documents = DocumentStore.getDocuments;

      this.item = [];
      this.documentbyGroup = [];
      const items: DocumentGroup[] = [];

      const updatedGrouplist: DocumentGroupMap = this.documentbyGroup;

      documents.forEach((doc: Document) => {
        if (!doc.documentType) doc.documentType = 'others';
        if (this.documentbyGroup[`${doc.documentType}`] && this.documentbyGroup[`${doc.documentType}`].length) {
          updatedGrouplist[`${doc.documentType}`] = [...updatedGrouplist[`${doc.documentType}`], doc];
          this.documentbyGroup = { ...this.documentbyGroup, ...updatedGrouplist };
        } else {
          updatedGrouplist[`${doc.documentType}`] = [];
          updatedGrouplist[`${doc.documentType}`].push(doc);
          this.documentbyGroup = { ...this.documentbyGroup, ...updatedGrouplist };
        }
      });

      const docTypesInClientList = Object.keys(this.documentbyGroup);
      docTypesInClientList.forEach((docTypeName) => {
        if (docTypeName !== 'others') {
          const docTypeDetails = DocumentStore.getDocumentTypes.find(
            (docType: DocumentTypes) => docType.name === docTypeName,
          );
          const documentGoup = {
            ...docTypeDetails,
          } as DocumentGroup;
          documentGoup.children = this.documentbyGroup[`${docTypeName}`] || [];
          items.push(documentGoup as DocumentGroup);
        }
      });
      if (this.documentbyGroup['others']?.length) {
        // Documents with no document type as grouped as "others"
        const otherDocGroup: DocumentGroup = {
          id: 0,
          name: 'others',
          children: this.documentbyGroup['others'],
        };
        items.push(otherDocGroup);
      }

      this.item = items as DocumentGroup[];
      return this.item;
    },
    onEditDescription(docType: DocumentGroup): void {
      this.documentType = docType;
    },

    onDialogClose(): void {
      this.documentType = null;
      this.openNewDocDailog = false;
    },
    onAddDoc(docType: DocumentType): void {
      this.documentTypeUploading = docType;
      this.openNewDocDailog = true;
    },
    selectFile() {
      console.log(this.$refs);
      this.file = this.$refs[`upload`].files[0];
    },

    addNewDocType() {
      const documentGroup: DocumentGroup = {
        ...this.selected,
        ...{ children: [] },
      };
      this.item.push(documentGroup);
      this.$toast.success(`${documentGroup.name} added to the list`);
    },
    onRemoveDocTypes() {
      this.openRemoveDocTypeDialog = true;
    },
  } as any,

  async mounted(): Promise<void> {
    await DocumentStore.fetchDocuments();
    this.documentList();
  },
} as any;
</script>

<style>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: #cbc3e3;
  color: dimgray;
  padding: 10px 10px;
  min-height: 100px; /* minimum height */
  position: relative;
  cursor: pointer;
  text-align: center;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: white;
  cursor: pointer; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  text-align: center;
  padding: 50px 0;
}
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  align-content: center;
  text-align: center;
  align-items: center;
  padding: -12px !important;
}

.note {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
