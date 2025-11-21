// カレンダーを描画しよう
function setup(){
  createCanvas(200, 200);
  drawCalendar(2025, 10);
}

function drawCalendar(y, m){
  background(240);
  
  for(let i = 0; i < 7; i++){
    const x = i * width / 7 +(width / 14);
    const y = 20;
    //色付け
    if (i === 0){fill(255, 0, 0);}
    else if(i === 6){fill(0, 0, 255);}
    else {fill(0);}
    stroke(255);
    text(dayOfWeekAsString(i), x, y);
  }


  //dowはその月の1日が何曜日かの番号（日曜日が0）
  let dow = dayOfWeek(y, m, 1) ;
  //1セルごとの高さ
  const celH =(height - 30)/6
  //1セルごとの横幅
  const celW =width/7
  for(let d = 1; d <= daysInMonth(y, m); d++){
    retu=(dow+d-1)%7 //例えばdow(1日)が0(日曜日)なら3日は火曜日(+2したい)ためd-1
    gyou=Math.floor((dow+d-1)/7)//Math.floorは割った数値以下の最大整数

    // 座標を計算 (セルの中心)
    x = retu * celW + celW / 2;
    y = 30 + gyou * celH + celH / 2;

    // 要件4: 色分け
    if (retu == 0) {fill(255, 0, 0);} 
    else if (retu == 6) {fill(0, 0, 255);} 
    else {fill(0);} 

    text(d,x,y)
  }
}

//うるう年ですか？のやつ
function isLeapYear(y){
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}

// y年の日数を返す
function daysInYear(y){
  return isLeapYear(y) ? 366 : 365;
}

//月ごとの日数返します
function daysInMonth(y, m){
  if(m == 2){
    //isLeapYearがtrueなら29
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

//y年1月1日からy年m月d日までの合計日数
function dayOfYear(y, m, d){
  let count = 0;
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);
  }
  return count + d;
}

//曜日に対応する番号を返す関数
function dayOfWeek(y, m, d){
  // BLANK[2] hint: 曜日がわかる日からの経過日数を求め7の剰余を取る　たとえば1970年1月1日木曜日
  let totalDays = 0;
  //年を進める
  for (let year = 1970; year < y; year++) {
    totalDays += daysInYear(year);
  }

  //月を進める
  for (let month = 1; month < m; month++) {
    totalDays += daysInMonth(y, month);
  }

  //日にちを進める
  totalDays += d - 1; // (1日の場合は0日経過)

  return (totalDays + 4) % 7;
}

//曜日の数を日本語に変換
function dayOfWeekAsString(dow){
  const a = ["日", "月", "火", "水", "木", "金", "土"];
  return a[dow];
}
