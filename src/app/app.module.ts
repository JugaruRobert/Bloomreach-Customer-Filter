import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from '@app/app.component';

import { SharedModule } from '@shared/shared.module';

import { CustomerFilterComponent } from '@components/customer-filter/customer-filter.component';
import { FilterStepComponent } from '@components/filter-step/filter-step.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFilterComponent,
    FilterStepComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 5000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
