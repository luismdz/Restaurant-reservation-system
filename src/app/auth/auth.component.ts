import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  onGoBack() {
    this._location.back();
  }
}
