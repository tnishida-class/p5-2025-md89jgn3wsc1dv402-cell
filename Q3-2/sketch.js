// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;
const vyMax = 20;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  vy += g; // 重力は「速度の変化量」
  vy = constrain(vy, -vyMax, vyMax); // 速度が大きくなりすぎないように調整

  
  y = constrain(y, 0, height);

  // 位置を更新
  x += vx;
  y += vy;

  if (y  > groundY) {
    y = groundY ; // 地面の上に正確に乗せる
    vy = 0; // 縦方向の速度をリセット
  }
  
  if (keyIsDown(LEFT_ARROW)) {
    // 左キーが押されている場合、さらにダッシュキーも押されているかチェック
    if (keyIsDown("A".charCodeAt(0)) ) {
      x -= 10; // ダッシュ左移動
    } else {
      x -= 5; // 通常左移動
    }
  }
  
  else if (keyIsDown(RIGHT_ARROW)) {
    // 右キーが押されている場合、さらにダッシュキーも押されているかチェック
    if (keyIsDown("A".charCodeAt(0))) {
      x += 10; // ダッシュ右移動
    } else {
      x += 5; // 通常右移動
    }
  }


  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}



function keyPressed(){
  if(key == " "){
    if(vy==0){vy=-15}
  }
  
}

