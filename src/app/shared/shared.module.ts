import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { PrimaryButtonComponent } from '@shared/components/primary-button/primary-button.component';
import { MenuSelectComponent } from '@shared/components/menu-select/menu-select.component';
import { TabMenuComponent } from '@shared/components/tab-menu/tab-menu.component';
import { SearchMenuComponent } from '@shared/components/search-menu/search-menu.component';
import { CustomerEventService } from '@shared/services/customer-event.service';
import { AutofocusDirective } from '@shared/directives/autofocus.directive';

const SHARED_DECLARATIONS = [
  PrimaryButtonComponent,
  MenuSelectComponent,
  TabMenuComponent,
  SearchMenuComponent,
  AutofocusDirective
];

const SHARED_IMPORTS = [
  CommonModule,
  FormsModule
];

const SHARED_PROVIDERS = [
  CustomerEventService
];

@NgModule({
  declarations: [
    ...SHARED_DECLARATIONS
  ],
  imports: [
    ...SHARED_IMPORTS
  ],
  exports: [
    ...SHARED_DECLARATIONS,
    ...SHARED_IMPORTS
  ],
  providers: [
    ...SHARED_PROVIDERS
  ]
})
export class SharedModule { }
