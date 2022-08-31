import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() text: string = '';

  @Output() onClick = new EventEmitter();
}
