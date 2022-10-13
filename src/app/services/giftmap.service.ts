import { Injectable } from '@angular/core';
import { Item } from 'src/app/transaction/item';

@Injectable({
  providedIn: 'root',
})
export class GiftMapService {
  items: Item[] = [];

  constructor() {}

  load(): void {
    const yaml = require('js-yaml');

    // Get document, or throw exception on error
    try {
      const doc = yaml.load(this.mockData());
      console.log(doc);

      const list = doc.Gift
      this.items = Object.keys(list).map((elm) => {
        return { id: elm, name: list[elm].Name, like: list[elm].Likes, dislike: list[elm].Dislikes };
      });

    } catch (e) {
      console.log(e);
    }
  }

  searchUnitItem(id: string) {
    // const obj = this.items.reduce((obj, elm) => {
    //   elm.like.some(value => value === id) ? Object.assign(obj, {[elm.id]:"○"}) : {};
    // }, {});
    console.log(`Method: searchUnitItem, Begin, Param[ id => ${id}]`);
    const obj = {};
    this.items.forEach(elm => {
      if (elm.like.some(value => value == id)) {
        var a = Object.assign(obj, {[elm.id]:"○"});
      }
      if (elm.dislike.some(value => value == id)){
        Object.assign(obj, {[elm.id]:"×"});
      }
    });
    return obj;
  };

