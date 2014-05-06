window.onload=function(){
	"use strict";
	
	(function(){
		
		//tile num
		var tileNumX = 60;
		var tileNumY = 30;
		
		// combination with DOM
		var canvas = document.getElementById('main_cvs'),
		    wrapper = document.getElementById('wrapper'),
		    stage = new createjs.Stage(canvas),
			man,man2,
			enemies_controller;
		
		// make container
		var main_container = new MainContainer(20,20,tileNumX,tileNumY);
		var controller1;
		var controller2;
		var controller3;
		
		main_container.x = 10;
		main_container.y = 50;
		stage.addChild(main_container);
		
		enemies_controller = [];
		for(var i = 0;i<50;i++){
			var moveSpeed = Math.floor( Math.random() * 500 );
			var animeSpeed = 1/Math.floor( Math.random() * 6 );
			info = new CharaInfo(animeSpeed,moveSpeed);
			enemies_controller.push(new AutoCharaController(new Chara(info),main_container));
		}
		
		var info = new CharaInfo(1/5,50);
		man = new Chara(info);
		controller1 = new ClickCharaController(man,main_container);
		console.log(man.children.length);
		
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", onTick);
		
		//stage.enableMouseOver(5);
		
		adjustContainerPosition();
		
		function contTileClickedHandler(e){
			controller1.setDestTile(e.clickedTile);
		}
		
		function onTick(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			stage.update();
			man.filters = [
				            new createjs.ColorFilter(0,0,0,0.5, 0,0,255,0)
				             ];
				man.cache(-100, -100, 200, 200);
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