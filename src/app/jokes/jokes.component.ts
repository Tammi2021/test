import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {
  jokes: any;
  selectedJoke: any;
  displayedColumns = ['id', 'category', 'type'];
  relatedJoke = [];
  @ViewChild('dialog')
  jokeDialog!: TemplateRef<any>;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(this.jokeDialog);
  }
  ngOnInit(): void {
    this.http.get('assets/jokes.json').subscribe(res => {
      this.jokes = res;
      console.log(res)
    })
  }
  open(row: any) {
    this.selectedJoke = row;
    this.relatedJoke = this.jokes.filter((el: { type: any; }) => {
      return el.type == row.type;
    });
    this.relatedJoke = this.relatedJoke.slice(0, 5);

    this.openDialog();
  }


}
