function CharaController(chara,container){
	if(chara&&container){
		this.init(chara,container);
	}
}
CharaController.prototype.init = function(chara,container){
	this.chara = chara;
	this.container = container;
	container.addChild(chara);
}
CharaController.prototype.setDestTile = function(destTile){
	//cancel current roots 
	this.chara.rootsTileCue = [];
	// calcurate roots
	
	if(this.chara.currentTile){
		/*man.rootsTileCue.push(destTile);
		// x positions
		man.rootsTileCue.push(main_container.tiles[destTile.posX][man.currentTile.posY]);*/
		//man.rootsTileCue = main_container.rootsToTile(man.currentTile,destTile);
		this.chara.setRoots(this.container.rootsToTile(this.chara.currentTile,destTile));
	}else{
		//man.rootsTileCue.push(destTile);
		this.chara.setRoots([destTile]);
	}
}

function AutoCharaController(chara,container){
	CharaController.apply(this,[chara,container]);
	chara.on('moveConmplete',this.autoRoots,this);
	this.autoRoots();
}
AutoCharaController.prototype = new CharaController();
AutoCharaController.prototype.autoRoots = function(){
	
	
	while(1){
		var destX = Math.floor( Math.random() * (this.container.xTileNum-1) );
		var destY = Math.floor( Math.random() * (this.container.yTileNum-1)  );
		var destTile = this.container.tiles[destX][destY];
		if(destTile != this.chara.currentTile){
			break;
		}
	}
	
	this.setDestTile(destTile);
}
function ClickCharaController(chara,container){
	CharaController.apply(this,[chara,container]);
	this.container.on("tileClick",this.contTileClickedHandler,this);
}
ClickCharaController.prototype = new CharaController();
ClickCharaController.prototype.contTileClickedHandler = function(e){
	this.setDestTile(e.clickedTile);
}