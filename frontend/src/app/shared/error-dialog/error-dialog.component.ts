import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MaterialModule} from "../material.module";

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDialogComponent {
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
