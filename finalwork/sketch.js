function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


// 1. クラス名（必ず大文字で始める）
class PLAYer {
  
  // 2. コンストラクタ（誕生した瞬間に1回だけ実行される設定）
  constructor() {
    // this.〇〇 = 「自分自身の〇〇」という意味
    this.x = width / 6;
    this.y = height - ground - size / 2;
    this.size =  height * 0.1;
    this.vy = 0;
    // 他にも色や速度など、そのモノが持つ「情報」は全部ここに書く
  }

  // 3. メソッド（動きや計算などのアクション）
  update() {
    this.y += this.vy;
    this.onDai = false

    //台判定
    for (let dai of dais) { 
     if (
      this.vy >= 0 &&  //落ちてる時
      this.y + size/2 >= dai.y && this.y + size/2 <= dai.y + 20 //高さピタリ
      ){
       this.vy = 0;
       this.y = dai.y - size/2;
       this.onDai= true;
       }
    }
    if(!this.onDai){
     if(this.y < height - ground - size / 2){ // 地面より上、つまり空中にいる
      this.vy += g; // 下方向に重力の影響で加速する
     }
     else{
     this.vy = 0;
     this.y = height - ground - size / 2;
     }
    }
  }

  show() {
    // p5.jsの描画関数をここに書く
    fill(255,255,0)
    ellipse(this.x, this.y, size, size);
  }

  // 4. メソッド（描画のアクション）
  jump(){
    if(this.y >= height - ground - size / 2||this.onDai==true) // 地面にいるまたはonGroundときだけジャンプできる
      this.vy = -jump; 
  }

  down(){
    if(this.onDai == true) {
      this.y += 25;
  }

  }
}


class Obstacle{
    constructor(){
      this.x= width;       
      this.vx= random(-12, -4);      
      this.size= 10;                
      let r = floor(random(dais.length + 2));
      this.y = 530 + r * 100
    }
    show(){
      fill(255,0,0);
      ellipse(this.x, this.y, size, size);
    }
    update(){
      this.x+=this.vx;
    }
}

class DAI{
   constructor(x,y,w){
    this.x=x
    this.y=y
    this.w=w
    this.h=10
   }
   show(){
    fill(60,60,80)
    rect(this.x,this.y,this.w,this.h)
   }
}

//子クラス
class Tabako extends Obstacle{
  constructor(){
    super()
    this.vx=-5
  }
  show() {
    fill(255);
    noStroke();
    rect(this.x, this.y - 5, 20, 6);
    fill(255, 100, 0); 
    rect(this.x + 18, this.y - 5, 4, 6); 
  }
}














//以下はレシピにあったジャンプをスペースジャンプに変え、ジャンプ力を調整したもの
let player,dai
let score=0
let stress=0
let dais=[]
let obstacles=[]
let tabakos=[]
let lifeObstacle=[] //当たったobstacleを入れる
const g = 1;     // 重力（いろいろな値を試してみましょう）
const jump = 15; // ジャンプ力（いろいろな値を試してみましょう）
const ground = 20;
const size = 20;
let x, y, vy;
let jyoutai=[] //1つ入ったらスタート、2つ入ったらゲームオーバー
const DAIX = 50;   // 台の左端
const DAIW = 300;  // 台の幅
const DAIH = 850;  // 台の高さ（y座標）

//初期条件（コンストラクタはここで起こす）
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new PLAYer();
  for(let i = 0; i < 3; i++){
    let d = new DAI(DAIX, 650 + i * 100, DAIW);
    dais.push(d);
  }
}

