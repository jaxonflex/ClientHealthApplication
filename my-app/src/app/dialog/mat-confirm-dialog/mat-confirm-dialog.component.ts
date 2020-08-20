import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { AccountService } from 'src/app/user/account/account.service';



@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor( private dialog: MatDialog, public dialogService:DialogService, public accountService:AccountService) { }
  noteID;
  ngOnInit(): void {
    this.noteID = this.dialogService.getNoteID();
  }
  
  closeDialog(){
    this.dialogService.closeDialog();
  }
  closeDialogYes(noteID){
    console.log("Note ID: " + noteID)
    this.dialogService.closeDialog();
    this.accountService.deleteNote(noteID)
  }

}
