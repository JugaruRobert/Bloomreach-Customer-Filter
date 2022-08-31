import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';

import { DEEFAULT_STEP_NAME, Filter, FilterRule, OPERATOR_TABS } from '@shared/models/shared.model';

@Component({
  selector: 'filter-step',
  templateUrl: './filter-step.component.html',
  styleUrls: ['./filter-step.component.scss']
})
export class FilterStepComponent {
  @Input() index: number = 0;
  @Input() filter: Filter = new Filter();
  @Input() customerEvents: {[key: string]: {[key: string]: string}} = {};
  @Input() operatorTypes: {[key: string]: string} = {};
  @Input() canDelete: boolean = false;

  @Output() copyFilter: EventEmitter<Filter> = new EventEmitter();
  @Output() deleteFilter: EventEmitter<number> = new EventEmitter();

  customerEventOptions: string[] = [];
  eventAttributeOptions: string[] = [];
  nameEditMode: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerEvents']) {
      this.customerEventOptions = Object.keys(this.customerEvents);
      if (this.filter.event) {
        this.eventAttributeOptions = Object.keys(this.customerEvents[this.filter.event]);
      }
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterHandler() {
    this.nameEditMode = false;
    this.stepRenamed();
  }

  addFilterRule() {
    this.filter.rules.push(new FilterRule());
  }

  removeRule(index: number) {
    this.filter.rules.splice(index, 1);
  }

  filterEventChanged(event: string) {
    if (!this.customerEvents[event]) {
      return;
    }

    this.eventAttributeOptions = Object.keys(this.customerEvents[event]);

    if (this.filter.name === DEEFAULT_STEP_NAME || this.filter.name === this.filter.event) {
      this.filter.name = event;
    }

    this.filter.event = event;
    this.filter.rules = [];
  }

  ruleAttributeChange(attribute: string, rule: FilterRule) {
    rule.attribute = attribute;
    const operatorType = this.customerEvents[this.filter.event][attribute];
    const operatorsTab = OPERATOR_TABS.find(tab => tab.title === operatorType);
    rule.operator = operatorsTab?.options[0];
    if (rule.operator === 'in between') {
      rule.value = [0, 0];
    } else {
      rule.value = operatorType === 'number' ? 0 : '';
    }
  }

  ruleOperatorChange(operator: string, rule: FilterRule) {
    if (operator === 'in between') {
      rule.value = [0, 0];
      rule.operator = operator;
      return;
    } 

    const operatorType = this.operatorTypes[operator];
    if (rule.operator) {
      const previousOperatorType = this.operatorTypes[rule.operator];
      if (previousOperatorType === operatorType) {
        rule.operator = operator;
        return;
      }
    } 

    rule.operator = operator;
    rule.value = operatorType === 'number' ? 0 : '';
  }

  stepRenamed() {
    if (!this.filter.name.trim().length) {
      this.filter.name = DEEFAULT_STEP_NAME;
    }
    this.nameEditMode = false;
  }
}
