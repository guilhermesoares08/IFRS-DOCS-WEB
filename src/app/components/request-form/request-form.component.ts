import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
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

}
