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
};