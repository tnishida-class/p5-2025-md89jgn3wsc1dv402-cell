// 吹き出し
function setup(){
  createCanvas(400, 400);
  textSize(16);
}

function draw(){
  background(220);
  balloon("関数は難しい？", 100, 100);
  balloon("関数は便利？", mouseX, mouseY);
}

function balloon(t, x, y){
  const w = textWidth(t); // テキストの幅
  const h = textAscent() + textDescent(); // テキストの高さ
  const p = 4; // 余白の大きさ (padding)

  const rectW = w + p * 2; // 矩形の幅
  const rectH = h + p * 2; // 矩形の高さ

  push();

  // BLANK[1] 吹き出しの背景を先に描く
  fill(20,70,70); 
  noStroke();
  rect(x, y, rectW, rectH, 8); //xy横幅高さ丸み度
	

  // BLANK[2] 吹き出しの三角形を描く
  fill(20,70,70);
  triangle(
    x + rectW - p*2, y + rectH,      // 左上
    x + rectW - p/2, y + rectH - 30, // 右上
    x + rectW,       y + rectH + 15  // 下
  );

  // 吹き出しのテキストを次に描く
  textAlign(LEFT, CENTER);
  fill(255);
  text(t, x + p, y + h / 2 + p); //文字xy
  
  pop();
}