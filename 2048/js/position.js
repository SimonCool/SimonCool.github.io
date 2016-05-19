/**
 * ----------------------------------------------
 *  坐标点
 * Created by hzqiushengqiang on 2016/3/25.
 * ----------------------------------------------
 */
var Position = (function () {
    var pos = function (x, y, index,number) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.number = number;
        this.hasAdd=false;
    };
    pos.prototype = {
        constructor: pos,
        getBackgroundColor: function (number) {
            var num=number||this.number;
                switch (num) {
                case 2:
                    return "#eee4da";
                    break;
                case 4:
                    return "#ede0c8";
                    break;
                case 8:
                    return "#f67c5f";
                    break;
                case 16:
                    return "#f65e3b";
                    break;
                case 32:
                    return "#edcf72";
                    break;
                case 64:
                    return "#edcc61";
                    break;
                case 128:
                    return "#9c0";
                    break;
                case 256:
                    return "#33b5e5";
                    break;
                case 512:
                    return "#09c";
                    break;
                case 1024:
                    return "#a6c";
                    break;
                case 2048:
                    return "#93c";
                    break;
                default :
                    return "#93c";
                    break;
            }
        },
        getColor: function (number) {
            var num=number||this.number;
            if( num <= 4 )
                return "#776e65";

            return "white";
        },
        getTop:function(X){
            var x=X||this.x;
            return x*120+20;
        },
        getLeft:function(Y){
            var y=Y||this.y;
            return y*120+20;
        },
        showRandAnimate:function(randomNumber){
            var number=randomNumber||this.number;
            var node = $('#grid-' + this.index );
            node.css('background-color',this.getBackgroundColor( number ) );
            node.css('color',this.getColor( number ) );
            node.text( number );
            node.animate({
                width:'100px',
                height:'100px',
                top:this.getTop(),
                left:this.getLeft()
            },50);
        },
        refreshStyle:function(node){
            if(this.number===0){
                node.css('width','0px');
                node.css('height','0px');
                node.css('top',this.getTop()+50 );
                node.css('left',this.getLeft()+50 );
            }else{
                node.css('width','100px');
                node.css('height','100px');
                node.css('top',this.getTop() );
                node.css('left',this.getLeft() );
                node.css('background-color',this.getBackgroundColor() );
                node.css('color',this.getColor());
                node.text(this.number);
            }
            this.hasAdd=false;
        },
        moveAnimate:function(toX,toY){
            var node= $('#grid-'+this.index);
            $(node).animate({top:this.getTop(toY),left:this.getLeft(toX)},100);
        },
        hasBarrierVertical:function(){

        }
    };
    return pos;
})();
