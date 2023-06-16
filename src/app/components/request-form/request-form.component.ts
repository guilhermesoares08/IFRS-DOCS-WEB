import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/Course';
import { ReceiveDocumentType } from 'src/app/models/ReceiveDocumentType';
import { FormService } from 'src/app/services/form.service';
import { DocumentType } from 'src/app/models/DocumentType';
import { DocumentOption } from 'src/app/models/DocumentOption';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  
  public title = "Requisitar Documentos";
  email = "";
  nomeCompleto: string = "";
  cpf: string = "";
  curso: string = "";
  formatoDocumento: string = "";
  tipoDocumento: string = "";
  documentos: string = "";
  justificativa: string = "";
  courses!: Course[];
  receiveDocumentTypes!: ReceiveDocumentType[];
  documentTypes!: DocumentType[];
  documentOptions!: DocumentOption[];

  form!: FormGroup;  
  constructor(private formService: FormService) { }

  ngOnInit(): void {
    
    this.validation();
    this.getAllDocumentTypes();
    this.getAllReceiveDocumentTypes();
    this.getAllCourses();
    this.getAllDocumentOptions();
  }

  submitForm() {
    // Lógica para enviar o formulário
    console.log('Formulário enviado!');
    console.log('Email:', this.email);
    console.log('Nome Completo:', this.nomeCompleto);
    console.log('CPF:', this.cpf);
    console.log('Curso:', this.curso);
    console.log('Formato de Documento:', this.formatoDocumento);
    console.log('Tipo de Documento:', this.tipoDocumento);
    console.log('Documentos:', this.documentos);
    console.log('Justificativa:', this.justificativa);
  }

  public validation (): void{
    this.form = new FormGroup({
      courseId: new FormControl(),
      receiveDocumentTypeId: new FormControl(),
      documentTypeId: new FormControl()
    });    
  }

  public getAllCourses(){
    this.formService.getAllCourses().subscribe(
      (_courses: Course[]) => {
        this.courses = _courses;
      }
    );
  }

  public getAllReceiveDocumentTypes(){
    this.receiveDocumentTypes = [ 
      new ReceiveDocumentType(0, 'Documento(s) online por e-mail'),
      new ReceiveDocumentType(1, 'Documento(s) impresso retirado no Setor de Ensino')];
  }

  public getAllDocumentTypes(){
    this.documentTypes = [ 
      new DocumentType(0, 'Histórico e/ou Ementas'),
      new DocumentType(1, 'Atestados e/ou Comprovantes')];
  }

  public getAllDocumentOptions(){
    this.documentOptions = [ 
      new DocumentOption(1, new DocumentType(1, 'Historico'), 'CHECKBOX', 'Historico Parcial'),
      new DocumentOption(1, new DocumentType(1, 'Historico'), 'CHECKBOX', 'Ementas das Disciplinas cursadas')
    ];
  }
}
