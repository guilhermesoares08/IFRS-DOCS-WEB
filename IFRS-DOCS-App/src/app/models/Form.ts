import { Course } from "./Course";
import { FormDocumentOption } from "./FormDocumentOption";
import { User } from "./User";

export interface Form {
    id: number;
    userId: number;
    email: string;
    name: string;
    CPF: string;
    courseId: number;
    receiveDocumentType: string;
    documentType: DocumentType;
    status: string;
    createDate: Date;
    updateDate: Date;
    createBy: string;
    updateBy: string;
    course: Course;
    user: User;
    formDocumentOptions: FormDocumentOption[];
}
