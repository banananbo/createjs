window.onload=function(){
	"use strict";
	
	(function(){
		// combination with DOM
		var canvas = document.getElementById('main_cvs'),
		    wrapper = document.getElementById('wrapper'),
		    stage = new createjs.Stage(canvas),
			man;
		
		// make container
		var main_container = new MainContainer(40,40,10,10);
		main_container.addEventListener("tileClick",contTileClickedHandler);
		main_container.x = 10;
		main_container.y = 50;
		stage.addChild(main_container);
		
		man = new Chara();
		//main_container.addChild(man);
		man.x = 50;
		man.y = 100;
		
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", onTick);
		
		adjustContainerPosition();
		
		function contTileClickedHandler(e){
			startToTile(e.clickedTile);
		}
		
		function startToTile(destTile){
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
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			stage.update();
			man.update();
			
			console.log(man.getBounds());
		}
		
		function adjustContainerPosition(){
			var tween = createjs.Tween.get(main_container).to({x:(canvas.width-main_container.tileAreaWidth)/2,y:(canvas.height-main_container.tileAreaHeight)/2}, 500, createjs.Ease.bounceOut);
		}
		
		window.onresize = function(){
			adjustContainerPosition();
			//main_container.x = (canvas.width-main_container.tileAreaWidth)/2;
			//main_container.y = (canvas.height-main_container.tileAreaHeight)/2;
		};
	
	})();

};