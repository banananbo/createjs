window.onload=function(){
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", onTick);
	
	var canvas = document.getElementById('main_cvs');
	var stageWidth = canvas.width,stageHeight = canvas.height;
	var stage = new createjs.Stage(canvas);
	var destination = new createjs.Point(100,100);
	//var roots = [createjs.Point(50,50),createjs.Point(100,50),createjs.Point(100,100)];
	
	var tileX = 50;
	var tileY = 50;
	
	// make container
	var main_container = new createjs.Container();
	main_container.x = 10;
	main_container.y = 50;
	stage.addChild(main_container);
	
	// prepare ground
	/*
	var ground = new createjs.Shape();
	ground.graphics.beginFill('#CCC');
	ground.graphics.drawRect(0,0,500,300);
	ground.x = 0;
	ground.y = 0;
	main_container.addChild(ground);
	*/
	
	// make tiles
	var tiles = [];
	var countX = 10;
	var countY = 6;
	
	for(var i=0;i<countX;i++){
		for(var j=0;j<countY;j++){
			var t = makeTile('#EFEFEF',tileX,tileY);
			var point = main_container.localToGlobal(i*tileX,j*tileY);
			t.x = point.x;
			t.y = point.y;
			t.myPoint = main_container.localToGlobal(i*tileX+tileX/2,j*tileY+tileY/2); // center of tile
			t.addEventListener('click',onGroundClick);
			tiles.push(t);
			main_container.addChild(t);
		}
	}
	
	function makeTile(color,sizeX,sizeY){
		var tile = new createjs.Shape();
		tile.graphics.beginFill(color).beginStroke('#DDD');
		tile.graphics.drawRect(0,0,sizeX,sizeY);
		return tile;
	}
	
	var man = createPenguin();
	main_container.addChild(man);
	man.x = 50;
	man.y = 100;
	
	man.play();
	
	function onGroundClick(e){
		// destination = ground.globalToLocal(e.stageX,e.stageY);
		// destination = new createjs.Point(e.stageX,e.stageY);
		destination = e.target.myPoint;
	}
	
	function createPenguin(){
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
		var container = new createjs.Container(penAni); // ADJ of image position
		container.addChild(penAni);
		return container;
	}
	
	function onTick(){
		// man.x--;
		// main_container.x+=2;
		/*if(destination){
			man.x += (destination.x-man.x)*0.1;
			man.y += (destination.y-man.y)*0.1;
			man.scaleX = ((destination.x-man.x)>0)?-1:1;
			if(destination.x-man.x<0.1 && destination.y-man.y<0.1){
				// arrived
				destination = null;
			}
		}else{
			if(roots.length>0){
				destination = roots.pop();
			}
		}
		
		stage.update();*/
	}
	
	function createBall(radius,color,nX,nY){
		var ball = new createjs.Shape();
		ball.graphics.beginFill(color);
		ball.graphics.drawCircle(0,0,radius);
		ball.x = nX;
		ball.y = nY;
		return ball;
	}
}