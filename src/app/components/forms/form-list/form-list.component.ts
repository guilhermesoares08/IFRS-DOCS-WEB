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
import { FormStatus, FormStatusInt } from 'src/app/models/FormStatus.enum';
import { Constants } from 'src/app/util/constants';
import { UpdateFormStatusDto } from 'src/app/models/UpdateFormStatusDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin } from 'src/app/models/UserLogin';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})

export class FormListComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  public listAllFormStatus: { label: string; value: FormStatus }[] = [
    { label: 'Pendente', value: FormStatus.Pendente },
    { label: 'Em Andamento', value: FormStatus.EmAndamento },
    { label: 'Atendida', value: FormStatus.Atendida },
    { label: 'Aguardando Retirada', value: FormStatus.AguardandoRetirada },
    { label: 'Cancelada', value: FormStatus.Cancelada },
  ];
  public statusColors = Constants.statusColors;
  public forms: Form[] = [];
  public Filtrov: number = 2;
  public pagination = {} as Pagination;
  isLoading: boolean = false;
  termoBuscaChanged: Subject<string> = new Subject<string>();
  public loadingText: string = "Carregando";
  modalFormGroup!: FormGroup;
  statusFormSelected: number;
  public optionStatusFormSelected = this.listAllFormStatus[0];
  public modalFormSelected: Form = new Form();

  constructor(private formService: FormService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1
    } as Pagination;
    this.getForms();
    this.listAllFormStatus = this.getFormStatusOptions();
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

    switch (status) {
      case FormStatus.Cancelada:
        cl += ' btn-danger';
        break;
      case FormStatus.Atendida:
        cl += ' btn-success'; 
        break;
      case FormStatus.EmAndamento:
        cl += ' btn-secondary'; 
        break;
      case FormStatus.AguardandoRetirada:
        cl += ' btn-info';
        break;
      case FormStatus.Pendente:
        cl += ' btn-primary';
        break;
    }
    return cl += ' btn-sm';
  }

  mapStatusToFormStatus(status: number): FormStatus {
    switch (status) {
      case 1:
        return FormStatus.Pendente;
      case 2:
        return FormStatus.EmAndamento;
      case 3:
        return FormStatus.Atendida;
      case 4:
        return FormStatus.AguardandoRetirada;
      case 5:
        return FormStatus.Cancelada;
      default:
        throw new Error(`Status inválido: ${status}`);
    }
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

  openModalEditStatus(template: TemplateRef<any>,
    form: Form): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    
    this.modalFormSelected = Object.assign({}, form);
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  salvarAlteracao() {
    this.modalRef?.hide();
    this.updateFormStatus(this.modalFormSelected.id, this.modalFormSelected.status)
  }  

  getFormStatusOptions(): { label: string; value: FormStatus }[] {
    const options: { label: string; value: FormStatus }[] = [];
  
    Object.keys(FormStatus).forEach((key) => {
      const value = parseInt(key, 10);
      if (!isNaN(value)) {
        const label = this.getFormStatusLabel(value);
        options.push({ label, value });
      }
    });
  
    return options;
  }
  
  getFormStatusLabel(status: FormStatus): string {
    switch (status) {
      case FormStatus.Pendente:
        return 'Pendente';
      case FormStatus.EmAndamento:
        return 'Em Andamento';
      case FormStatus.Atendida:
        return 'Atendida';
      case FormStatus.AguardandoRetirada:
        return 'Aguardando Retirada';
      case FormStatus.Cancelada:
        return 'Cancelada';
      default:
        return '';
    }
  }

  getFormById(id: number): void {
    
    this.formService.getFormById(id).subscribe(
      (form: Form) => {
        this.modalFormSelected = form;
      },
      (error) => {
      }
    );
  }

  updateFormStatus(formId: number, status: number){
    
    let obj = Object.assign(new UpdateFormStatusDto(), {
      status: status,
      userId: this.getUserInfo().id,
      formId: formId
    });
    this.isLoading = true;
    this.spinner.show();
    
    this.formService.updateFormStatus(obj).then(
      (responseForm: any) => {
        this.getForms();
        this.spinner.hide();
        this.modalRef?.hide();
        this.toastr.success(`Status atualizado! Id: ${responseForm.id}`);
      }, (error) => {
        this.spinner.hide();
        this.toastr.error(`Erro ao atualizar status: ${error}`);
      }
    );
  }

  getUserInfo(): UserLogin{
    return this.authService.getUserInfo();
  }

  onStatusChange(){
    console.log(this.modalFormSelected);
  }

}
