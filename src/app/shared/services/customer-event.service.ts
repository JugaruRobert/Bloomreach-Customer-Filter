import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ApiResponse, CustomerEvent, CustomerEventResponse } from '@shared/models/shared.model';
import { ToastService } from '@shared/services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerEventService {
    private readonly URL = 'https://customer-events.herokuapp.com';
    private customerEventsSubject = new BehaviorSubject<CustomerEvent[] | null> (null);

    readonly customerEvents$: Observable<CustomerEvent[] | null> = this.customerEventsSubject.asObservable();

    constructor(private readonly http: HttpClient,
            private toastSerice: ToastService) { }

    public getCustomerEvents() {
        if (this.customerEventsSubject.value) {
            return;
        }

        this.httpGetCustomerEvents().subscribe(
            (response) => {
                if (response.success && response.data) {
                    this.customerEventsSubject.next(response.data.events);
                } else {
                    this.toastSerice.openToast('error', 'Could not load customer events');
                }
            },
            (error) => {
                console.error(error);
                this.toastSerice.openToast('error', 'Could not load customer events');
            }
        );
    }

    private httpGetCustomerEvents() {
        return this.http.get<ApiResponse<CustomerEventResponse>>(this.URL);
    }
}
