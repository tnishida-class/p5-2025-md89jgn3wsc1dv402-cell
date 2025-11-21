// 折れ線グラフ
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }

  // 横線を引く
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  // ここからが本番
  fill(0);
  const dx = width / scores.length;
  let px, py; // 線を引くために一つ前の点を覚えておく変数
  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length;
    const h = height * scores[i] / 100;

    const x = dx * i;
    const y = height - (height * scores[i] / 100); // Y座標は上下反転
    
    ellipse(x, y, 8, 8);
    
    // 2つ目以降の点の場合、一つ前の点から現在の点まで線を引く
    if (i > 0) {
      line(px, py, x, y);
    }
    

    // 現在の点の座標を「一つ前の点」として保存する
    px = x;
    py = y;

  }
}
