// EUの旗を描いてみよう
function setup(){
  createCanvas(200, 200);
  background(0,0,100);
  noStroke();
  for(let i = 0; i < 12; i++){
    const theta = TWO_PI * i / 12;
    const x = 100 + cos(theta) * 50;
    const y = 100 + sin(theta) * 50;
    star(x, y, 10);
  }
}

// BLANK[1] ヒント：star 関数をここにコピーして、 draw 内で ellipse の代わりに使おう
function star(cx, cy, r){
  beginShape();    // 点つなぎを始める
  for(let i = 0; i < 5; i++){
    //頂点の角度を計算
    const theta = TWO_PI * i * 2 / 5 - HALF_PI;
    //頂点のX座標を計算
    const x = cx + cos(theta) * r;
    //頂点のY座標を計算
    const y = cy + sin(theta) * r;
    vertex(x, y);  // 次につなぐ点を１つ増やす
  }
  endShape(CLOSE); // 点つなぎを終わる
}