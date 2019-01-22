
  //ボードの配列
  document.write("<script type='text/javascript' src='include.js'></script>");
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
  function drawBoard(){
    let newBoard = $.extend(true,[],board); // board をディープコピー
    // newBoard にtetrisを表示
    for(let row=0; row<tetris[block].length; row++ ){
      for(let col=0; col<tetris[block][row].length; col++ ){
        if( tetris[block][row][col] === 1 ){
          newBoard[row + len][col + wid + 4] = color + 1;
        }
      }
    }
    // 画面上に表示
    let boards="";
    for(let top = 0; top < newBoard.length; top++){
      for(let left = 0; left < newBoard[top].length; left++){
        const newB = newBoard[top][left];
        if( newB === 0 ){
          boards += "<div class='noColor'>"
        }else if( newB === 1 ){
          boards += "<div class='color0'>"
        }else if( newB === 2 ){
          boards += "<div class='color1'>"
        }else if( newB === 3 ){
          boards += "<div class='color2'>"
        }else if( newB === 4 ){
          boards += "<div class='color3'>"
        }else if( newB === 5 ){
          boards += "<div class='color4'>"
        }else if( newB === 6 ){
          boards += "<div class='color5'>"
        }
        // boards += newBoard[top][left];
        boards += "</div>"
      }
    }
    // 色表示設定
    $("#boardArea").append(boards);
    $(".color0").css("backgroundColor",colors[0]);
    $(".color1").css("backgroundColor",colors[1]);
    $(".color2").css("backgroundColor",colors[2]);
    $(".color3").css("backgroundColor",colors[3]);
    $(".color4").css("backgroundColor",colors[4]);
    $(".color5").css("backgroundColor",colors[5]);
  }

  //--------------------
  //  テトリスが落ちる処理
  //--------------------
  let audio3 = new Audio();
  audio3.src = "sound/matchstick-put-fire1.mp3";

  function flow(){
    for(let row=0; row<tetris[block].length; row++){
      for(let col=0; col<tetris[block][row].length; col++){
        //ボードに転写
        if((tetris[block].length +len === 20) || //一番下に着いた時
          ((tetris[block][row][col]===1) &&
          (board[ row + len + 1 ][ col + wid + 4 ] !==0 ))){ //一つ下にtetrisがある時
          for(let row = 0; row < tetris[block].length; row++){
            for(let col = 0; col < tetris[block][row].length; col++){
              if(tetris[block][row][col] === 1){
                audio3.play();
                board[ row + len][col  + wid + 4] = color + 1 ;
                if(row + len <1){
                  alert("GAME OVER");
                }
              }
            }
          }
          //元の位置にtetrisを戻す
          wid -= wid; 
          len -= len;

          //形変更
          if( block < 23 ){ block += 4; }else{ block -= 23; }
          
          //色変更
          if( color < 5 ){ color += 1; }else{ color -= 5; }
        }
      }
    }
    if(tetris[block].length +len < 20){
      len++; //下に落ちる
    }
    $("#boardArea").empty();
    drawBoard();
    deleteRow();
  }
  setInterval(flow,500);

  //--------------------
  //  キーボート操作
  //--------------------  
  let audio1 = new Audio();
  audio1.src = "sound/punch-swing1.mp3";
  
  $("html").keydown(function(e){
    //回転
    if(e.which == 13){ 
      if((block >= 0 && block < 3) ||
        (block >= 4 && block < 7) ||
        (block >= 8 && block < 11) ||
        (block >= 12 && block < 15) ||
        (block >= 16 && block < 19) ||
        (block >= 20 && block < 23) ||
        (block >= 24 && block < 27)) {
          block += 1;
        }else if(block===3 || block===7 || block===11 ||block===15 ||block===19 ||block===23 ||block===27){
          block -= 3;
        }
        audio1.play();
        $("#boardArea").empty();
        drawBoard();
      }
    
      for(let row=0; row<tetris[block].length; row++){
        for(let col=0; col<tetris[block][row].length; col++){
          if(tetris[block][row][col]===1){//テトリスの形
            if((e.which === 40)&&(board[ row + len +1][col + wid + 4] !==0 )||//下へ移動//一つ下にテトリスがある時
              (e.which == 39)&&(board[row + len][col + wid + 5] !==0 )||// //右へ移動一つ右にテトリスがある時
              (e.which == 37)&&(board[row + len][col + wid + 3] !==0 )){////左へ移動一つ左にテトリスがある時
              return;
            }
          }
        }
      }
      if((e.which === 40)&&(tetris[block].length +len < 20)){
          len+=1;
          $("#boardArea").empty();
          drawBoard();
      }else if((e.which == 39)&&(tetris[block][0].length +wid < 6)){
          wid += 1;
          $("#boardArea").empty();
          drawBoard();
      }else if((e.which == 37)&&(wid >-4)){
          wid -= 1;
          $("#boardArea").empty();
          drawBoard();
      }
  });

  //--------------------
  //  テトリスが揃った行を消す処理
  //--------------------
  let audio2 = new Audio();
  audio2.src = "sound/magic-worp1.mp3"; 

  function deleteRow(){
    willDeleteRow=[];
    for(let top=0; top<board.length; top++){
      for(let left=0; left<board[top].length; left++){
        if(( board[top][0] !== 0 ) &&
          ( board[top][1] !== 0 ) &&
          ( board[top][2] !== 0 ) &&
          ( board[top][3] !== 0 ) &&
          ( board[top][4] !== 0 ) &&
          ( board[top][5] !== 0 ) &&
          ( board[top][6] !== 0 ) &&
          ( board[top][7] !== 0 ) &&
          ( board[top][8] !== 0 ) &&
          ( board[top][9] !== 0 )){
        // if(board[top].indexOf(0)===0){
        // } 
            willDeleteRow.push(top);
        }
        if(willDeleteRow.length > 0){
          for(let top = board.length-1; top >= 0; top--){
            if((top-willDeleteRow.length > 0))
            if(willDeleteRow >= top){
              board[top]=board[top-willDeleteRow.length];
              audio2.play();
            }
              // else{
              //   board[top]=board[willDeleteRow];
              // }      
          }
        }
      }
    }
  }

  //--------------------
  //  Windows立ち上げ時処理
  //--------------------
  $(window).on("load",function(){
    drawBoard();
  });
  
