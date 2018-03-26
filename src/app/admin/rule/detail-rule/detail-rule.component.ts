import { Component, OnInit,Input } from '@angular/core';
import { Rule } from '../rule';

@Component({
  selector: 'app-detail-rule',
  templateUrl: './detail-rule.component.html',
  styleUrls: ['./detail-rule.component.css']
})
export class DetailRuleComponent implements OnInit {

  @Input() showMePartially: boolean;
  @Input() ruleDetails: Rule;

  constructor() { }

  ngOnInit() {
  }

  closePanel() {
    this.ruleDetails = null;
  }

}
