import { FormDocumentOption } from "./FormDocumentOption";

export interface DocumentOption {
    id: number;
    documentType: DocumentType;
    fieldType: string;
    description: string;
    createDate: Date;
    updateDate: Date;
    formDocumentOptions: FormDocumentOption[];
}
