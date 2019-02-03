const can = $("#canvas")[0];
const ctx = can.getContext("2d");

function PlaySound1() {
    let audio1 = new Audio();
    audio1.src = "sound/shot1.mp3";
    audio1.play();
}

function PlaySound2() {
    let audio2 = new Audio();
    audio2.src = "sound/slime1.mp3";
    audio2.play();
}

/*---------------------------
*           ufo
*--------------------------*/
let ufoImg = new Image(); // 画像の読み込み
ufoImg.src ="images/ufo.png";
let ufo = {
    posX: can.width / 2,
    posY: can.height - 40,
    width: 32,
    height: 32,
};

const ufoMove = function(e) {
    // ctx.clearRect(ufo.posX, ufo.posY, ufo.width, ufo.height);   //画像を消す
    ufo.posX = e.offsetX;   //新しいX座標を設定
    ctx.drawImage(ufoImg, ufo.posX, ufo.posY, ufo.width, ufo.height);
}

/*---------------------------
*            敵
*--------------------------*/
const aryImg = [];
const imgCnt = 21;  // 描画する画像の数
const imgW = 32; 
const imgH = 32;  
const cvsw = can.width - imgW;   // canvasタグに指定したwidth
const cvsh = can.height;   // canvasタグに指定したheight
const enemySpeed = 1;
const srcs=[
    "images/invaders1.png",
    "images/invaders2.png",
    "images/invaders3.png"
]
let img = new Image(); // 画像の読み込み
img.src = srcs[Math.floor(Math.random() * 3)];

function setImages(){
    for(let t = 0; t < imgCnt; t++) {
        aryImg.push({
            posx: Math.floor(Math.random() * cvsw),   // 初期表示位置x
            posy: Math.floor(Math.random() * cvsh) - cvsh,  // 初期表示位置y
        });
    }
}

function flowEnemy() {
    for(d = 0; d < imgCnt; d++) {
        if(!aryImg[d]) return;
        aryImg[d].posy += enemySpeed;
        ctx.drawImage(img, aryImg[d].posx, aryImg[d].posy, imgW , imgH);
        if(aryImg[d].posy >= cvsh) aryImg[d].posy = 0 - imgH;    // 範囲外に描画された画像を上に戻す
    }
}

/*---------------------------
*      ufoが発射する光線
*--------------------------*/
const beams = []; 
const beamData = {
    speed: 5,
    width: 10,
    height: 10,
    posX: 0,
    posY: can.height - ufo.height - 40,
    color: "#f00"
}

const shootBeam = function() {
    const newBeam = {...beamData};
    newBeam.posX = ufo.posX + (Math.ceil(ufo.width / 2 - newBeam.width / 2));
    ctx.fillStyle = newBeam.color;
    ctx.fillRect(newBeam.posX, newBeam.posY, newBeam.width, newBeam.height);
    beams.push(newBeam);
}

const moveBeam = function() {
    beams.forEach((beam) => {
        // ctx.clearRect(beam.posX, beam.posY, beam.width, beam.height);
        ctx.fillStyle = beam.color;
        beam.posY -= beam.speed;
        ctx.fillRect(beam.posX, beam.posY, beam.width, beam.height);  
    });
};

/*---------------------------
*         当たり判定
*--------------------------*/
let countUpValue = 0;
const comment = $("#comment");

function countUp() {
    countUpValue++;
    if(countUpValue < imgCnt) $("#count").html(countUpValue);
    else {
        comment.html("CLEAR");
        clearInterval(timer);
    }
}

const hitJudge = function() {
    for(let k = 0; k < beams.length; k++) {
        if (beams[k].posY <= 0) beams.splice(k, 1);  // スクリーンアウトしたら配列からデータを消去
        for(let d = 0; d < aryImg.length; d++) {
            if(!beams[k]) return;
            const beamLeft = beams[k].posX;
            const beamRight = beamLeft + beams[k].width;
            const beamTop = beams[k].posY;
            const enemyLeft = aryImg[d].posx;
            const enemyRight = aryImg[d].posx + imgW;
            const enemyTop = aryImg[d].posy;
            const enemyBottom = enemyTop + imgH;

            if((beamRight >= enemyLeft) && (beamTop <= enemyBottom) && (beamLeft <= enemyRight)) {                    
                ctx.clearRect(beamLeft, beamTop, beams[k].width, beams[k].height);
                ctx.clearRect(enemyLeft, enemyTop, aryImg[d].width, aryImg[d].height);
                beams.splice(k, 1);  
                aryImg.splice(d, 1);
                PlaySound2();
                countUp();
            }
        }
    }  
};

/*---------------------------
*         Time Gage
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

const leftTime = function() {
    timectx.clearRect(timegageData.posX, timegageData.posY,timegageData.width,timegageData.height);
    timectx.fillStyle = timegageData.color;
    if(timegageData.width > 0) timegageData.width -= 1;
    else {
        comment.html("GAME OVER");
        comment.css("color","white")
        comment.css("white-space","nowrap")
    }
    timectx.fillRect(timegageData.posX, timegageData.posY,timegageData.width,timegageData.height);
}

/*---------------------------
*         動作処理
*--------------------------*/
$(window).on("load", setImages);
$(can).on("mousemove", ufoMove);
$(can).on("mousedown", function() {
    shootBeam();
    PlaySound1();
});
setInterval(function() {
    ctx.clearRect(0, 0, cvsw + imgW, cvsh);
    flowEnemy();
    moveBeam();
    hitJudge();
}, 10);
const timer = setInterval(function() {
    leftTime();
}, 30);
