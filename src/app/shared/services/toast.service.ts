import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) { }

  public openToast(type: 'error' | 'success' | 'info', message: string) {
    this.toastr[type](message, '');
  }
}
