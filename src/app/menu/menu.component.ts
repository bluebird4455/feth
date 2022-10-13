import { Component, OnInit } from '@angular/core';
import { UnitService } from '../services/unit.service';
import { Unit } from '../transaction/unit';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  unitList: Unit[] = [];

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
    this.unitService.load();
    this.unitList = this.unitService.getAllUnit();
  }

}
