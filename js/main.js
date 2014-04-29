window.onload=function(){
	"use strict";
	function Tile(color,sizeX,sizeY,xnum,ynum,main_container){
		this.initialize();
		this.color = color;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.posX = xnum;
		this.posY = ynum;
		
		this.myPoint = main_container.localToGlobal(this.posX*this.sizeX+this.sizeX/2,this.posY*this.sizeY+this.sizeY/2); // center of tile
		this.localPoint = new createjs.Point(this.posX*this.sizeX+this.sizeX/2,this.posY*this.sizeY+this.sizeY/2);
		
		this.graphics.beginFill(color).beginStroke('#DDD');
		this.graphics.drawRect(0,0,sizeX,sizeY);
	}
	
	Tile.prototype = new createjs.Shape();
	
	function MainContainer(tileWidth,tileHeight,xTileNum,yTileNum){
		this.tiles = [];
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.xTileNum = xTileNum;
		this.yTileNum = yTileNum;
		
		// make tiles
		for(var i=0;i<this.xTileNum;i++){
			this.tiles.push([]);
			for(var j=0;j<this.yTileNum;j++){
				var t = new Tile('#EFEFEF',this.tileWidth,this.tileHeight,i,j,this);
				t.x = i*this.tileWidth;
				t.y = j*this.tileHeight;
				t.addEventListener('click',onGroundClick);
				this.tiles[i][j] = t;
				this.addChild(t);
			}
		}
	}
	MainContainer.prototype = new createjs.Container();
	
	// combination with DOM
	var canvas = document.getElementById('main_cvs');
	var wrapper = document.getElementById('wrapper');
	
	var stageWidth = canvas.width,
		stageHeight = canvas.height;
	var stage = new createjs.Stage(canvas);
	var destination;// = new createjs.Point(100,100);
	var roots = [];
	var currentTile;
	
	var tiles;
	var countX;
	var countY;
	var tileX = 50;
	var tileY = 50;
	
	var man;
	
	// make container
//	var main_container = new createjs.Container();
	var main_container = new MainContainer(50,50,10,6);
	
	init();
	
	function init(){
		main_container.x = 10;
		main_container.y = 50;
		stage.addChild(main_container);

		// make tiles
/*		tiles = [];
		countX = 10;
		countY = 6;
		
		for(var i=0;i<countX;i++){
			tiles[i] = [];
			for(var j=0;j<countY;j++){
				var t = new Tile('#EFEFEF',tileX,tileY,i,j);
				t.x = i*tileX;
				t.y = j*tileY;
				t.addEventListener('click',onGroundClick);
				tiles[i][j] = t;
				main_container.addChild(t);
			}
		}
		
		function makeTile(color,sizeX,sizeY){
			var tile = new createjs.Shape();
			tile.graphics.beginFill(color).beginStroke('#DDD');
			tile.graphics.drawRect(0,0,sizeX,sizeY);
			return tile;
		}
*/		
		man = createPenguin();
		main_container.addChild(man);
		man.x = 50;
		man.y = 100;
		
		//man.play();
		
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", onTick);
	}
	
	
	function onGroundClick(e){
		// destination = ground.globalToLocal(e.stageX,e.stageY);
		// destination = new createjs.Point(e.stageX,e.stageY);
		// destination = e.target;
		goToTile(e.target);
	}
	
	function goToTile(destTile){
		//cancel current roots 
		roots = [];
		// calcurate roots
		if(currentTile){
			roots.push(destTile);
			// x positions
			roots.push(main_container.tiles[destTile.posX][currentTile.posY]);
		}else{
			roots.push(destTile);
		}
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
		if(destination){
			
			moveToPoint(man,destination.localPoint);
			
			if(Math.abs(destination.localPoint.x-man.x)<5 && Math.abs(destination.localPoint.y-man.y)<5){
				// arrived
				man.x = destination.localPoint.x;
				man.y = destination.localPoint.y;
				console.log('ariived '+man.x + ','+man.y);
				//man.pause();
				destination = null;
			}
		}else{
			if(roots.length>0){
				//man.start;
				destination = roots.pop();
				currentTile = destination;
				console.log('goto '+ destination.myPoint.x + ','+destination.myPoint.y);
			}
		}
		stage.update();
		// sizing
		//canvas.clientHeight = {height:wrapper.clientHeight};
		//canvas.clientWidth = {width:wrapper.clientWidth};
	}
	
	// to be mans method
	function moveToPoint(man,p){
		man.x += (p.x-man.x)*0.1;
		man.y += (p.y-man.y)*0.1;
		man.scaleX = ((p.x-man.x)>0)?-1:1;
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