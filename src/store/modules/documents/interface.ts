export interface Document {
  id: number;
  name: string;
  description?: string;
  documentType: string | null;
}
export interface DocumentTypes {
  id: number;
  name: string;
  description?: string;
}
