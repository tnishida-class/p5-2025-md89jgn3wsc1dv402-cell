// 配列の平均・最大・最小を求め、棒グラフを描く
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  // 合計を計算する
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);

  // ここから平均・最大・最小を求めます
  let average, largest, smallest;
  average = sum / scores.length;
  largest = 0;
  for(let i = 0; i < scores.length; i++){
     if(scores[i] > largest){
      largest = scores[i];
     }
  }
  smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if(scores[i] < smallest){
      smallest = scores[i];
    }
  }
 


  // ここから棒グラフを描いていきます。まずは背景に横線をn本引く
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }
  
  noStroke();

  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length; //キャンバスの全幅をデータの個数でわる
    const h = height * scores[i] / 100;
    if(scores[i] == largest){ fill(255, 0, 0); }
    else if(scores[i] == smallest){ fill(0, 0, 255); }
    else{ fill(128); }
    rect(i * dx + 2, height - h, dx - 4, h);//x座標,y,幅,高さ
    fill(0);
  }

  const ay = height - height * average / 100;
  stroke(0, 255, 0);
  line(0, ay, width, ay);
}