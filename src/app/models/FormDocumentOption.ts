import { DocumentOption } from "./DocumentOption";
import { Form } from "./Form";

export interface FormDocumentOption {
    formId: number;
    documentOptionId: number;
    form: Form;
    documentOption: DocumentOption;
}
