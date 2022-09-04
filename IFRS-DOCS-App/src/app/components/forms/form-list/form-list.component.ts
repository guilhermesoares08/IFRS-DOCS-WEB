import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/Form';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})

export class FormListComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;

  public forms: Form[] = [];
  public filteredForms: Form[] = [];
  private _filterList: string = '';
  public Filtrov: number = 2;

  constructor(private formService: FormService,
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getForms();
  }
  
  public getForms(): void{
    this.formService.getFormByUser(1).subscribe({
      next:(response: Form[]) => {
        this.forms = response;
        this.filteredForms = this.forms;
      },
      error: (error: any) =>{
        this.spinner.hide();
        this.toastrService.error('Erro ao carregar os formulários', 'Erro');
      },
      complete: () => this.spinner.hide() 
    });
  }

  public getStatusColor(status: any){
    let cl ='btn';
    
    switch(status.toUpperCase()){
      case 'CANCELADA':
        cl += ' btn-danger';
        break;
      case 'ATENDIDA':        
        cl += ' btn-success';
        break;
      case 'EM ANDAMENTO':
         cl += ' btn-secondary';
         break;
      case 'AGUARDANDO RETIRADA':
         cl += ' btn-info';
         break;
      case 'PENDENTE':
        cl += ' btn-primary';
        break;
    }
    return cl += ' btn-sm';
  }

  public get filterList() {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.filteredForms = this.filterList ? this.filterForms(this.filterList) : this.forms;
  }

  public filterForms(filterBy: string): Form[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.forms.filter(
      (dtoResponse: any) => dtoResponse.name.toLocaleLowerCase().indexOf(filterBy) !== -1 
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.modalRef?.hide();
    this.toastrService.success("mensagem corpo", "cabeçalho");
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
