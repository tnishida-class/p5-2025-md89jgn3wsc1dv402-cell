// チェッカー
function setup() {
  createCanvas(40, 100);
  fill(100);
  const size = width / 8; // マスの一辺の長さ
  noStroke();
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      // BLANK[1] ヒント： rectのx座標は size * i, y座標は size * j

      if(j % 2 == 0){ 
      rect(5+i * 10, j * 5, 5, 5);
      }
      else{
      rect( i * 10, j * 5, 5, 5);
      }
    }
  }

  fill(255, 0, 0);
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 3; j++){
      if(j % 2 == 0){ 
      ellipse(7.5+i * 10, 2.5+j * 5, 4, 4);
      }
      else{
      ellipse( 2.5+i * 10, 2.5+j * 5, 4, 4);

      }
    }
  }

  fill(0, 0, 0);
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 3; j++){
      if(j % 2 == 0){ 
      ellipse(2.5+i * 10, 27.5+j * 5, 4, 4);
      }
      else{
      ellipse( 7.5+i * 10, 27.5+j * 5, 4, 4);

      }
    }
  }
}