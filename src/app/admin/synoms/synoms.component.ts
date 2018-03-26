import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { SynomsService } from '../services/synoms.service';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { Synom } from './synom';
import { Router } from "@angular/router";

@Component({
  selector: 'app-synoms',
  templateUrl: './synoms.component.html',
  styleUrls: ['./synoms.component.css']
})
export class SynomsComponent implements OnInit, OnDestroy {

  synoms: Synom[];
  selectedSynom: Synom;
  synomForDialog: Synom;
  displayDialog: boolean;
  msgs: Message[] = [];

  showVar: boolean = false;

  get$: Subscription; 
  add$: Subscription;
  edit$: Subscription;
  delete$: Subscription;

  constructor(private synomsService: SynomsService, private confirmationService: ConfirmationService, private router: Router) {
  }


  ngOnInit() {
    this.get$ = this.synomsService.load().subscribe(
      synoms => { this.synoms = synoms; console.log(this.synoms) },
      error => this.showError(error)
    );
    this.synomForDialog = { id: null, textTerms: null };
  }

  cancel() {
    this.synomForDialog = { id: null, textTerms: null };
    this.displayDialog = false;
  }

  add() {
    this.synomForDialog = { id: null, textTerms: null };
    this.displayDialog = true;
  }

  edit() {
    if (this.selectedSynom == null) {
      return;
    }
    this.synomForDialog = Object.assign({}, this.selectedSynom);
    this.displayDialog = true;
  }

  remove() {
    if (this.selectedSynom == null) {
      return;
    }
    
    this.confirmationService.confirm({
      message: 'Desea eliminar los sinónimos: ' + this.getTermsShort(this.selectedSynom.textTerms) + ' ?',
      accept: () => {
        this.delete$ = this.synomsService.delete(this.selectedSynom.id).subscribe(
          sw => {
            this.synoms = this.synoms.filter(
              (element: Synom) => element.id !== this.selectedSynom.id);
            this.showSuccess('Se elimino los sinónimos: ' + this.getTermsShort(this.selectedSynom.textTerms));
          },
          error => this.showError(error)
        );
      },
    });
  }

  private getTermsShort(val: string) {
    let termsShort = val;
    if (termsShort.length>30) {
      termsShort = termsShort.substring(0,30)+" ...";
    }
    return termsShort;
  }

  save() {
    if (this.synomForDialog.id) {
      // update
      this.edit$ = this.synomsService.update(this.synomForDialog)
        .finally(() => {
          this.synomForDialog = { id: null, textTerms: null };
          this.displayDialog = false;
        })
        .subscribe(
        () => {
          this.synoms.some((element: Synom, index: number) => {
            if (element.id === this.synomForDialog.id) {
              this.synoms[index] = Object.assign({}, this.synomForDialog);
              this.synoms = [...this.synoms];
              this.selectedSynom = this.synoms[index];
              return true;
            }
          });
          this.showSuccess('Se actualizó los sinónimos: ' + this.getTermsShort(this.synomForDialog.textTerms));
        },
        error => this.showError(error)
        );
    } else {
      // create
      this.add$ = this.synomsService.create(this.synomForDialog)
        .finally(() => {
          this.synomForDialog = { id: null, textTerms: null };
          this.selectedSynom = null;
          this.displayDialog = false;
        }) 
        .subscribe(
        (synom: Synom) => {
          this.synoms = [...this.synoms, synom];
          this.showSuccess('Se agregó los sinónimos: ' + this.getTermsShort(synom.textTerms));
        },
        error => this.showError(error)
        );
    }
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
