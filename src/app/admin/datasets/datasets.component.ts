import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { DatasetService } from '../services/dataset.service';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { Dataset } from './dataset';
import { Rule } from '../rule/rule';
import { Router } from "@angular/router";

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit, OnDestroy {

  rules: Rule[];
  rulesSI: SelectItem[];
  selectedRuleSI: any;
  datasets: Dataset[];
  selectedDataset: Dataset;
  datasetForDialog: Dataset;
  displayDialog: boolean;
  msgs: Message[] = [];

  showVar: boolean = false;

  get$: Subscription;
  add$: Subscription;
  edit$: Subscription;
  delete$: Subscription;

  constructor(private datasetService: DatasetService, 
    private confirmationService: ConfirmationService, private router: Router) {
  }


  ngOnInit() {
    this.get$ = this.datasetService.loadRules().subscribe(
      rules => { 
        this.rules = rules; 
        this.rulesSI = [];
        
        for (var r of this.rules) { 
          this.rulesSI.push({label:r["name"], value:r});
        }
      },
      error => this.showError(error)
    );
    this.datasetForDialog = { id: null, codRule: null, text: null };
  }

  loadData() {
    if (this.selectedRuleSI) {
      this.get$ = this.datasetService.loadByRule(this.selectedRuleSI["codRule"]).subscribe (
        data => {this.datasets = data},
        error => this.showError(error)
      );
    }
  }

  cancel() {
    this.datasetForDialog = { id: null, codRule: null, text: null };
    this.displayDialog = false;
  }

  add() {
    this.datasetForDialog = { id: null, codRule: null, text: null };
    this.displayDialog = true;
  }

  edit() {
    if (this.selectedDataset == null) {
      return;
    }
    this.datasetForDialog = Object.assign({}, this.selectedDataset);
    this.displayDialog = true;
  }

  remove() {
    if (this.selectedDataset == null) {
      return;
    }

    this.confirmationService.confirm({
      message: 'Desea eliminar el texto: ' + this.getTermsShort(this.selectedDataset.text) + ' ?',
      accept: () => {
        this.delete$ = this.datasetService.delete(this.selectedDataset.id).subscribe(
          sw => {
            this.datasets = this.datasets.filter(
              (element: Dataset) => element.id !== this.selectedDataset.id);
            this.showSuccess('Se elimino el texto: ' + this.getTermsShort(this.selectedDataset.text));
          },
          error => this.showError(error)
        );
      },
    });
  }

  

  save() {
    if (this.datasetForDialog.id) {
      // update
      this.edit$ = this.datasetService.update(this.datasetForDialog)
        .finally(() => {
          this.datasetForDialog = { id: null, codRule: null, text: null };
          this.displayDialog = false;
        })
        .subscribe(
        () => {
          this.datasets.some((element: Dataset, index: number) => {
            if (element.id === this.datasetForDialog.id) {
              this.datasets[index] = Object.assign({}, this.datasetForDialog);
              this.datasets = [...this.datasets];
              this.selectedDataset = this.datasets[index];
              return true;
            }
          });
          this.showSuccess('Se actualizó el texto: ' + this.getTermsShort(this.datasetForDialog.text));
        },
        error => this.showError(error)
        );
    } else {
      // create
      this.datasetForDialog.codRule = this.selectedRuleSI["codRule"];
      this.add$ = this.datasetService.create(this.datasetForDialog)
        .finally(() => {
          this.datasetForDialog = { id: null, codRule: null, text: null };
          this.selectedDataset = null;
          this.displayDialog = false;
        })
        .subscribe(
        (dataset: Dataset) => {
          this.datasets = [...this.datasets, dataset];
          this.showSuccess('Se agregó el texto: ' + this.getTermsShort(dataset.text));
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

  private getTermsShort(val: string) {
    let termsShort = val;
    if (termsShort.length > 30) { 
      termsShort = termsShort.substring(0, 30) + " ...";
    }
    return termsShort;
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
