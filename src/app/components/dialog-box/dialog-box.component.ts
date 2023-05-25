import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  myForm: FormGroup = new FormGroup({
    title: new FormControl(""),
    price: new FormControl("")
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.data = {
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: "assets/images/default.png"
    }
    this.dialogRef.close(this.data);
  }
}
