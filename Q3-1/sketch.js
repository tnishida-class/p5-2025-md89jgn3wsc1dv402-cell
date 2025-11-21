// 心臓の鼓動のようなアニメーション
const cycle = 100; // 1周期のフレーム数
let count; // 何フレーム目か

function setup(){
  createCanvas(200, 200);
  count = 0;
}


function draw() {
  background(160, 192, 255);
  count = (count + 1) % cycle; //countは一生増えるので100で割った余りで考える
  if (keyIsPressed) {
    count = (count + 2) % cycle; //キーボを押している間は+2なので動きは早く見える
  }
  if (count < cycle / 2) {
    size = 50 + cycle - count;
  } else {
    size = 50 + count;
  }
  ellipse(width / 2, height / 2, size, size);
}




