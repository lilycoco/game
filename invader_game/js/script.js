    // canvas base
    const can =$("#canvas")[0];
    const ctx = can.getContext("2d");

    // ctx.fillStyle="#f00";
    // ctx.strokeStyle="0ff";
    // let count = 20;
    // setInterval(function(){
    //     ctx.clearRect(count,count,20,20);
    //     count++;
    //     ctx.fillRect(count,count,20,20);
    // });
    
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
    
    /*---------------------------
     * 敵について
     *--------------------------*/

    const srcs=[
        "images/space-invaders (2).png",
        "images/space-invaders (3).png",
        "images/space-invaders (6).png"
    ]

    let images = [];

    for (let i in srcs) {
        images[i] = new Image();
        images[i].src = srcs[i];
        images[i].onload=start;
    }

    const enemy={
        posX:0,
        posY:0,
        flag:false,
        width:srcs[0].width/2,
        height:srcs[0].height/2
        // img:"images/space-invaders (2).png"
    };
  

    const imgCnt = 5;  // 描画する画像の数
    const aryImg = [];  // 画像の情報を格納


    function setImages(){
        for(let i =0; i<imgCnt; i++){
            aryImg.push({
                "posx": Math.random()*can.width,     // 初期表示位置x
                "posy": Math.random()*can.height,     // 初期表示位置y
                "sizew": enemy.width,          // 画像の横幅
                "sizeh": enemy.height,          // 画像の縦幅
            })
        }
    }

    // 描画、パラメーターの更新
    let d = 0;
    function flow(){
    ctx.clearRect(0,0,can.width,can.height);

    for(d = 0; d < imgCnt; d++){
        aryImg[d].posy += 1;
        ctx.drawImage(images[0], aryImg[d].posx, aryImg[d].posy, aryImg[d].sizew , aryImg[d].sizeh);
    // 範囲外に描画された画像を上に戻す
    if(aryImg[d].posy >= can.height){
      aryImg[d].posy = -aryImg[d].sizeh;
    }
  }
}
 
function start(){
  setImages();
  setInterval(flow,10);
}

    for (let i=0; i<images.length; i++) {
        images[i].addEventListener('load', function() {
                enemy.width=this.width/2;
                enemy.height=this.height/2
                // enemy.posX = 0;
                // enemy.posY = 0;
                let X=0;
                let Y=0;
                for (let j in images) {
                    ctx.drawImage(images[j], X, Y,enemy.width,enemy.height);
                    Y += 50;
                }
        }, false);
    }
    const posX=[];
    
    // let Count = 1;
    // for (let i in images) {
    //     images[i].addEventListener('load', function() {
    //         if (Count == images.length) {
    //             enemy.width=this.width/2;
    //             enemy.height=this.height/2
    //             // enemy.posX = 0;
    //             // enemy.posY = 0;
    //             let X=0;
    //             let Y=0;
    //             for (let j in images) {
    //                 ctx.drawImage(images[j], X, Y,enemy.width,enemy.height);
    //                 Y += 50;
    //             }
    //         }
    //         Count++;
    //     }, false);
    // }

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
    
    $(window).on("load",function(){
        ufoDraw();
        // enemyDraw();
    })

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

   $(can).on("mousedown",shootBall);
    
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
    const hitJudge = function(){
        for(let k=0; k<ballGroup.length; k++){
            const ballLeft = ballGroup[k].posX;
            const ballRight = ballLeft + ballGroup[k].width;
            const ballTop = ballGroup[k].posY;
            const ballBottom = ballTop + ballGroup[k].height;
            // for (let i in images) {
                // enemy.posX += 50;
            const enemyLeft = enemy.posX;
            const enemyRight = enemy.posX+enemy.width;
            const enemyTop = enemy.posY;
            const enemyBottom = enemyTop + enemy.height;

            if((ballRight >= enemyLeft) &&
               (ballTop <= enemyBottom) && 
               (ballLeft <= enemyRight)
              ){                    
                ctx.clearRect(ballLeft, ballTop, ballGroup[k].width, ballGroup[k].height);
                ctx.clearRect(enemyLeft, enemyTop, enemy.width, enemy.height);
                ballGroup.splice(k,1);  
                console.log("あたった");
                // console.log("ball",newShootBall);
              }
            // }
        }  
    };

    /*---------------------------
     * ページ読み込み時の描画処理
     *--------------------------*/
    /*---------------------------
     * ゲームスタートしてからのループ処理(10)
     *--------------------------*/

    //UFOに位置移動に関するイベント追加


    //クリックしたら弾発射

