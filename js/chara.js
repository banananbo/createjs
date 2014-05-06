function Chara(info){
	this.initialize(info);
	this.scaleXY = 0.5;
	this.scaleX = this.scaleY = this.scaleXY;
	// �ｽ�ｽ�ｽﾝの目的�ｽn�ｽ@Point
	this.distination = null;
	this.moving = null;
	this.rootsTileCue = [];
	if(info){
		this.moveSpeed = info.moveSpeed;
		this.animatioinSpeed = info.animeSpeed;
	}else{
		this.moveSpeed = 300;
		this.animatioinSpeed = 1/10;
	}
	
	
	var data = {};
	data.images = ['img/002.png'];
	data.frames = {width:82,height:109,regX:41,regY:55};
	data.animations = {walk:{
		frames:[0,0,1,2,2,3],
		speed:this.animatioinSpeed
	}
	};
	var penguin = new createjs.SpriteSheet(data);
	var penAni = new createjs.Sprite(penguin,'walk');
	penAni.y -= 30;
	this.addChild(penAni);
	this.on('moved',function(){
		if(this.rootsTileCue.length>0){
			//man.start;
			this.moveByRootsCue();
		}else{
			// arrived
			this.dispatchEvent({type:"moveConmplete"});
		}
	},this);
}
Chara.prototype = new createjs.Container();
Chara.prototype.Container_initialize = Chara.prototype.initialize;
Chara.prototype.initialize = function(arg){
	this.Container_initialize();
	this._arg = arg;
}
Chara.prototype.setRoots = function(arr){
	/*this.moving = createjs.Tween.get(this).to({x:this.destination.x,y:this.destination.y}, 300, createjs.Ease.bounceOut).call(function(){this.destination=null;this.moving=null,this.dispatchEvent({type:"moved"});});
	this.scaleX = ((this.destination.x-this.x)>0)?-1:1;
	*/
	this.rootsTileCue = arr;
	if(this.moving==null){
		this.moveByRootsCue();
	}
}
Chara.prototype.moveByRootsCue = function(){
	this.currentTile = this.rootsTileCue.shift();
	this.destination = this.currentTile.localPoint;
	this.moving = createjs.Tween.get(this).to({x:this.destination.x,y:this.destination.y}, this.moveSpeed, createjs.Ease.bounceOut).call(function(){this.destination=null;this.moving=null,this.dispatchEvent({type:"moved"});});
	this.scaleX = ((this.destination.x-this.x)>0)?-this.scaleXY:this.scaleXY;
};

function CharaInfo(anime,move){
	this.animeSpeed = anime;
	this.moveSpeed = move;
}