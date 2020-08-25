import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import{MatButtonModule} from '@angular/material/button';
import { AccountService } from 'src/app/user/account/account.service';



@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor( private dialog: MatDialog, public accountService:AccountService, data:any) { console.log("Data: " + data)}
  noteID;
  ngOnInit(): void {
    
  }
  
  closeDialogNo(){
    this.dialog.closeAll();
  }
  closeDialogYes(){
    //console.log("Note ID: " + noteID)
    this.dialog.closeAll();
    //this.accountService.deleteNote(noteID)

  }

}
