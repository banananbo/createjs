window.onload=function(){
	"use strict";
	
	(function(){
		
		//tile num
		var tileNumX = 20;
		var tileNumY = 10;
		
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
				this.chara.setRoots(main_container.rootsToTile(this.chara.currentTile,destTile));
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
			var destX = Math.floor( Math.random() * (tileNumX-1) );
			var destY = Math.floor( Math.random() * (tileNumY-1)  );
			
			var destTile = main_container.tiles[destX][destY];
			this.setDestTile(destTile);
			/*if(this.chara.currentTile){
				this.chara.setRoots(main_container.rootsToTile(this.chara.currentTile,destTile));
			}else{
				this.chara.setRoots([destTile]);
			}*/
		}
		function ClickCharaController(chara,container){
			CharaController.apply(this,[chara,container]);
			this.container.on("tileClick",this.contTileClickedHandler,this);
		}
		ClickCharaController.prototype = new CharaController();
		ClickCharaController.prototype.contTileClickedHandler = function(e){
			this.setDestTile(e.clickedTile);
		}
		
		// combination with DOM
		var canvas = document.getElementById('main_cvs'),
		    wrapper = document.getElementById('wrapper'),
		    stage = new createjs.Stage(canvas),
			man,
			man2,
			man3;
		
		// make container
		var main_container = new MainContainer(40,40,tileNumX,tileNumY);
		var controller1;
		var controller2;
		var controller3;
		
		main_container.x = 10;
		main_container.y = 50;
		stage.addChild(main_container);
		
		man = new Chara();
		controller1 = new AutoCharaController(man,main_container);
		
		man2 = new Chara();
		controller2 = new AutoCharaController(man2,main_container);
		
		man3 = new Chara();
		controller3 = new ClickCharaController(man3,main_container);
		
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", onTick);
		
		stage.enableMouseOver(10);
		
		adjustContainerPosition();
		
		function contTileClickedHandler(e){
			controller1.setDestTile(e.clickedTile);
		}
		
		function onTick(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			stage.update();
			//man.update();
		}
		
		function adjustContainerPosition(){
			var tween = createjs.Tween.get(main_container).to({x:(canvas.width-main_container.tileAreaWidth)/2,y:(canvas.height-main_container.tileAreaHeight)/2}, 500, createjs.Ease.bounceOut);
		}
		
		window.onresize = function(){
			adjustContainerPosition();
		};
	
	})();

};