import { Component, OnInit, Input } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  Formatters,
  GridOption,
  GridService,
  OnEventArgs,
  SlickDataView,
  SlickGrid,
} from 'angular-slickgrid';
import { GiftMapService } from '../services/giftmap.service';
import { Unit } from '../transaction/unit';
import * as types from '../types';
export declare type GroupInfo = { name: types.GroupType; hide: boolean };

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css'],
})
export class GiftComponent implements OnInit {
  angularGrid!: AngularGridInstance;
  grid!: SlickGrid;
  gridService!: GridService;
  dataView!: SlickDataView;
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset: any[] = [];
  updatedObject: any;

  blackGroupInfo: GroupInfo = { name: '黒鷲', hide: false };
  blueGroupInfo: GroupInfo = { name: '青獅子', hide: false };
  goldGroupInfo: GroupInfo = { name: '金鹿', hide: false };
  churchGroupInfo: GroupInfo = { name: '教会', hide: false };
  dlcGroupInfo: GroupInfo = { name: 'DLC', hide: false };
  isBlackHide: boolean = false;
  isBlueHide: boolean = false;
  isGoldHide: boolean = false;
  isChurchHide: boolean = false;
  isDlcHide: boolean = false;

  readonly groupBlack = '黒鷲';
  readonly groupBlue = '青獅子';
  readonly groupGold = '金鹿';
  readonly groupChurch = '教会';
  readonly groupDlc = 'DLC';

  @Input() units?: Unit[];
  constructor(private giftmapService: GiftMapService) {}

  ngOnInit(): void {
    this.giftmapService.load();

    this.columnDefinitions = [
      {
        id: 'delete',
        field: 'id',
        excludeFromHeaderMenu: true,
        formatter: Formatters.deleteIcon,
        minWidth: 30,
        maxWidth: 30,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.angularGrid.gridService.deleteItemById(args.dataContext.id);
        },
      },
      {
        id: 'name',
        name: 'ユニット',
        field: 'name',
        sortable: true,
      },
    ];
    this.giftmapService.items.forEach((elm) => {
      this.columnDefinitions.push({
        id: elm.id,
        name: elm.name,
        field: elm.id,
        sortable: true,
      });
    });

    // 非表示定義されているアイテムをデフォルト非表示にする。
    const filteredColumnDefinitions = this.columnDefinitions.filter(
      (col) => !this.giftmapService.items.some((i) => i.id == col.id && i.hide)
    );
    const mappedColumnDefinitions = filteredColumnDefinitions.map((col) => {
      return { columnId: col.id.toString() };
    });

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true,
      asyncEditorLoading: false,
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      editable: true,
      enableColumnPicker: true,
      enableCellNavigation: true,
      enableRowSelection: true,

      presets: {
        sorters: [{ columnId: 'id', direction: 'ASC' }],
        columns: mappedColumnDefinitions,
      },
    };

    // ユニット毎の相性データを作成し、Gridに設定。
    this.units?.forEach((elm) => this.dataset.push(this.createUnitData(elm)));
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.dataView = angularGrid.dataView;
    this.grid = angularGrid.slickGrid as SlickGrid;
    this.gridService = angularGrid.gridService;
  }

  toggleBlackHide() {
    this.toggleGroupHide(this.isBlackHide, this.groupBlack);
  }

  toggleBlueHide() {
    this.toggleGroupHide(this.isBlueHide, this.groupBlue);
  }

  toggleGoldHide() {
    this.toggleGroupHide(this.isGoldHide, this.groupGold);
  }

  toggleChurchHide() {
    this.toggleGroupHide(this.isChurchHide, this.groupChurch);
  }

  toggleDlcHide() {
    this.toggleGroupHide(this.isDlcHide, this.groupDlc);
  }

  toggleGroupHide(isHide: boolean, group: string) {
    isHide ? this.hideGroup(group) : this.showGroup(group);
  }

  showGroup(group: string) {
    const items = this.units
      ?.filter((v) => v.group == group)
      .map((e) => this.createUnitData(e));
    this.angularGrid.gridService.addItems(items); // 全て消えていることが前提。残っている場合は、upsertを使う。
    this.angularGrid.sortService.clearSorting();
  }

  hideGroup(group: string) {
    const currentData = this.dataView.getItems();
    const deletelist = currentData
      // ? グループメンバーを手動削除し、ボタンによるHide処理を実施した場合にエラーとなるか
      .filter((v) => v.group == group)
      .map((e) => e.id);
    this.angularGrid.gridService.deleteItemByIds(deletelist as string[]);
  }

  private createUnitData(unit: Unit) {
    const map = this.giftmapService.searchUnitItem(unit.id);
    // return Object.assign(map, { id: unit.id, name: unit.name, group: unit.group});
    return Object.assign(map, unit); // プロパティ名が同一のため、パターンマッチングでマッピングが可能。
  }
}
