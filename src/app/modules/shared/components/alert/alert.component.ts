import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() icon: string = "error";
  @Input() label_button_1: string = "";
  @Input() label_button_2: string = "";
  @Output() dialogEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  emitEvent(event: boolean) {
    setTimeout(() => {
      this.dialog.closeAll();
    }, 100);
    this.dialogEvent.emit(event);
  }

}
