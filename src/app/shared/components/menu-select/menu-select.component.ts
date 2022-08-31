import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'menu-select',
  templateUrl: './menu-select.component.html',
  styleUrls: ['./menu-select.component.scss']
})
export class MenuSelectComponent implements OnChanges {
  @Input() type: 'search' | 'tab' = 'search'; 
  @Input() selected: string = '';
  @Input() menuOpen: boolean = false;
  @Input() placeholder: string = 'Select...';

  @Input() options: string[] = [];
  @Input() searchPlaceholder: string = '';
  @Input() tag: string = '';

  @Output() change: EventEmitter<string> = new EventEmitter();

  selectedOption: string = '';
  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.menuOpen) {
      this.toggleMenu();
    }
  }

  ngOnChanges() {
    this.selectedOption = this.selected;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.menuOpen = false;
    this.change.emit(option);
  }
}
