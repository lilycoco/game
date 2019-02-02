
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
    [[1,1], //0
    [1,1]], 

    [[1,1], //1
    [1,1]], 

    [[1,1], //2
    [1,1]], 

    [[1,1], //3
    [1,1]], 
    
    //2: 
    [[1,1], //4
    [0,1],
    [0,1]],

    [[0,0,1], //5
    [1,1,1]],

    [[1,0], //6
    [1,0],
    [1,1]],

    [[1,1,1], //7
    [1,0,0]],
    
    //3: 
    [[1,1], //8
    [1,0],
    [1,0]],

    [[1,1,1], //9
    [0,0,1]],

    [[0,1], //10
    [0,1],
    [1,1]],

    [[1,0,0], //11
    [1,1,1]],

    //4:
    [[1,1,1,1]], //12

    [[1],//13
    [1],
    [1],
    [1]],

    [[1,1,1,1]], //14

    [[1],//15
    [1],
    [1],
    [1]],

    //5:
    [[0,1,0], //16
    [1,1,1]],

    [[1,0], //17
    [1,1],
    [1,0]],

    [[1,1,1], //18
    [0,1,0]],

    [[0,1], //19
    [1,1],
    [0,1]],

    //6:
    [[0,1], //20
      [1,1],
      [1,0]],

      [[1,1,0], //21
      [0,1,1]],
      
      [[0,1], //22
      [1,1],
      [1,0]],

      [[1,1,0], //23
      [0,1,1]],

    //7:
    [[1,0], //24
      [1,1],
      [0,1]],

      [[0,1,1], //25
      [1,1,0]],

      [[1,0], //26
      [1,1],
      [0,1]],

      [[0,1,1], //27
      [1,1,0]],

  ];
  console.log(tetris);
    
  function playSound1() {
    let audio1 = new Audio();
    audio1.src = "sound/punch-swing1.mp3";
    audio1.play();
  }
  function playSound2(){
    let audio2 = new Audio();
    audio2.src = "sound/magic-worp1.mp3"; 
    audio2.play();
  }
  function playSound3() {
    let audio3 = new Audio();
    audio3.src = "sound/matchstick-put-fire1.mp3";
    audio3.play();
  }
  function resetBoard() {
    $("#boardArea").empty();
      drawBoard();
  }
  //テトリスの色の配列
  let colors = ["navy","darkmagenta","orangered","yellow","deeppink","limegreen"];
  let color = Math.floor(Math.random()*5);
  
  //テトリスの形
  let block = Math.floor(Math.random()*27); //テトリスランダム表示
  let wid = 0; //テトリスの横の位置
  let len = 0; //テトリスの高さ

  //--------------------
  //  ボードを表示
  //--------------------
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

  function drawBoard(){
    let newBoard = $.extend(true, [], board); // board をディープコピー
    for(let row = 0; row < tetris[block].length; row++ ){
      for(let col = 0; col < tetris[block][row].length; col++ ){
        if(tetris[block][row][col] === 1) newBoard[row + len][col + wid + 4] = color + 1; // newBoard にtetrisを表示
      }
    }
    let boards="";
    for(let top = 0; top < newBoard.length; top++) {
      for(let left = 0; left < newBoard[top].length; left++) {
        boards += blockColor[newBoard[top][left]] + "</div>";   // 画面上に表示
      }
    }
    $("#boardArea").append(boards);
    blockClass.forEach((a, b) => $(a).css("backgroundColor",colors[b]))  // 色表示設定
  }

  //--------------------
  //  テトリスが落ちる処理
  //--------------------
  let flug = true;

  function flow(){
    for(let row = 0; row < tetris[block].length; row++){
      for(let col = 0; col < tetris[block][row].length; col++){
        //ボードに転写
        if(tetris[block].length + len === 20 || //一番下に着いた時
           (tetris[block][row][col] === 1 && board[row + len + 1][col + wid + 4] !==0 )) { //一つ下にtetrisがある時
          for(let row = 0; row < tetris[block].length; row++) {
            for(let col = 0; col < tetris[block][row].length; col++) {
              if(tetris[block][row][col] === 1) {
                playSound3();
                board[row + len][col + wid + 4] = color + 1 ;
                if(row + len < 1) flug = false; // alert("GAME OVER");
              }
            }
          }
          wid -= wid; //元の位置にtetrisを戻す
          len -= len;
          block < 23 ? block += 4 : block -= 23; //形変更
          color < 5 ? color += 1 : color -= 5; //色変更
        }
      }
    }
    if(tetris[block].length +len < 20) {
      len++; //下に落ちる
    }
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
        !(block === 3 ||block === 7 ||block === 11 ||block === 15||block === 19||block === 23)) {
            block += 1;
        }else if(block === 3 || block===7 || block===11 ||block===15 ||block===19 ||block===23 ||block===27){
            block -= 3;
        }
        playSound1();
        resetBoard();
      }
    for(let row = 0; row < tetris[block].length; row++){
      for(let col = 0; col < tetris[block][row].length; col++){
        if(tetris[block][row][col] === 1){ //テトリスの形
          if(
            (e.which === 40 && board[row + len + 1][col + wid + 4] !== 0)|| //下へ移動 一つ下にテトリスがある時
            (e.which === 39 && board[row + len][col + wid + 5] !== 0)||  //右へ移動 一つ右にテトリスがある時
            (e.which === 37 && board[row + len][col + wid + 3] !== 0)) return;  //左へ移動 一つ左にテトリスがある時
        }
      }  
    }
    if(e.which == 40 && tetris[block].length + len < 20) len += 1;
    if(e.which == 39 && tetris[block][0].length +wid < 6) wid += 1;
    if(e.which == 37 && wid >-4) wid -= 1;
      resetBoard();
  });

  //--------------------
  //  テトリスが揃った行を消す処理
  //--------------------
  function deleteRow(){
    willDeleteRow=[];
    for(let t = 0; t < board.length; t++){
      for(let l = 0; l < board[t].length; l++){
        if(board[t][0] !== 0 &&
           board[t][1] !== 0 &&
           board[t][2] !== 0 &&
           board[t][3] !== 0 &&
           board[t][4] !== 0 &&
           board[t][5] !== 0 &&
           board[t][6] !== 0 &&
           board[t][7] !== 0 &&
           board[t][8] !== 0 &&
           board[t][9] !== 0 ) willDeleteRow.push(t);
           
        if(willDeleteRow.length > 0) {
          for(t = board.length - 1; t >= 0; t--) {
            if(t - willDeleteRow.length > 0 && willDeleteRow >= t) {
              board[t] = board[t - willDeleteRow.length];
              playSound2();
            }
          }
        }
      }
    }
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
  
