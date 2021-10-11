import { Component, OnInit } from '@angular/core';

import { Menu } from 'src/app/utils/interfaces';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-left-links',
  templateUrl: './left-links.component.html',
  styleUrls: ['./left-links.component.css']
})
export class LeftLinksComponent implements OnInit {
  public links: Menu[];

  constructor(private _menuService: MenuService,) {
    this.links = _menuService.getLeftLinks();
  }

  ngOnInit(): void { }
}
