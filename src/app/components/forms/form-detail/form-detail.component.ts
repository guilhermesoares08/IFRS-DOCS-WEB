import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {
  formId: any;

  constructor(private router: ActivatedRoute    
  ) { }

  ngOnInit(): void {
    this.formId = + this.router.snapshot.paramMap.get('id');
  }

}
