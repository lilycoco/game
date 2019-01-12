    // canvas base
    const can =$("#canvas")[0];
    const ctx = can.getContext("2d");
    
    /*---------------------------
     * ufoについて
     *--------------------------*/

    const ufo={
        posX:can.width/2,
        posY:can.height-40,
        flag:false,
        img:"images/space-invaders (4).png",
        // width:this.width
    };

    const ufoDraw=function(){
        const newImage=$("<img>").attr("src",ufo.img);
        newImage.on("load",function(){
        ufo.img=this;//ufoオブジェクトに画像データ追加
        ufo.width=this.width/2;//ufoオブジェクトに画像幅追加
        ufo.height=this.height/2;//ufoオブジェクトに画像高さ追加
         ctx.drawImage(this,ufo.posX,ufo.posY,ufo.width,ufo.height);
        console.log('ufo',ufo);
    });
    };

    $(window).on("load",function(){
        ufoDraw();
        // enemyDraw();
    })
    
    /*---------------------------
     * 敵について
     *--------------------------*/

    const srcs=[
        "images/space-invaders (2).png",
        "images/space-invaders (3).png",
        "images/space-invaders (6).png"
    ]

    // let images = [];

    // for (let i in srcs) {
    //     images[i] = new Image();
    //     images[i].src = srcs[i];
    //     images[i].onload=start;
    //     images[i].onload = start;
    // }

    // const enemy={
    //     posX:0,
    //     posY:0,
    //     flag:false,
    //     // width:srcs[0].width/2,
    //     // height:srcs[0].height/2
    //     img:"images/space-invaders (2).png"
    //     // img:images[i].srcs
    // };
  
    let imgCnt = 20;  // 描画する画像の数
    let aryImg = [];  // 画像の情報を格納
    let cvsw = can.width;   // canvasタグに指定したwidth
    let cvsh = can.height;   // canvasタグに指定したheight
    let imgW = 32;    // 画像の基本サイズ横幅
    let imgH = 32;  // 画像の基本サイズ立幅

     // 画像の読み込み
     let img = new Image();
     let u = Math.floor(Math.random()*3);
     img.src = srcs[u];
     img.onload = start;

    
    // 画像のパラメーターを設定
    function setImages(){
      for(let t = 0; t<imgCnt; t++){
        aryImg.push({
          posx: Math.floor(Math.random()*cvsw),    // 初期表示位置x
          posy: Math.floor(Math.random()*cvsh)-cvsh,// 初期表示位置y
        //   "posx":t*cvsw/imgCnt,   
          sizew: imgW,          // 画像の幅
          sizeh: imgH,          // 画像の高さ
        });
      }
    }
    
    // 描画、パラメーターの更新
    let enemySpeed =1;

    function flow(){
      ctx.clearRect(0,0,cvsw,cvsh);
      for(d = 0;d < imgCnt; d++){
        // if(aryImg[d].posx <0 || aryImg[d].posx>cvsw){
        //     enemySpeed = -enemySpeed;
        // }
        if(!aryImg[d]){
            return;
        };
        aryImg[d].posy += enemySpeed;
        ctx.drawImage(img, aryImg[d].posx, aryImg[d].posy, aryImg[d].sizew , aryImg[d].sizeh);
        // 範囲外に描画された画像を上に戻す
        if(aryImg[d].posy >= cvsh){
          aryImg[d].posy = 0 - aryImg[d].sizeh;
        }
      }
    }
    
    function start(){
      setImages();
      setInterval(flow,10);
    }


    // const enemyDraw=function(){
    //     const newImage=$("<img>").attr("src",enemy.img);
    //     newImage.on("load",function(){
    //     enemy.img=this;//ufoオブジェクトに画像データ追加
    //     enemy.width=this.width/2;//ufoオブジェクトに画像幅追加
    //     enemy.height=this.height/2;//ufoオブジェクトに画像高さ追加
    //     ctx.drawImage(this,enemy.posX,enemy.posY,enemy.width,enemy.height);
    //     console.log("enemy", enemy);
    //         }
    // )
    // };

    // ctx.drawImage("images/ufo.gif",0,100);
    // マウス動いたらufoを動かす関数
    const ufoMove=function(e){
        ctx.clearRect(ufo.posX,ufo.posY,ufo.width,ufo.height);//画像を消す
        // if(can.width >= ufo.posX){
            ufo.posX =e.offsetX;//新しいX座標を設定
        // };
        ctx.drawImage(ufo.img,ufo.posX,ufo.posY,ufo.width,ufo.height);
    }
     $(can).on("mousemove",ufoMove);

    // マウスアウトしたらUFOの動き止める
    const ufoStop = function(){
        ufo.flag = false;
    }

    /*---------------------------
     * ufoが発る射す弾について
     *--------------------------*/
        const ballData={
        speed:5,
        width:10,
        height:10,
        posX:0,
        posY:0,
        color:"#f00"
    }

    //発射された弾を格納するための配列を作成
    const ballGroup = [];

    // 新しい弾を発射する関数
    const shootBall=function(e){
        const newShootBall=Object.assign({},ballData);//もとのデータを書き換えない方法
        newShootBall.posY=can.height-ufo.height-40;
        newShootBall.posX=ufo.posX+(Math.ceil(ufo.width/2 - newShootBall.width/2));
        ctx.fillStyle=newShootBall.color;
        ctx.fillRect(newShootBall.posX, newShootBall.posY,newShootBall.width,newShootBall.height);
        ballGroup.push(newShootBall);
        console.log("newShootBall",newShootBall);
    }   

    let audio1;
    function PlaySound1() {
      audio1 = new Audio();
      audio1.src = "shot1.mp3";
      audio1.play();
    }

   $(can).on("mousedown",shootBall);
   $(can).on("mousedown",PlaySound1);

