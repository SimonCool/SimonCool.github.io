/**
 * ----------------------------------------------
 *  2048入口js
 * Created by hzqiushengqiang on 2016/3/23.
 * ----------------------------------------------
 */
(function (window, document, $, Position, Util) {
    var list = [], startX, startY, disX, disY,score= 0,hasMove=false;
    var grids = $('.u-grid');
    var gridCnt=$('#j-gridCnt');
    var init = function () {
        list = [];
        Util.forEach(function (i, j, index) {
            list.push(new Position(i, j, index, 0));
            $(grids[index]).css({
                left: j * 120 + 20,
                top: i * 120 + 20,
                'background-color': '#CCC0B2'
            });
        });
        updateView();
        createRandomPos(2);
        addEvent();
    };
    var updateView=function(){
        $(".u-movegrid").remove();
        Util.forEach(function (i, j, index) {
            $(gridCnt).append('<span class="u-grid u-movegrid" id="grid-'+index+'"></span>');
            var node=$("#grid-"+index);
            list[index].refreshStyle(node);
        });
        $('.u-movegrid').css('line-height','100px');
    };
    var createRandomPos = function (count) {
        if(noSpace()){
            return false;
        }
        if(count)count--;
        var ranPosNum, num, i = 0, ranPos;
        num = getRandomNumber();
        do {
            ranPosNum = Math.floor(Math.random() * 16);
            i++;
        } while (list[ranPosNum].number && i < 50);

        if (i >= 50) {
            Util.forEach(function (i, j, index) {
                if (!list[index].number) {
                    ranPosNum = index;
                }
            });
        }
        ranPos = list[ranPosNum];
        ranPos.number=num;
        ranPos.showRandAnimate();
        if (count) {
            createRandomPos();
        }
    };
    var getRandomNumber = function () {
        return Math.ceil(Math.random() * 2) * 2;
    };
    var addEvent = function () {
        var initBtn = $('#newGame');
        initBtn.on('click', function () {
            //clear();
            //init();
            location.href='';
        });
        $(document).on('touchstart', function (event) {
            var touch = event.originalEvent.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        });
        $(document).on('touchmove', function (event) {
            event.preventDefault();
        });
        $(document).on('touchend', function (event) {
            var touch = event.originalEvent.changedTouches[0];
            disX = touch.pageX - startX;
            disY = touch.pageY - startY;
            if (Math.abs(disX) < 0.3 * $(document).width() && Math.abs(disY) < 0.3 * $(document).width()) {
                return;
            }
            if (Math.abs(disX) > Math.abs(disY)) {
                if (disX > 0) { //right
                    if(canMoveRight()){
                        moveRight();
                        setTimeout(isOver,500);
                    }
                } else { //left
                    if(canMoveLeft()){
                        moveLeft();
                        setTimeout(isOver,500);
                    }
                }
            } else {
                if (disY > 0) { //bottom
                    if(canMoveDown()) {
                        moveBottom();
                        setTimeout(isOver,500);
                    }
                } else { //top
                    if(canMoveUp()) {
                        moveTop();
                        setTimeout(isOver,500);
                    }
                }
            }
        })
    };
    var moveRight = function () {
        var count=0;
        Util.forEach(function(i,j,index) {
            var arr=list;
            var item = arr[index];
            if (item.number && !item.hasAdd) { //有数值并且没有被移动过
                for (var k = 4-1; k > j; k--) {
                    var loopItem=arr[4 * i + k];
                    if (loopItem.hasAdd ||hasBarrierHorizontal(i,k,j)) {
                        continue;
                    }
                    if (loopItem.number == item.number) {
                        count += item.number;
                        item.moveAnimate(item.x,k);
                        item.number *= 2;
                        loopItem.number=item.number;
                        item.number=0;
                        loopItem.hasAdd=true;
                        hasMove=true;
                        break;
                    } else if (!loopItem.number) {
                        item.moveAnimate(item.x,k);
                        loopItem.number=item.number;
                        item.number=0;
                        hasMove=true;
                        break;
                    }
                }
            }
        });
        if(hasMove){
            setTimeout(createRandomPos,100);
            score += count;
            setScore();
        }
        updateView();
    };
    var moveLeft = function () {
        var count=0;
        Util.forEach(function(i,j,index) {
            var arr=list;
            var item = arr[index];
            if (item.number && !item.hasAdd) { //有数值并且没有被移动过
                for (var k = 0; k < j; k++) {
                    var index2 = 4 * i + k;
                    var loopItem=arr[index2];
                    if (loopItem.hasAdd||hasBarrierHorizontal(i,j,k)) {
                        continue;
                    }
                    if (loopItem.number == item.number) {
                        count += item.number;
                        item.moveAnimate(item.x,k);
                        item.number *= 2;
                        loopItem.number=item.number;
                        item.number=0;
                        loopItem.hasAdd=true;
                        hasMove=true;
                        break;
                    } else if (!arr[index2].number) {
                        item.moveAnimate(item.x,k);
                        loopItem.number=item.number;
                        item.number=0;
                        hasMove=true;
                        break;
                    }
                }
            }
        });
        if(hasMove){
            setTimeout(createRandomPos,100);
            score += count;
            setScore();
        }
        updateView();

    };
    var moveTop = function () {
        var count=0;
        Util.forEach(function(i,j,index) {
            var arr=list;
            var item = arr[index];
            if (item.number && !item.hasAdd) { //有数值并且没有被移动过
                for (var k =0; k < i; k++) {
                    var loopItem=arr[4 *k + j];
                    if (loopItem.hasAdd ||hasBarrierVertical(j,i,k)) {
                        continue;
                    }
                    if (loopItem.number == item.number) {
                        count += item.number;
                        item.moveAnimate(k,item.y);
                        item.number *= 2;
                        loopItem.number=item.number;
                        item.number=0;
                        loopItem.hasAdd=true;
                        hasMove=true;
                        break;
                    } else if (!loopItem.number) {
                        item.moveAnimate(k,item.y);
                        loopItem.number=item.number;
                        item.number=0;
                        hasMove=true;
                        break;
                    }
                }
            }
        });
        if(hasMove){
            setTimeout(createRandomPos,100);
            score += count;
            setScore();
        }
        updateView();
    };
    var moveBottom = function () {
        var count=0;
        Util.forEach(function(j,i,index) {
            var arr=list;
            var item = arr[index];
            if (item.number && !item.hasAdd) { //有数值并且没有被移动过
                for (var k =4-1; k>i; k--) {
                    var loopItem=arr[4 *k + j];
                    if (loopItem.hasAdd ||hasBarrierVertical(j,k,i)) {
                        continue;
                    }
                    if (loopItem.number == item.number) {
                        count += item.number;
                        item.moveAnimate(k,item.y);
                        item.number *= 2;
                        loopItem.number=item.number;
                        item.number=0;
                        loopItem.hasAdd=true;
                        hasMove=true;
                        break;
                    } else if (!loopItem.number) {
                        item.moveAnimate(k,item.y);
                        loopItem.number=item.number;
                        item.number=0;
                        hasMove=true;
                        break;
                    }
                }
            }
        });
        if(hasMove){
            setTimeout(createRandomPos,100);
            score += count;
            setScore();
        }
        updateView();
    };
    var hasBarrierHorizontal=function(row,col1,col2){
        for (var l = col2+1; l < col1; l++) {
            if(list[row*4+l].number>0){
                return true;
            }
        }
        return false;
    };
    var hasBarrierVertical=function(col,row1,row2){
        for (var l = row2+1; l < row1; l++) {
            if(list[l*4+col].number>0){
                return true;
            }
        }
        return false;
    };
    var setScore=function(){
        $('#score').text(score);
    };
    var noSpace=function (){
      var tag=true;
       Util.forEach(function(i,j,index){
           if( list[index].number===0 ){
               tag=false;
           }
       });
        return tag;
    };
   var canMoveLeft= function (){
       var tag=false;
       Util.forEach(function(i,j,index) {
           if (list[index].number>0&&list[index - 1]) {
               if (list[index - 1].number ===0 || list[index - 1].number == list[index].number) {
                   tag=true;
               }
           }
       });
        return tag;
    };

  var canMoveRight=  function (){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 2; j >= 0 ; j -- )
                if( list[i*4+j].number >0 &&list[i*4+j+1])
                    if( list[i*4+j+1].number===0 || list[i*4+j+1].number == list[i*4+j].number )
                        return true;

        return false;
    };
   var canMoveUp= function (){

        for( var j = 0 ; j < 4 ; j ++ )
            for( var i = 1 ; i < 4 ; i ++ )
                if( list[i*4+j].number >0&&list[i*4+j-4] )
                    if( list[i*4+j-4].number ===0 || list[i*4+j-4].number == list[i*4+j].number )
                        return true;

        return false;
    };

    var canMoveDown=function (){
        for( var j = 0 ; j < 4 ; j ++ )
            for( var i = 2 ; i >= 0 ; i -- )
                if( list[i*4+j].number >0 &&list[i*4+j+4])
                    if( list[i*4+j+4].number ===0 || list[i*4+j+4].number == list[i*4+j].number )
                        return true;
        return false;
    };

    var noMove=function (){
        if( canMoveLeft(  ) ||canMoveRight(  ) ||canMoveUp(  ) ||canMoveDown(  ) ){
            return false;
        }
        return true;
    };
    var isOver=function (){
        if( noSpace() && noMove() ){
            gameOver();
        }
    };
    var gameOver=function (){
        alert('gameover!');
    }
    init();
})(window, document, $, Position, Util);