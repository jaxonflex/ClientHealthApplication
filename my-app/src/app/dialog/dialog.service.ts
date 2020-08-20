import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import {MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor( private dialog: MatDialog) { }
  private noteID;
  openConfirmDialog(noteID){
    this.noteID = noteID;
    this.dialog.open(MatConfirmDialogComponent,{
      width:'390px',
    })
  }
  getNoteID(){
    return this.noteID;
  }
  closeDialog(){
    this.dialog.closeAll();
  }

}
