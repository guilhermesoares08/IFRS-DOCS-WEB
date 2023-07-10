import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/Form';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/models/Pagination';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})

export class FormListComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;

  public forms: Form[] = [];
  public Filtrov: number = 2;
  public pagination = {} as Pagination;
  isLoading: boolean = false;
  termoBuscaChanged: Subject<string> = new Subject<string>();
  public loadingText: string = "Carregando";
  modalForm!: FormGroup;

  constructor(private formService: FormService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1
    } as Pagination;
    this.getForms();
  }

  public getForms(): void {    
    this.isLoading = true;

    this.formService
      .getForms(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (paginatedResult: PaginatedResult<Form[]>) => {
          this.forms = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
          this.isLoading = false;
        },
        (error: any) => {
          this.toastr.error('Erro ao Carregar os Forms', error.message);
          this.isLoading = false;
        }
      )
      .add(() => this.spinner.hide());
  }

  public getStatusColor(status: any) {
    let cl = 'btn';

    switch (status.toUpperCase()) {
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

  public filterForms(evt: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(1000))
        .subscribe((filtrarPor) => {          
          this.formService
            .getForms(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            )
            .subscribe(
              (paginatedResult: PaginatedResult<Form[]>) => {
                this.forms = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
              },
              (error: any) => {
                this.spinner.hide();
                this.toastr.error('Erro ao Carregar os Formulários', 'Erro!');
              }
            )
            .add(() => this.spinner.hide());
        });
    }
    this.termoBuscaChanged.next(evt.value);
  }

  formDetail(formId: number): void {
    this.router.navigate([`forms/detail/${formId}`])
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getForms();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  salvarAlteracao() {
    this.modalRef?.hide();
    this.toastr.success("mensagem corpo", "cabeçalho");
  }

}
