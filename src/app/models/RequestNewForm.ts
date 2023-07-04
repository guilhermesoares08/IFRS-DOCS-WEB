import { FormDocumentOption } from "./FormDocumentOption";

export class RequestNewForm {
    id!: number;
    userId!: number;
    courseId!: number;
    receiveDocumentType!: string;
    documentType!: DocumentType;
    status!: string;
    optionsString!: string;
    note!: string;
    formDocumentOptions!: FormDocumentOption[];
}
