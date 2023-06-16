import { FormDocumentOption } from "./FormDocumentOption";
import { DocumentType } from "./DocumentType";

export class DocumentOption {

    constructor(
        id: number,
        documentType: DocumentType,
        fieldType: string,
        description: string,        
    ) {
        this.id = id;
        this.documentType = documentType;
        this.fieldType = fieldType;
        this.description = description;
    }
    
    id!: number;
    documentType!: DocumentType;
    fieldType!: string;
    description!: string;
    formDocumentOptions!: FormDocumentOption[];
}
