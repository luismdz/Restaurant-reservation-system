import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private menuSvc: MenuService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  open(): void {
    this.menuSvc.isOpen.next(true);
  }

}