  mockData(): string {
    return `
Gift:
  IM10101:
    Name: 美しい切り花
    Likes:
      - 202
      - 302
      - 306
      - 406
    Dislikes:
      - 105
      - 107
      - 205
  IM10102:
    Name: 美味しい焼き菓子
    Likes:
      - 104
      - 204
      - 206
      - 303
      - 305
      - 402
      - 501
      - 503
      - 506
    Dislikes:
      - 405
  IM10103:
    Name: 燻製肉
    Likes:
      - 105
      - 108
      - 203
      - 208
      - 303
      - 409
      - 506
    Dislikes:
      - 306
      - 404
      - 502
  IM10304:
    Name: じょうろ
    Likes:
      - 106
      - 202
      - 409
    Dislikes:
      - 205
      - 302
      - 504
  IM10305:
    Name: 素敵なハンカチ
    Likes:
      - 106
      - 205
      - 306
      - 307
      - 401
      - 402
      - 403
    Dislikes:
      - 405
  IM10506:
    Name: クマの人形
    Likes:
      - 101
      - 106
      - 206
      - 305
      - 306
      - 307
      - 402
    Dislikes:
      - 201
      - 203
      - 302
      - 407
      - 504
  IM10507:
    Name: 乗馬用の靴
    Likes:
      - 103
      - 201
      - 208
      - 301
    Dislikes:
      - 206
      - 404
      - 503
  IM10508:
    Name: 騎士道物語
    Likes:
      - 204
      - 208
      - 407
    Dislikes:
      - 102
      - 203
      - 305
      - 307
      - 401
      - 409
      - 506
  IM10509:
    Name: 木彫りの女神像
    Likes:
      - 206
      - 304
      - 404
      - 405
      - 410
      - 502
      - 503
    Dislikes:
      - 101
      - 107
  IM11010:
    Name: 飾り剣
    Likes:
      - 201
      - 203
      - 304
      - 405
      - 504
    Dislikes:
      - 101
      - 106
      - 207
  IM11011:
    Name: テフ豆
    Likes:
      - 102
      - 408
      - 502
      - 506
    Dislikes:
      - 103
      - 207
      - 305
  IM20101:
    Name: 釣り用のウキ
    Likes:
      - 104
      - 308
      - 401
      - 405
      - 406
    Dislikes:
      - 105
      - 502
      - 504
  IM20102:
    Name: 装飾用の輝石
    Likes:
      - 107
      - 206
      - 307
      - 404
    Dislikes:
      - 102
      - 201
      - 208
      - 407
  IM20303:
    Name: 狩猟用の短剣
    Likes:
      - 105
      - 108
      - 203
      - 308
      - 408
      - 409
      - 501
      - 506
    Dislikes:
      - 104
      - 106
      - 207
      - 302
      - 306
  IM20304:
    Name: 刃物用の砥石
    Likes:
      - 103
      - 105
      - 201
      - 407
      - 501
      - 504
    Dislikes:
      - 206
      - 402
  IM20305:
    Name: おしゃれな髪飾り
    Likes:
      - 107
      - 207
      - 307
      - 402
    Dislikes:
      - 208
      - 308
  IM20506:
    Name: 訓練用の重し
    Likes:
      - 105
      - 201
      - 203
      - 303
      - 308
      - 407
    Dislikes:
      - 104
      - 106
      - 304
      - 305
      - 307
      - 506
  IM20507:
    Name: 紅茶の茶葉
    Likes:
      - 103
      - 302
      - 403
      - 505
    Dislikes: []
  IM21008:
    Name: 異国の香辛料
    Likes:
      - 108
      - 202
      - 204
      - 301
      - 408
      - 502
      - 506
    Dislikes:
      - 403
      - 406
      - 410
      - 505
  IM21009:
    Name: 盤面遊戯
    Likes:
      - 101
      - 102
      - 205
      - 301
      - 503
    Dislikes:
      - 204
      - 404
  IM30501:
    Name: 楽譜集
    Likes:
      - 106
      - 107
      - 207
      - 302
      - 307
      - 404
      - 408
    Dislikes:
      - 201
      - 202
      - 301
      - 503
  IM30502:
    Name: 算術教本
    Likes:
      - 207
      - 305
      - 403
      - 503
      - 505
    Dislikes:
      - 108
      - 204
      - 303
      - 407
  IM30503:
    Name: フォドラの史書
    Likes:
      - 102
      - 401
    Dislikes:
      - 202
      - 409
  IM30504:
    Name: 帝王学の書
    Likes:
      - 101
    Dislikes:
      - 204
      - 304
      - 406
      - 408
      - 409
      - 501
      - 506
  IM30505:
    Name: 古代の硬貨
    Likes:
      - 204
      - 304
      - 406
      - 410
      - 504
    Dislikes:
      - 206
      - 307
  IM31006:
    Name: 紋章図解
    Likes:
      - 104
      - 301
      - 305
      - 403
      - 505
    Dislikes:
      - 108
      - 205
      - 303
      - 308
      - 401
      - 408
      - 501
  IM31007:
    Name: 青カビチーズ
    Likes:
      - 303
      - 404
      - 407
      - 502
      - 504
    Dislikes:
      - 103
      - 301
      - 402
      - 403
      - 408
      - 501
      - 505
  IM31008:
    Name: 綺麗な風景画
    Likes:
      - 106
      - 205
      - 304
      - 410
      - 502
    Dislikes:
      - 102
  IM90001:
    Name: ウツボカズラ
    Likes:
      - 106
      - 506
    Dislikes: []
  IM90002:
    Name: 向日葵
    Likes:
      - 108
      - 406
      - 408
    Dislikes: []
  IM90003:
    Name: スミレ
    Likes:
      - 204
    Dislikes: []
  IM90004:
    Name: ラベンダー
    Likes:
      - 206
    Dislikes: []
  IM90005:
    Name: 水仙
    Likes: []
    Dislikes: []
  IM90006:
    Name: 薔薇
    Likes:
      - 302
      - 501
    Dislikes: []
  IM90007:
    Name: 勿忘草
    Likes:
      - 304
      - 402
      - 502
    Dislikes: []
  IM90008:
    Name: 百合
    Likes:
      - 305
    Dislikes: []
  IM90009:
    Name: 鈴蘭
    Likes:
      - 306
      - 505
    Dislikes: []
  IM90010:
    Name: カスミソウ
    Likes:
      - 409
    Dislikes: []
  IM90011:
    Name: アネモネ
    Likes:
      - 307
    Dislikes: []
  IM90012:
    Name: カーネーション
    Likes:
      - 101
    Dislikes: []
  `;
  }
}
