import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(10)
      ]),
      transition('* => void', [
        animate(10, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public canSee: boolean;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.canSee = false;
    this.visibleChange.emit(this.visible);
  }

  makeItVisible() {

    this.visible = true;
    this.canSee = true;
    this.visibleChange.emit(this.visible);
    console.log(this.visibleChange);
  }
}
