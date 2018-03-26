import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { Rule } from './Rule';
import { Router } from "@angular/router";
import { RulesService} from "../services/rules.service";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit, OnDestroy {
  
    rules: Rule[];
    selectedRule: Rule;
    ruleForDialog: Rule;
    displayDialog: boolean;
    msgs: Message[] = [];
    ruleForDetails: Rule;
  
    get$: Subscription; 
    add$: Subscription;
    edit$: Subscription;
    delete$: Subscription;
  
    constructor(private rulesService: RulesService, 
                private confirmationService: ConfirmationService, private router: Router) {
    }

    ngOnInit() {
      this.get$ = this.rulesService.load().subscribe(
        rules => { this.rules = rules; },
        error => this.showError(error)
      );
      this.ruleForDialog = { id: null, codRule: null, category: null, name: null };
    }
  
    cancel() {
      this.ruleForDialog = { id: null, codRule: null, category: null, name: null };
      this.displayDialog = false;
    }
  
    add() {
      this.ruleForDialog = { id: null, codRule: null, category: null, name: null };
      this.displayDialog = true;
    }
  
    edit() {
      if (this.selectedRule == null) {
        return;
      }
      this.ruleForDialog = Object.assign({}, this.selectedRule);
      this.displayDialog = true;
    }

    details() {
      console.log("Va a detalles.");
      this.get$ = this.rulesService.findById(this.selectedRule.id).subscribe(
        rule => { this.ruleForDetails = rule},
        error => this.showError(error)
      );
    }
  

    closePanel() {
      this.ruleForDetails = null;
    }
  
    remove() {
      console.log("En remove.."+this.selectedRule);
      if (this.selectedRule == null) {
        return;
      }
      this.confirmationService.confirm({
        message: 'Desea eliminar la regla: ' +this.selectedRule.name + ' ?',
        accept: () => {
          this.delete$ = this.rulesService.delete(this.selectedRule.id).subscribe(
            sw => {
              this.rules = this.rules.filter(
                (element: Rule) => element.id !== this.selectedRule.id);
              this.showSuccess('Se eliminó la Regla: ' + this.selectedRule.name);
            },
            error => this.showError(error)
          );
        }
      });
      
    }

    save() {
      if (this.ruleForDialog.id) {
        // update
        this.edit$ = this.rulesService.update(this.ruleForDialog)
          .finally(() => {
            this.ruleForDialog = { id: null, codRule: null, category: null, name: null };
            this.displayDialog = false;
          })
          .subscribe(
          () => {
            this.rules.some((element: Rule, index: number) => {
              if (element.id === this.ruleForDialog.id) {
                this.rules[index] = Object.assign({}, this.ruleForDialog);
                this.rules = [...this.rules];
                this.selectedRule = this.rules[index];
                return true;
              }
            });
            this.showSuccess('Se actualizó la regla: ' + this.ruleForDialog.name);
          },
          error => this.showError(error)
          );
      } else {
        // create
        this.add$ = this.rulesService.create(this.ruleForDialog)
          .finally(() => {
            this.ruleForDialog = { id: null, codRule: null, category: null, name: null };
            this.selectedRule = null;
            this.displayDialog = false;
          })
          .subscribe(
          (rule: Rule) => {
            this.rules = [...this.rules, rule];
            this.showSuccess('Se agregó la Regla: ' + rule.name);
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
