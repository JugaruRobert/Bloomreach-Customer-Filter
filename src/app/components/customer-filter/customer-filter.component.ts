import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CustomerEventService } from '@shared/services/customer-event.service';
import { ToastService } from '@shared/services/toast.service';
import { CustomerEvent, Filter, OperatorTab } from '@shared/models/shared.model';
import { OPERATOR_TABS } from '@shared/models/shared.model';

@Component({
  selector: 'customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {
  filters: Filter[] = [new Filter()];
  customerEvents: {[key: string]: {[key: string]: string}} = {};
  operatorTypes: {[key: string]: string} = {};

  private readonly destroy = new Subject<boolean>();

  constructor(private customerEventService: CustomerEventService,
            private toastService: ToastService) { }

  ngOnInit() {
    this.setOperatorTypes();
    this.customerEventService.getCustomerEvents();
    this.customerEventService.customerEvents$
      .pipe(takeUntil(this.destroy))
      .subscribe(customerEvents => {
        if (customerEvents?.length) {
          this.formatEvents(customerEvents);
        }
    });
  }

  formatEvents(customerEvents: CustomerEvent[]) {
    this.customerEvents = customerEvents.reduce((eventObj, event) => {
      return Object.assign(eventObj, {
        [event.type]: event.properties.reduce((propertyObj, eventProp) => {
          return Object.assign(propertyObj, {[eventProp.property]: eventProp.type})
        }, {})
      });
    }, {});
  }

  setOperatorTypes() {
    this.operatorTypes = OPERATOR_TABS.reduce((obj, tab) => {
      tab.options.forEach(operator => obj[operator] = tab.title);
      return obj;
    }, {});
  }

  discardFilters() {
    this.filters = [new Filter()];
  }

  addFunnelStep() {
    this.filters.push(new Filter());
  }

  applyFilters() {
    console.log("%cCustomer Filter", "color: #ffd500; font-size: 24px; background-color: #002840; padding: 24px;");
    console.log('Filters: ', JSON.parse(JSON.stringify(this.filters)));
    this.toastService.openToast('success', 'Filters successfully applied! Check the console for more details');
  }

  deleteFilter(index: number) {
    this.filters.splice(index, 1);
  }

  copyFilter(filter: Filter) {
    this.filters.push(filter.copy());
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
