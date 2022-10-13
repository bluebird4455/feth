import { Injectable } from '@angular/core';
import { Unit } from '../transaction/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  units:Unit[] = [];

  constructor() { }

  load(): void {
    const yaml = require('js-yaml');

    // Get document, or throw exception on error
    try {
      const doc = yaml.load(this.mockData());
      console.log(doc);

      const list = doc.Unit
      this.units = Object.keys(list).map((elm) => {
        return { id: elm, name: list[elm].Name, group: list[elm].Group };
      });

    } catch (e) {
      console.log(e);
    }
  };

  getAllUnit(): Unit[] {
    return this.units.map(elm => elm);
  }

  mockData(): string {
    return `
Unit:
  101:
    Name: エーデルガルト
    Group: 黒鷲
  102:
    Name: ヒューベルト
    Group: 黒鷲
  103:
    Name: フェルディナント
    Group: 黒鷲
  104:
    Name: リンハルト
    Group: 黒鷲
  105:
    Name: カスパル
    Group: 黒鷲
  106:
    Name: ベルナデッタ
    Group: 黒鷲
  107:
    Name: ドロテア
    Group: 黒鷲
  108:
    Name: ペトラ
    Group: 黒鷲
  201:
    Name: ディミトリ
    Group: 青獅子
  202:
    Name: ドゥドゥー
    Group: 青獅子
  203:
    Name: フェリクス
    Group: 青獅子
  204:
    Name: アッシュ
    Group: 青獅子
  205:
    Name: シルヴァン
    Group: 青獅子
  206:
    Name: メルセデス
    Group: 青獅子
  207:
    Name: アネット
    Group: 青獅子
  208:
    Name: イングリット
    Group: 青獅子
  301:
    Name: クロード
    Group: 金鹿
  302:
    Name: ローレンツ
    Group: 金鹿
  303:
    Name: ラファエル
    Group: 金鹿
  304:
    Name: イグナーツ
    Group: 金鹿
  305:
    Name: リシテア
    Group: 金鹿
  306:
    Name: マリアンヌ
    Group: 金鹿
  307:
    Name: ヒルダ
    Group: 金鹿
  308:
    Name: レオニー
    Group: 金鹿
  401:
    Name: セテス
    Group: 教会
  402:
    Name: フレン
    Group: 教会
  403:
    Name: ハンネマン
    Group: 教会
  404:
    Name: マヌエラ
    Group: 教会
  405:
    Name: ギルベルト
    Group: 青獅子
  406:
    Name: アロイス
    Group: 教会
  407:
    Name: カトリーヌ
    Group: 教会
  408:
    Name: シャミア
    Group: 教会
  409:
    Name: ツィリル
    Group: 教会
  410:
    Name: レア
    Group: 教会
  501:
    Name: イエリッツァ
    Group: 黒鷲
  502:
    Name: アンナ
    Group: DLC
  503:
    Name: ユーリス
    Group: DLC
  504:
    Name: バルタザール
    Group: DLC
  505:
    Name: コンスタンツェ
    Group: DLC
  506:
    Name: ハピ
    Group: DLC
    `
  };
}
