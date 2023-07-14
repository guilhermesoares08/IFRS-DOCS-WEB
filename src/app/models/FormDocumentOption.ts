import { DocumentOption } from "./DocumentOption";
import { Form } from "./Form";

export class FormDocumentOption {
    formId!: number;
    documentOptionId!: number;
    form!: Form;
    documentOption!: DocumentOption;
    documentOptionDescription: string;
}
