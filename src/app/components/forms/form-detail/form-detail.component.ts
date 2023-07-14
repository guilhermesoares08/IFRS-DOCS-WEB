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
  formGroup: FormGroup;
  formGroupAttachments: FormGroup;
  files: File[];
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
    this.getFormById(this.formId);
    this.validation();
  }

  getFormById(id: number): void {
    
    this.formService.getFormById(id).subscribe(
      (form: Form) => {
        this.currentForm = Object.assign({}, form);
        console.log(this.currentForm.formDocumentOptions);
      },
      (error) => {
      }
    );
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public validation(): void {
    this.formGroup = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([]),
    });

    this.formGroupAttachments = this.fb.group({});
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

  cancel(): void{
    this.routerRedirect.navigate([`forms/list`])
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => //this.imagemURL = event.target.result;

    this.files = ev.target.files;
    reader.readAsDataURL(this.files[0]);

    //this.uploadImagem();
  }

}
