import { Component, EventEmitter, Input, Output } from '@angular/core';

import { OperatorTab, OPERATOR_TABS } from '@shared/models/shared.model';

@Component({
  selector: 'tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent {
  @Input() set selected(operator: string) {
    const selectedTab = OPERATOR_TABS.find(tab => tab.options.includes(operator));
    this.activeTab = selectedTab || OPERATOR_TABS[0];
  }

  @Output() optionChange: EventEmitter<string> = new EventEmitter();

  operatorTabs = OPERATOR_TABS;
  activeTab: OperatorTab = OPERATOR_TABS[0];
}
