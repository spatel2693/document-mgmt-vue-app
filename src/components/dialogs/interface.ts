import { Document, DocumentTypes } from '@/store/modules/documents/interface';

export interface AddDocumentState {
  loading: boolean;
  file: any;
}

export interface RemoveDocumentsState {
  selection: Document[] | [];
}

export interface UpdateDescriptionState {
  loading: boolean;
  newDescription: null | string;
}
