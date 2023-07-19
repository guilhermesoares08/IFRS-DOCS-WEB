import { Course } from "./Course";
import { FormDocumentOption } from "./FormDocumentOption";
import { DocumentType } from "./DocumentType";
import { FormStatus } from "./FormStatus.enum";
import { User } from "./User";

export class Form {
    id!: number;
    userId!: number;
    email!: string;
    name!: string;
    CPF!: string;
    courseId!: number;
    receiveDocumentType!: string;
    documentType!: DocumentType;
    status!: FormStatus;
    createDate!: Date;
    updateDate!: Date;
    createBy!: string;
    updateBy!: string;
    course!: Course;
    user!: User;
    optionsString!: string;
    note!: string;
    formDocumentOptions: FormDocumentOption[] = [];   
   
  }
