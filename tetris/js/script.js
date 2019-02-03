
//ボードの配列
let board = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];
console.log(board);

//テトリスの配列
let tetris =[
  //1: 四角
  [[1,1], [1,1]], //0
  [[1,1], [1,1]], //1
  [[1,1], [1,1]], //2
  [[1,1], [1,1]], //3
  //2: 
  [[1,1], [0,1], [0,1]], //4
  [[0,0,1], [1,1,1]], //5
  [[1,0], [1,0],[1,1]], //6
  [[1,1,1], [1,0,0]], //7
  //3: 
  [[1,1], [1,0], [1,0]], //8
  [[1,1,1], [0,0,1]], //9
  [[0,1], [0,1], [1,1]], //10
  [[1,0,0], [1,1,1]], //11
  //4:
  [[1,1,1,1]], //12
  [[1], [1], [1], [1]], //13
  [[1,1,1,1]], //14
  [[1], [1], [1], [1]], //15
  //5:
  [[0,1,0], [1,1,1]],  //16
  [[1,0], [1,1], [1,0]], //17
  [[1,1,1], [0,1,0]], //18
  [[0,1], [1,1], [0,1]], //19
  //6:
  [[0,1], [1,1], [1,0]], //20
  [[1,1,0], [0,1,1]], //21
  [[0,1], [1,1], [1,0]], //22
  [[1,1,0], [0,1,1]], //23
  //7:
  [[1,0], [1,1], [0,1]], //24
  [[0,1,1], [1,1,0]], //25
  [[1,0], [1,1], [0,1]], //26
  [[0,1,1], [1,1,0]], //27
];
console.log(tetris);
  
function playSound1() {
  let audio1 = new Audio();
  audio1.src = "sound/punch-swing1.mp3";
  audio1.play();
}
let audio2 = new Audio();
audio2.src = "sound/magic-worp1.mp3"; 
function playSound3() {
  let audio3 = new Audio();
  audio3.src = "sound/matchstick-put-fire1.mp3";
  audio3.play();
}
function resetBoard() {
  $("#boardArea").empty();
    drawBoard();
}

let color = Math.floor(Math.random()*5);
const colors = [ //テトリスの色の配列
  "navy",
  "darkmagenta",
  "orangered",
  "yellow",
  "deeppink",
  "limegreen"
];
const blockColor = [
  "<div class='noColor'>",
  "<div class='color0'>",
  "<div class='color1'>",
  "<div class='color2'>",
  "<div class='color3'>",
  "<div class='color4'>",
  "<div class='color5'>",
]
const blockClass = [
  ".color0",
  ".color1",
  ".color2",
  ".color3",
  ".color4",
  ".color5",
] 

let block = Math.floor(Math.random()*27); //テトリスの形 ランダム表示
let wid = 0; //テトリスの横の位置
let len = 0; //テトリスの高さ

//--------------------
//  ボードを表示
//--------------------
function drawBoard(){
  let newBoard = $.extend(true, [], board); // board をディープコピー
  tetris[block].forEach((a, aa) => a.forEach((b, bb) =>{
    if(b === 1 ) newBoard[aa + len][bb + wid + 4] = color + 1; // newBoard にtetrisを表示
  }))

  let boards="";
  newBoard.forEach((a) => a.forEach((b) =>{
    boards += blockColor[b] + "</div>";   // 画面上に表示
  }))

  $("#boardArea").append(boards);
  blockClass.forEach((a, b) => $(a).css("backgroundColor",colors[b]))  // 色表示設定
}

//--------------------
//  テトリスが落ちる処理
//--------------------
let flug = true;
function flow(){
  tetris[block].forEach((a, aa, aaa) => a.forEach((b, bb) =>{
    //ボードに転写
    if(aaa.length + len === 20 || //一番下に着いた時
      (b === 1 && board[aa + len + 1][bb + wid + 4] !==0 )) { //一つ下にtetrisがある時
      tetris[block].forEach((t, tt) => t.forEach((l, ll)=>{
        if(l === 1) {
          playSound3();
          board[tt + len][ll + wid + 4] = color + 1 ;
          if(tt + len < 1) flug = false; // alert("GAME OVER");
        }
      }))
      wid -= wid; //元の位置にtetrisを戻す
      len -= len;
      block < 23 ? block += 4 : block -= 23; //形変更
      color < 5 ? color += 1 : color -= 5; //色変更
    }
  }))
  if(tetris[block].length + len < 20) len++; //下に落ちる
  resetBoard()
  deleteRow();
}

//--------------------
//   キーボート操作
//--------------------  

$("html").keydown(function(e){
  //回転
  if(e.which == 13){
    if((block >= 0 &&block < 27) &&
    !(block === 3 ||
      block === 7 ||
      block === 11 ||
      block === 15||
      block === 19||
      block === 23)) block += 1;
    else if(
      block === 3 ||
      block===7 ||
      block===11 ||
      block===15 ||
      block===19 ||
      block===23 ||
      block===27) block -= 3;
    playSound1();
    resetBoard();
  }

  let flug = true; 
  tetris[block].forEach((a, aa) => a.forEach((b, bb)=> {
    if((b === 1) && //テトリスの形
       ((e.which === 40 && board[aa + len + 1] && board[aa + len + 1][bb + wid + 4] !== 0)|| //下へ移動 一つ下にテトリスがある時
        (e.which === 39 && board[aa + len][bb + wid + 5] !== 0)||  //右へ移動 一つ右にテトリスがある時
        (e.which === 37 && board[aa + len][bb + wid + 3] !== 0))) flug = false;  //左へ移動 一つ左にテトリスがある時
  }))

  if(flug === true){
    if(e.which == 40 && tetris[block].length + len < 20) len += 1;
    if(e.which == 39 && tetris[block][0].length +wid < 6) wid += 1;
    if(e.which == 37 && wid >-4) wid -= 1;
    resetBoard();
  }
});

//--------------------
//  テトリスが揃った行を消す処理
//--------------------
function deleteRow(){
  willDeleteRow=[];
  board.forEach((a, aa) => a.forEach((b, bb) => {
    if(a[0] !== 0 &&
      a[1] !== 0 &&
      a[2] !== 0 &&
      a[3] !== 0 &&
      a[4] !== 0 &&
      a[5] !== 0 &&
      a[6] !== 0 &&
      a[7] !== 0 &&
      a[8] !== 0 &&
      a[9] !== 0 ) willDeleteRow.push(aa);
      
    if(willDeleteRow.length > 0) {
      for(t = board.length - 1; t >= 0; t--) {
        if(t - willDeleteRow.length > 0 && willDeleteRow >= t) {
          board[t] = board[t - willDeleteRow.length];
          audio2.play();
        }
      }
    }
  }))
}

//--------------------
//  動作処理
//--------------------
$(window).on("load",function(){
  drawBoard();
});
setInterval(function(){
  if(flug) flow();
}, 500);

