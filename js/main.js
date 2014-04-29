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
//				t.addEventListener('click',this.onTileClick);
				t.on("click",this.onTileClick,this,false,{},false);
				this.tiles[i][j] = t;
				this.addChild(t);
			}
		}
	}
	MainContainer.prototype = new createjs.Container();
	MainContainer.prototype.onTileClick = function(e){
		this.dispatchEvent({type:"tileClick",clickedTile:e.target});
	}
	
	function Chara(){
		// 現在の目的地　Point
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
		// 移動等の処理を行う
		if(this.destination){
			console.log('move');
			this.x += (this.destination.x-this.x)*0.1;
			this.y += (this.destination.y-this.y)*0.1;
			this.scaleX = ((this.destination.x-this.x)>0)?-1:1;
			
			if(Math.abs(this.destination.x-this.x)<5 && Math.abs(this.destination.y-this.y)<5){
				// arrived
				man.x = this.destination.x;
				man.y = this.destination.y;
				console.log('ariived '+man.x + ','+man.y);
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
	}
	
	// combination with DOM
	var canvas = document.getElementById('main_cvs');
	var wrapper = document.getElementById('wrapper');
	
	var stageWidth = canvas.width,
		stageHeight = canvas.height;
	var stage = new createjs.Stage(canvas);
	var destination;
	var roots = [];
	var currentTile;
	
	var man;
	
	// make container
	var main_container = new MainContainer(50,50,30,6);
	main_container.addEventListener("tileClick",contTileClickedHandler);
	
	function contTileClickedHandler(e){
		goToTile(e.clickedTile);
	}
	
	init();
	
	function init(){
		main_container.x = 10;
		main_container.y = 50;
		stage.addChild(main_container);
		man = new Chara();
		main_container.addChild(man);
		man.x = 50;
		man.y = 100;
		
		//man.play();
		
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", onTick);
	}
	
	
	function onGroundClick(e){
		goToTile(e.target);
	}
	
	function goToTile(destTile){
		console.log(destTile);
		//cancel current roots 
		man.rootsTileCue = [];
		// calcurate roots
		if(man.currentTile){
			man.rootsTileCue.push(destTile);
			// x positions
			console.log(man.currentTile);
			man.rootsTileCue.push(main_container.tiles[destTile.posX][man.currentTile.posY]);
		}else{
			
			man.rootsTileCue.push(destTile);
		}
	}
	
	function onTick(){
		stage.update();
		man.update();
	}

}