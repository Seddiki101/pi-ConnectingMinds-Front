import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-image-inspector",
  templateUrl: "./image-inspector.component.html",
  styleUrls: ["./image-inspector.component.css"],
})
export class ImageInspectorComponent implements OnInit {
  imageUrl: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string },
    public dialogRef: MatDialogRef<ImageInspectorComponent>
  ) {}
  ngOnInit(): void {
    if (this.data.imageUrl) {
      this.imageUrl = this.data.imageUrl;
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
