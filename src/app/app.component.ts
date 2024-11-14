import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'API_key_test';
  formFieldsData: any[] = [];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getItems().subscribe((data) => {
      this.formFieldsData = data;
    });
  }

  
}
