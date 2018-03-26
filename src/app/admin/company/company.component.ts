import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { CompanyService } from '../services/company.service';
import { Message } from 'primeng/components/common/api';

import { Subscription } from 'rxjs';
import { Company } from './company';
import { Router } from "@angular/router";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy  {

  company: Company;
  companyBk: Company;
  msgs: Message[] = [];
  editMode: boolean;
  editModeC: boolean;
  editModeN: boolean;
  
  get$: Subscription;
  add$: Subscription;
  edit$: Subscription;
  delete$: Subscription;

  constructor(private companyService: CompanyService, 
    private confirmationService: ConfirmationService, private router: Router) {
  }

  ngOnInit() {
    this.editMode = false;
    this.editModeC = false;
    this.editModeN = false;
    this.get$ = this.companyService.load().subscribe(
      company => { 
        this.company = company; 
        if (this.company.contact==null) {
          this.company.contact = {mail: null, name:null, phone:null};
        }
      },
      error => this.showError(error)
    );
  }

  update() {
    this.editMode = true;
    this.companyBk = Object.assign({}, this.company);
  }

  updateC() {
    this.editModeC = true;
    this.companyBk = Object.assign({}, this.company);
  }

  updateN() {
    this.editModeN = true;
    this.companyBk = Object.assign({}, this.company);
  }

  save() {

  }

  cancel() {
    this.editMode = false;
    this.company = Object.assign({}, this.companyBk);
  }
  cancelC() {
    this.editModeC = false;
    this.company = Object.assign({}, this.companyBk);
  }
  cancelN() {
    this.editModeN = false;
    this.company = Object.assign({}, this.companyBk);
  }

  ngOnDestroy() {
    if (this.get$) {
      this.get$.unsubscribe();
    }
    if (this.add$) {
      this.add$.unsubscribe();
    }
    if (this.edit$) {
      this.edit$.unsubscribe();
    }
    if (this.delete$) {
      this.delete$.unsubscribe();
    }
  }

  private showError(errMsg: any) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error:', detail: errMsg.message });
  }

  private showSuccess(successMsg: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: successMsg });
  }

}
