import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/Form';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/models/Pagination';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormStatus, FormStatusInt } from 'src/app/models/FormStatus.enum';
import { Constants } from 'src/app/util/constants';
import { UpdateFormStatusDto } from 'src/app/models/UpdateFormStatusDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin } from 'src/app/models/UserLogin';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {
  formId: number;
  currentForm: Form = new Form();
  formGroupAttachments: FormGroup;
  selectedImages: { [key: string]: File } = {};
  formData: FormData = new FormData();
  formToSave = new UpdateFormStatusDto();

  public title = "Detalhe";
  public isReadOnly = true;
  public listAllFormStatus: { label: string; value: FormStatus }[] = [
    { label: 'Pendente', value: FormStatus.Pendente },
    { label: 'Em Andamento', value: FormStatus.EmAndamento },
    { label: 'Atendida', value: FormStatus.Atendida },
    { label: 'Aguardando Retirada', value: FormStatus.AguardandoRetirada },
    { label: 'Cancelada', value: FormStatus.Cancelada },
  ];

  constructor(private router: ActivatedRoute,
    private formService: FormService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private fb: FormBuilder,
    private routerRedirect: Router,
  ) { }

  ngOnInit(): void {
    this.formId = + this.router.snapshot.paramMap.get('id');
    this.addFormValidation();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  } 

  public async addFormValidation() {
    
    await this.getFormById(this.formId);
    this.formGroupAttachments = this.fb.group({});
    if (this.currentForm.formDocumentOptions && this.currentForm.formDocumentOptions.length > 0) {
      this.currentForm.formDocumentOptions.forEach((fd) => {
        this.formGroupAttachments.addControl('image' + fd.documentOptionId, new FormControl('', [Validators.required]));
      });
    }
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

  cancel(): void {
    this.routerRedirect.navigate([`forms/list`])
  }

  onFileChange(event: any, key: string): void {
    const file: File = event.target.files[0];
    this.selectedImages[key] = file;

    console.log(this.selectedImages);
  }

  saveForm(): void {
    //adiciona os arquivos na lista do request
    for (const key in this.selectedImages) {
      if (this.selectedImages.hasOwnProperty(key)) {
        this.formToSave.files.push(this.selectedImages[key]);
      }
    }
    this.formToSave.formId = this.formId;
    //alterar para Finalizado se enviar tudo
    this.formToSave.status = this.currentForm.status;
    this.formToSave.userId = this.authService.getUserInfo().id;

    this.formService.updateFormStatusAndSendFiles(this.formToSave).subscribe(
      (responseForm: any) => {
        this.toastr.success(`Status atualizado e anexos enviados! Id: ${responseForm.id}`);
      }, (error) => {
        this.toastr.error(`Erro ao enviar imagens status: ${error}`);
      }
    );
  }

  async getFormById(id: number): Promise<void> {
    try {
      const response = await this.formService.getFormById(id).toPromise();
      this.currentForm = Object.assign({}, response);
    } catch (error) {
      this.toastr.error(`Erro ao carregar formulário: ${error}`);
    }
  }

}