//    $(can).on("mousedown",function(){
//        PlaySound1();
//        shootBall();
//    });

    
    // 配列内の全ての弾の位置を移動させる
    // const moveBall=function(){
    //     for(let i=0;i<ballGroup.length;i++){               
    //         const ball =ballGroup[i];
    //         ctx.clearRect(ball.posX, ball.posY, ball.width, ball.height);
    //         ctx.fillStyle = ball.color;
    //         ball.posX += ball.speed;
    //         ctx.fillRect(ball.posX, ball.posY, ball.width, ball.height);           
    //     }
    // };

    const moveBall=function(){
        ballGroup.forEach(function(ball){ // 配列の中身一つ一つに、同じ命令を順番に行うことができる
            ctx.clearRect(ball.posX,ball.posY,ball.width,ball.height);
            ctx.fillStyle = ball.color;
            ball.posY -= ball.speed;//speedの分だけ標を足している
            ctx.fillRect(ball.posX, ball.posY, ball.width, ball.height);  
           
        });
    };
        setInterval(function(){
            moveBall();
            hitJudge();
        },10);

    // 配列内の全てのボールを精査して、canvasからスクリーンアウトしたら
    // 配列から該当の弾のデータを消去
        const deleteBall=function(){
        for(let i = 0; i < ballGroup.length; i++) {
            if (ballGroup[i].posX >= can.width) {
                ballGroup.splice(i,1);
            }
        }}

    /*---------------------------
     * 当たり判定
     *--------------------------*/

    let countUpValue = 0;

    let comment = $("#comment");

    function countUp(){
        countUpValue++;
        //カウンタの値を HTML 内の counter に表示
        if(countUpValue< 20){
            $("#count").html(countUpValue);
        }
        else{
            // alert("CLEAR");
            comment.html("CLEAR");
            clearInterval(timer);
            // $(function() {
            // comment.animate('marginTop','200px');
            // });
        }

        // console.log(countUpValue);
    }
    
    let audio2;
    function PlaySound2() {
      audio2 = new Audio();
      audio2.src = "slime1.mp3";
      audio2.play();
    }

    const hitJudge = function(){
        for(let k=0; k<ballGroup.length; k++){
        for(let d=0; d<aryImg.length; d++){
            // console.log(ballGroup[k]);
            if(!ballGroup[k]){
                return;
            };
          
            const ballLeft = ballGroup[k].posX;
            const ballRight = ballLeft + ballGroup[k].width;
            const ballTop = ballGroup[k].posY;
            const ballBottom = ballTop + ballGroup[k].height;
     
            const enemyLeft = aryImg[d].posx;
            const enemyRight = aryImg[d].posx+aryImg[d].sizew;
            const enemyTop = aryImg[d].posy;
            const enemyBottom = enemyTop + aryImg[d].sizeh;

            if((ballRight >= enemyLeft) &&
               (ballTop <= enemyBottom) && 
               (ballLeft <= enemyRight)
              ){                    
                ctx.clearRect(ballLeft, ballTop, ballGroup[k].width, ballGroup[k].height);
                ctx.clearRect(enemyLeft, enemyTop, aryImg[d].width, aryImg[d].height);
                ballGroup.splice(k,1);  
                aryImg.splice(d,1);
                console.log("あたった");
                PlaySound2();
                countUp();
                
                // console.log(countUpValue);
                // console.log("ball",newShootBall);
              }
            }
        }  
    };

    /*---------------------------
     * Time Gage
     *--------------------------*/
    const time =$("#timegage")[0];
    const timectx = time.getContext("2d");
    console.log(time);
    const timegageData={
        speed:1,
        width:time.width,
        height:time.height,
        posX:0,
        posY:0,
        color:"#f00"
    };
    console.log(timegageData);

    const leftTime=function(t){
        timectx.clearRect(timegageData.posX, timegageData.posY,timegageData.width,timegageData.height);
        timectx.fillStyle=timegageData.color;
        if(timegageData.width>0){
            timegageData.width -= 1;

        }
        else{
            // alert("GAME OVER");
            comment.html("GAME OVER");
            comment.css("color","white")
            comment.css("white-space","nowrap")
            ufoStop();
        }
        

        timectx.fillRect(timegageData.posX, timegageData.posY,timegageData.width,timegageData.height);

        // ballGroup.push(newShootBall);

        console.log(timegageData.width);
    }

    $(window).on("load",function(){
        leftTime();
        },);

    const timer = setInterval(function(){
        leftTime();
    },30);

   










    /*---------------------------
     * ページ読み込み時の描画処理
     *--------------------------*/
    /*---------------------------
     * ゲームスタートしてからのループ処理(10)
     *--------------------------*/

    //UFOに位置移動に関するイベント追加


    //クリックしたら弾発射

