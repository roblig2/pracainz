import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-complaint-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule
  ],
  templateUrl: './complaint-dialog.component.html',
  styleUrl: './complaint-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ComplaintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: string, message: string,header:string}
  ) {}

  onYes(): void {
    this.dialogRef.close(true);
  }

  onNo(): void {
    this.dialogRef.close(false);
  }

}
