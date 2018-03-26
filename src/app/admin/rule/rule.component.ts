import { Component, OnInit, OnDestroy } from '@angular/core';
import { RulesService } from '../services/rules.service';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { Rule } from './rule';
import { Router } from "@angular/router";

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit, OnDestroy {

  rules: Rule[];
  selectedRule: Rule;
  ruleForDialog: Rule;
  ruleForDetails: Rule;
  displayDialog: boolean;
  msgs: Message[] = [];

  showVar: boolean = false;

  get$: Subscription;
  add$: Subscription;
  edit$: Subscription;
  delete$: Subscription;

  constructor(private rulesService: RulesService, private router: Router) {
  }

  ngOnInit(): void {
    this.get$ = this.rulesService.load().subscribe(
      rules => { this.rules = rules.rules; console.log(this.rules) },
      error => this.showError(error)
    );
    for (var i = 0; i < this.router.config.length; i++) {
      var routePath: string = this.router.config[i].path;
      console.log(routePath);
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

  add() {
    this.ruleForDialog = new Rule();
    this.displayDialog = true;
  }

  edit() {
    if (this.selectedRule == null) {
      return;
    }
    // create a clone of the selected rule
    this.ruleForDialog = Object.assign({}, this.selectedRule);
    this.displayDialog = true;
  }

  remove() {

  }

  details() {
    this.ruleForDetails = this.selectedRule;
  }

  save() {
    if (this.ruleForDialog.id) {
      // update
      this.edit$ = this.rulesService.update(this.ruleForDialog)
        .finally(() => {
          this.ruleForDialog = null;
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
          this.showSuccess('Se actualizó la regla: ' + this.selectedRule.name);
        },
        error => this.showError(error)
        );
    } else {
      // create
      this.add$ = this.rulesService.create(this.ruleForDialog)
        .finally(() => {
          this.ruleForDialog = null;
          this.selectedRule = null;
          this.displayDialog = false;
        })
        .subscribe(
        (rule: Rule) => {
          this.rules = [...this.rules, rule];
          this.showSuccess('Se creo la regla: ' + rule.name);
        },
        error => this.showError(error)
        );
    }
  }

  private showError(errMsg: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Sorry, an error occurred', detail: errMsg });
  }

  private showSuccess(successMsg: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: successMsg });
  }
}
