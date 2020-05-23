import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './../../../_services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderServiceDemo.loaderService;

  constructor(private loaderServiceDemo: LoaderService) {
    // //debugger;
    // //console.log("Hi in Loader")
   }

  ngOnInit() {
  }

}
