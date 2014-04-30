function Chara(){
	// ���݂̖ړI�n�@Point
	this.distination = null;
	this.rootsTileCue = [];
	
	var data = {};
	data.images = ['img/002.png'];
	data.frames = {width:82,height:109,regX:41,regY:55};
	data.animations = {walk:{
		frames:[0,0,1,2,2,3],
		speed:0.5
	}
	};
	var penguin = new createjs.SpriteSheet(data);
	var penAni = new createjs.Sprite(penguin,'walk');
	penAni.y -= 30;
	this.addChild(penAni);
}
Chara.prototype = new createjs.Container();
Chara.prototype.update = function(){
	// �ړ����̏������s��
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
			this.currentTile = this.rootsTileCue.pop();
			this.destination = this.currentTile.localPoint;
			
			console.log(this.destination);
		}
	}
};