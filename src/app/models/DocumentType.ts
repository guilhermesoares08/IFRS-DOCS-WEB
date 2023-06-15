export class DocumentType {
    id!: number;
    description!: string;

    constructor(id: number, description: string){
        this.id = id;
        this.description = description;
    }
}
