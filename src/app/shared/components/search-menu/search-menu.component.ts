import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss']
})
export class SearchMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  @Input() set options(value: string[]) {
    this.menuOptions = value;
    this.filteredOptions = value;
  }
  @Input() tag: string = '';
  @Input() placeholder: string = 'Search...';

  @Output() optionChange: EventEmitter<string> = new EventEmitter();
  
  filteredOptions: string[] = [];

  private menuOptions: string[] = [];
  private readonly destroy = new Subject<boolean>();

  ngAfterViewInit() {
    fromEvent(this.searchInput!.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.destroy),
        debounceTime(200),
        distinctUntilChanged(),
    ).subscribe(this.filterOptions.bind(this));
  }

  filterOptions() {
    const searchTerm = this.searchInput?.nativeElement.value;
    this.filteredOptions = this.menuOptions.filter(option => option.includes(searchTerm));
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
