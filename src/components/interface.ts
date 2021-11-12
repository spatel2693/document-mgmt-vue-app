import { Document, DocumentTypes } from '@/store/modules/documents/interface';
export interface DocumentGroup {
  id: number;
  name: string;
  description?: string;
  children?: Document[];
}
export interface DocumentListState {
  item: DocumentGroup[] | [];
  documentbyGroup: [];
  documentType: null | DocumentTypes;
  originalDescription: null | string;
  openNewDocDailog: boolean;
  selectedDocs: [];
  file: any;
  documentTypeUploading: null | DocumentTypes;
  selected: null | DocumentTypes;
  openRemoveDocTypeDialog: boolean;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export interface DocumentGroupMap {
  [documentTypeLabel: string]: Document[];
}
