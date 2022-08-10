import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  public forms: any = [];
  public title = "Formulários";
  private _filterList: string = '';
  public filteredForms: any = [];

  constructor(private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.getForms();
  }
  
  public getForms(){
    this.http.get('https://localhost:44325/api/form/getByUser/1').subscribe(
      response => {
        this.forms = response
        this.filteredForms = this.forms;
      },
      error => console.log(error)
    );
    return this.forms;
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

  filterForms(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.forms.filter(
      (dtoResponse: any) => dtoResponse.form.name.toLocaleLowerCase().indexOf(filterBy) !== -1 
    );
  }
}
