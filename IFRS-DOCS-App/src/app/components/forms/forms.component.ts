import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  public forms: any;
  public title = "Formulários";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getForms();
  }
  
  public getForms(){
    this.http.get('https://localhost:44325/api/form/getByUser/1').subscribe(
      response => this.forms = response,
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

}
