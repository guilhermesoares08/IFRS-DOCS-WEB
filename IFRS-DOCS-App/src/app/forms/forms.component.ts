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
    this.http.get('https://localhost:44325/api/form/getPendingForms/1').subscribe(
      response => this.forms = response,
      error => console.log(error)
    );
    return this.forms;
  }

}
