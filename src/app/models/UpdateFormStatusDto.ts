export class UpdateFormStatusDto {
    status: number;
    formId: number;
    userId: number;
    files: File[] = [];
}
