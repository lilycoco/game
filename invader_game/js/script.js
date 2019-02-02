const can =$("#canvas")[0];
const ctx = can.getContext("2d");
    
/*---------------------------
* ufoについて
*--------------------------*/

const ufo = {
    posX: can.width / 2,
    posY: can.height - 40,
    flag: false,
    img: "images/space-invaders (4).png",
};

const ufoDraw = function() {
    const newImage = $("<img>").attr("src",ufo.img);
    newImage.on("load",function() {
        ufo.img = this; //ufoオブジェクトに画像データ追加
        ufo.width = this.width/2;   //ufoオブジェクトに画像幅追加
        ufo.height = this.height/2; //ufoオブジェクトに画像高さ追加
        ctx.drawImage(this, ufo.posX, ufo.posY, ufo.width, ufo.height);
    });
};

$(window).on("load", ufoDraw);

// マウス動いたらufoを動かす関数
const ufoMove = function(e) {
    ctx.clearRect(ufo.posX, ufo.posY, ufo.width, ufo.height);//画像を消す
    ufo.posX = e.offsetX;//新しいX座標を設定
    ctx.drawImage(ufo.img, ufo.posX, ufo.posY, ufo.width, ufo.height);
}
$(can).on("mousemove", ufoMove);

// マウスアウトしたらUFOの動き止める
const ufoStop = function(){
    ufo.flag = false;
}

/*---------------------------
* 敵について
*--------------------------*/

const srcs=[
    "images/space-invaders (2).png",
    "images/space-invaders (3).png",
    "images/space-invaders (6).png"
]

let img = new Image(); // 画像の読み込み
let u = Math.floor(Math.random() * 3);
img.src = srcs[u];
img.onload = start;

const aryImg = [];  // 画像の情報を格納
const cvsw = can.width;   // canvasタグに指定したwidth
const cvsh = can.height;   // canvasタグに指定したheight
const imgCnt = 20;  // 描画する画像の数
const imgW = 32;    // 画像の基本サイズ横幅
const imgH = 32;  // 画像の基本サイズ立幅
const enemySpeed = 1;

// 画像のパラメーターを設定
function setImages(){
    for(let t = 0; t < imgCnt; t++){
        aryImg.push({
            posx: Math.floor(Math.random() * cvsw),   // 初期表示位置x
            posy: Math.floor(Math.random() * cvsh) - cvsh,  // 初期表示位置y
            sizew: imgW,    // 画像の幅
            sizeh: imgH,    // 画像の高さ
        });
    }
}

// 描画、パラメーターの更新
function flow() {
    ctx.clearRect(0, 0, cvsw, cvsh);
    for(d = 0; d < imgCnt; d++) {
        if(!aryImg[d]) {
            return;
        }
        aryImg[d].posy += enemySpeed;
        ctx.drawImage(img, aryImg[d].posx, aryImg[d].posy, aryImg[d].sizew , aryImg[d].sizeh);
        // 範囲外に描画された画像を上に戻す
        if(aryImg[d].posy >= cvsh){
            aryImg[d].posy = 0 - aryImg[d].sizeh;
        }
    }
}

function start() {
    setImages();
    setInterval(flow, 10);
}

/*---------------------------
* ufoが発る射す弾について
*--------------------------*/
const ballGroup = [];  //発射された弾を格納するための配列を作成
const ballData = {
    speed: 5,
    width: 10,
    height: 10,
    posX: 0,
    posY: 0,
    color: "#f00"
}

// 新しい弾を発射する関数
const shootBall = function(e) {
    const newShootBall = Object.assign({},ballData);//もとのデータを書き換えない方法
    newShootBall.posY = can.height - ufo.height - 40;
    newShootBall.posX = ufo.posX + (Math.ceil(ufo.width / 2 - newShootBall.width / 2));
    ctx.fillStyle = newShootBall.color;
    ctx.fillRect(newShootBall.posX, newShootBall.posY,newShootBall.width,newShootBall.height);
    ballGroup.push(newShootBall);
}   

function PlaySound1() {
    let audio1 = new Audio();
    audio1.src = "sound/shot1.mp3";
    audio1.play();
}

$(can).on("mousedown", function() {
    shootBall();
    PlaySound1();
});

const moveBall = function() {
    ballGroup.forEach(function(ball) {   // 配列の中身一つ一つに、同じ命令を順番に行うことができる
        ctx.clearRect(ball.posX,ball.posY,ball.width,ball.height);
        ctx.fillStyle = ball.color;
        ball.posY -= ball.speed;    //speedの分だけ標を足している
        ctx.fillRect(ball.posX, ball.posY, ball.width, ball.height);  
    });
};

setInterval(function() {
    moveBall();
    hitJudge();
}, 10);

// 配列内の全ての弾を精査して、canvasからスクリーンアウトしたら配列から該当の弾のデータを消去
const deleteBall = function() {
    for(let i = 0; i < ballGroup.length; i++) {
        if (ballGroup[i].posX >= can.width) {
            ballGroup.splice(i, 1);
        }
    }
}

/*---------------------------
* 当たり判定
*--------------------------*/

let countUpValue = 0;
const comment = $("#comment");

//カウンタの値を HTML 内の counter に表示
function countUp() {
    countUpValue++;
    if(countUpValue < 20) {
        $("#count").html(countUpValue);
    }
    else {
        comment.html("CLEAR");
        clearInterval(timer);
    }
}

function PlaySound2() {
    let audio2 = new Audio();
    audio2.src = "sound/slime1.mp3";
    audio2.play();
}

const hitJudge = function() {
    for(let k = 0; k < ballGroup.length; k++) {
        for(let d = 0; d < aryImg.length; d++) {
            if(!ballGroup[k]) {
                return;
            };
            const ballLeft = ballGroup[k].posX;
            const ballRight = ballLeft + ballGroup[k].width;
            const ballTop = ballGroup[k].posY;
            const enemyLeft = aryImg[d].posx;
            const enemyRight = aryImg[d].posx+aryImg[d].sizew;
            const enemyTop = aryImg[d].posy;
            const enemyBottom = enemyTop + aryImg[d].sizeh;

            if((ballRight >= enemyLeft) && (ballTop <= enemyBottom) && (ballLeft <= enemyRight)) {                    
                ctx.clearRect(ballLeft, ballTop, ballGroup[k].width, ballGroup[k].height);
                ctx.clearRect(enemyLeft, enemyTop, aryImg[d].width, aryImg[d].height);
                ballGroup.splice(k, 1);  
                aryImg.splice(d, 1);
                PlaySound2();
                countUp();
            }
        }
    }  
};

/*---------------------------
* Time Gage
*--------------------------*/
const time = $("#timegage")[0];
const timectx = time.getContext("2d");
const timegageData = {
    speed: 1,
    width: time.width,
    height: time.height,
    posX: 0,
    posY: 0,
    color: "#f00"
};

const leftTime=function(t) {
    timectx.clearRect(timegageData.posX, timegageData.posY,timegageData.width,timegageData.height);
    timectx.fillStyle=timegageData.color;
    if(timegageData.width>0) {
        timegageData.width -= 1;
    }
    else {
        comment.html("GAME OVER");
        comment.css("color","white")
        comment.css("white-space","nowrap")
        ufoStop();
    }
    timectx.fillRect(timegageData.posX, timegageData.posY,timegageData.width,timegageData.height);
}

$(window).on("load", leftTime);

const timer = setInterval(function() {
    leftTime();
}, 30);