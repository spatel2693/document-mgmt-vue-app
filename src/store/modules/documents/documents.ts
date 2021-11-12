import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators';

import store from '@/store';
import api from '@/plugins/axios';
import { Document, DocumentTypes } from './interface';

@Module({
  dynamic: true,
  name: 'site',
  namespaced: true,
  store,
})
class DocumentStore extends VuexModule {
  public documents: Document[] = [];
  public documentTypes: DocumentTypes[] = [];

  public get getDocuments(): Document[] {
    return this.documents;
  }
  public get getDocumentTypes(): DocumentTypes[] {
    return this.documentTypes;
  }

  @Mutation
  public setDocuments(documents: Document[]): Document[] {
    this.documents = documents;
    return this.documents;
  }
  @Mutation
  public setDocumentTypes(docTypes: DocumentTypes[]): DocumentTypes[] {
    this.documentTypes = docTypes;
    return this.documentTypes;
  }

  @Action
  async fetchDocuments(): Promise<Document[] | null> {
    const {
      data: { documents, documentTypes },
    }: { data: any; documents: Document[]; documentTypes: DocumentTypes } = await api.get('/documents/');
    this.setDocumentTypes(documentTypes);
    return this.setDocuments(documents);
  }

  @Action
  async updateDocumentType(updatedDocumentType: DocumentTypes): Promise<boolean> {
    try {
      const {
        data: { success },
      }: { data: any; success: boolean } = await api.put(`documenttype/${updatedDocumentType.id}`, updatedDocumentType);
      return success;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  @Action({ rawError: true })
  async createDocument({ name, typeId }: { name: string; typeId: number | null }): Promise<boolean> {
    try {
      const {
        data: { success },
      }: { data: any; success: boolean } = await api.post(`document/`, {
        name: name,
        type: typeId,
      });
      return success;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  @Action({ rawError: true })
  async deleteDocuments(documents: Document[]): Promise<boolean> {
    try {
      const {
        data: { success },
      }: { data: any; success: boolean } = await api.delete(`client/documents/`, { data: { documents: documents } });
      return success;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default getModule(DocumentStore);
