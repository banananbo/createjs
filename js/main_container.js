/**
 * main container
 */
function Tile(color,sizeX,sizeY,xnum,ynum,main_container){
	this.initialize();
	this.color = color;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.posX = xnum;
	this.posY = ynum;
	
	this.NORMAL_COLOR = color;
	this.UP_COLOR = '#FDD';
	
	this.myPoint = main_container.localToGlobal(this.posX*this.sizeX+this.sizeX/2,this.posY*this.sizeY+this.sizeY/2); // center of tile
	this.localPoint = new createjs.Point(this.posX*this.sizeX+this.sizeX/2,this.posY*this.sizeY+this.sizeY/2);
	
	this.onRollover = function(){
		this.color = this.UP_COLOR;
		this.updateDisplay();
	};
	
	this.onRollout = function(){
		this.color = this.NORMAL_COLOR;
		this.updateDisplay();
	};
	
	this.on('rollover',this.onRollover,this);
	this.on('rollout',this.onRollout,this);
	
	this.updateDisplay = function(){
		this.graphics.clear();
		this.graphics.beginFill(this.color).beginStroke('#ddd');
		this.graphics.drawRect(0,0,sizeX,sizeY);
	}
	this.updateDisplay();
	
}
Tile.prototype = new createjs.Shape();

function MainContainer(tileWidth,tileHeight,xTileNum,yTileNum){
	this.tiles = [];
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.xTileNum = xTileNum;
	this.yTileNum = yTileNum;
	
	// size
	this.tileAreaWidth = this.tileWidth*this.xTileNum;
	this.tileAreaHeight = this.tileHeight*this.yTileNum;
	
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
};
MainContainer.prototype.rootsToTile=function(start,end){
	var starttile = this.tiles[start.posX][start.posY];
	var roots = [];
	// move X 
	if(start.posX<end.posX){
		for(var i=start.posX+1;i<=end.posX;i++){
			roots.push(this.tiles[i][start.posY]);
		}
	}else{
		for(var i=start.posX-1;i>=end.posX;i--){
			roots.push(this.tiles[i][start.posY]);
		}
	}
	
	// move Y 
	if(start.posY<end.posY){
		for(var j=start.posY+1;j<=end.posY;j++){
			roots.push(this.tiles[end.posX][j]);
		}
	}else{
		for(var j=start.posY-1;j>=end.posY;j--){
			roots.push(this.tiles[end.posX][j]);
		}
	}
	
	return roots;
}