//更新し続ける（メソッドはこれ以降）
function draw() {
  background(0);
  let gy = height - ground;
  // 地面を描く(課題3-2より)
  const groundY = height * 0.8;
  fill(30);
  rect(0, gy, width, gy);

  //スタート画面
  if(jyoutai.length==0){
    fill(255);
    textSize(40);
    text("スペースで始める", windowWidth/2.5, windowHeight/2);
    textSize(20);
    fill(255, 0, 0);
    text("全画面でプレイしてください", 0.845*windowWidth/2, 2.8*windowHeight/5);
  }

  //play中
  if(jyoutai.length==1){
   score += 1; 
   //スコアの表示
   fill(255);
   noStroke();
   textSize(24); 
   text("SCORE:"+score,width-300, 25);

   // ライフ表示（左上）
   text("LIFE:" + (3-lifeObstacle.length) + "/3", 20, 30);

   //ストレス値
   stress += 0.07;
   if (stress >= 100) {
     jyoutai.push(g); 
   }
   // ストレスゲージ描画
   fill(255);
   text("STRESS", 20, 70);
   noFill();
   stroke(255);
   rect(120, 50, 200, 20); // 枠
   noStroke();
   fill(255, 50, 50); // 赤いバー
   // ストレス量に合わせて幅を変える
   let barWidth = map(stress, 0, 100, 0, 200);
   rect(120, 50, barWidth, 20);

   //player
   player.update(); // 計算
   player.show();   // 表示

   //台
   for(let d of dais){
     d.show();
   }

   //obstacle(課題4-3を参考)
   if(frameCount % 15 === 0) { // 20フレームごとに新しい的を追加する
     obstacle = new Obstacle()
     obstacles.push(obstacle)
   }
   //画面外の障害物と当たった障害物を配列から消す
   const activeObstacles = []; // 画面内の障害物を一時的に保持する配列
   for(let i = 0; i < obstacles.length; i++){
    let o = obstacles[i];
    let p = player;
    let hit =false
    o.update();
    o.show();
    if (dist(o.x, o.y, p.x, p.y) < o.size / 2 + p.size / 2) {
          hit = true; //課題4-3にはbreakがあったがそれはballが複数個あって1つ当たったなら他のballを見る必要がないからあった。今回はplayer1人なので要らない
        }
    if(!hit && o.x + o.size > 0) activeObstacles.push(o); // 衝突していなければ生き残る
    if(hit) lifeObstacle.push(o);
   }
   obstacles = activeObstacles; // 生き残った障害物だけを残す

   //障害物に3回当たったらゲームが止まるように
   if(lifeObstacle.length>=3){
     jyoutai.push(g)
    }

   //タバコ（ほぼObstacle）
   if(frameCount % 250 === 0) { // 20フレームごとに新しい的を追加する
     tabako = new Tabako()
     tabakos.push(tabako)
   }
   //画面外のタバコと当たったタバコを配列から消す
   const activetabakos = []; // 画面内の障害物を一時的に保持する配列
   for(let i = 0; i < tabakos.length; i++){
    let t = tabakos[i];
    let p = player;
    let hit =false
    t.update();
    t.show();
    if (dist(t.x, t.y, p.x, p.y) < t.size / 2 + p.size / 2) {
          hit = true; //課題4-3にはbreakがあったがそれはballが複数個あって1つ当たったなら他のballを見る必要がないからあった。今回はplayer1人なので要らない
          if(stress<=30){
            stress=0
          }
          else{
            stress -=30
          }
        }
    if(!hit && t.x + t.size > 0) activetabakos.push(t); // 衝突していなければ生き残る
   }
   tabakos = activetabakos; // 生き残った障害物だけを残す
  }

  

  //gameover
  if(jyoutai.length==2){
     fill(255, 50, 50);
     textSize(70);
     text("GAME OVER", windowWidth/2.5, windowHeight/2);
     fill(255)
     textSize(35);
     text("スペースでリスタート", 20+windowWidth/2.5, 50+windowHeight/2);
  }

  //リセット
  if(jyoutai.length>=3){
    lifeObstacle=[]
    obstacles = [];
    jyoutai=[]
    score=0
    player= new PLAYer
    stress=0
    tabakos=[]
  }
   
}

//画面変更とジャンプ、down用
function keyPressed(){
  if (key == " ") {
    if (jyoutai.length == 0||jyoutai.length == 2) {
      jyoutai.push(g); 
    }
    else if (jyoutai.length == 1) {
      player.jump();
    }
  }
  if (key == "d") {
    if (jyoutai.length == 1) {
      player.down();
    }
  }
}



