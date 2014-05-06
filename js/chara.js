function Chara(){
	// �ｽ�ｽ�ｽﾝの目的�ｽn�ｽ@Point
	this.distination = null;
	this.moving = null;
	this.rootsTileCue = [];
	
	var data = {};
	data.images = ['img/002.png'];
	data.frames = {width:82,height:109,regX:41,regY:55};
	data.animations = {walk:{
		frames:[0,0,1,2,2,3],
		speed:0.3
	}
	};
	var penguin = new createjs.SpriteSheet(data);
	var penAni = new createjs.Sprite(penguin,'walk');
	penAni.y -= 30;
	this.addChild(penAni);
	this.on('moved',function(){
		if(this.rootsTileCue.length>0){
			//man.start;
			this.currentTile = this.rootsTileCue.shift();
			this.destination = this.currentTile.localPoint;
			this.moving = createjs.Tween.get(this).to({x:this.destination.x,y:this.destination.y}, 300, createjs.Ease.bounceOut).call(function(){this.destination=null;this.moving=null,this.dispatchEvent({type:"moved"});});
			this.scaleX = ((this.destination.x-this.x)>0)?-1:1;
		}else{
			// arrived
			this.dispatchEvent({type:"moveConmplete"});
		}
	},this);
}

Chara.prototype = new createjs.Container();
Chara.prototype.update = walk2;
Chara.prototype.setRoots = function(arr){
	/*this.moving = createjs.Tween.get(this).to({x:this.destination.x,y:this.destination.y}, 300, createjs.Ease.bounceOut).call(function(){this.destination=null;this.moving=null,this.dispatchEvent({type:"moved"});});
	this.scaleX = ((this.destination.x-this.x)>0)?-1:1;
	*/
	this.rootsTileCue = arr;
	if(this.moving==null){
		this.currentTile = this.rootsTileCue.shift();
		this.destination = this.currentTile.localPoint;
		this.moving = createjs.Tween.get(this).to({x:this.destination.x,y:this.destination.y}, 300, createjs.Ease.bounceOut).call(function(){this.destination=null;this.moving=null,this.dispatchEvent({type:"moved"});});
		this.scaleX = ((this.destination.x-this.x)>0)?-1:1;
	}
}
function walk2(){
	if(this.destination && !this.moving){
		this.moving = createjs.Tween.get(this).to({x:this.destination.x,y:this.destination.y}, 300, createjs.Ease.bounceOut).call(function(){this.destination=null;this.moving=null,this.dispatchEvent({type:"moved"});});
		this.scaleX = ((this.destination.x-this.x)>0)?-1:1;
	}else if(!this.destination){
/*		if(this.rootsTileCue.length>0){
			//man.start;
			this.currentTile = this.rootsTileCue.shift();
			this.destination = this.currentTile.localPoint;
		}else{
			// arrived
			this.dispatchEvent({type:"moveConmplete"});
		}
		*/
	}
	this.on('moved',function(){
		if(this.rootsTileCue.length>0){
			//man.start;
			this.currentTile = this.rootsTileCue.shift();
			this.destination = this.currentTile.localPoint;
		}else{
			// arrived
			this.dispatchEvent({type:"moveConmplete"});
		}
	},this);
}
function walk1(){
	// �ｽﾚ難ｿｽ�ｽ�ｽ�ｽﾌ擾ｿｽ�ｽ�ｽ�ｽ�ｽ�ｽs�ｽ�ｽ
	if(this.destination){
		this.x += (this.destination.x-this.x)*0.1;
		this.y += (this.destination.y-this.y)*0.1;
		this.scaleX = ((this.destination.x-this.x)>0)?-1:1;
		
		if(Math.abs(this.destination.x-this.x)<5 && Math.abs(this.destination.y-this.y)<5){
			// arrived
			this.x = this.destination.x;
			this.y = this.destination.y;
			//man.pause();
			this.destination = null;
		}
		
	}else{
		if(this.rootsTileCue.length>0){
			//man.start;
			this.currentTile = this.rootsTileCue.shift();
			this.destination = this.currentTile.localPoint;
		}
	}
};