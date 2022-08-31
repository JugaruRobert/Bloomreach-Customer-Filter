import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective {
  @Input('autofocus') enabled: boolean = true;

  constructor(private element: ElementRef) { }

  ngOnChanges() {
    if (!this.enabled) {
      return;
    }

    if (this.element.nativeElement.tagName === 'MENU-SELECT') {
      setTimeout(() => {
        const menuSelect = this.element.nativeElement.children[0];
        if (menuSelect) {
          const selectTrigger = menuSelect.children[0];
          if (!selectTrigger?.children[0].classList.contains('placeholder-text')) {
            return;
          }
          selectTrigger?.click();
        }
      }, 120);
    } else {
      setTimeout(() => {
        this.element.nativeElement.focus();
      }, 0);
    }
  }
}
