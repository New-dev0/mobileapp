function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oGroup;
    
    var _oMsgText;
    var _oMsgText1;
    var _oScoreText;
    var _oScoreText1;
    
    this._init = function(oSpriteBg){
        
        
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = 0;
        _oBg.y = 0;
        _oGroup.addChild(_oBg);
        
        _oMsgText = new createjs.Text(""," 70px "+FONT, "#600101");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2-50);
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 700;
        _oMsgText.outline = 8;
        _oGroup.addChild(_oMsgText);
        
        _oMsgText1 = new createjs.Text(""," 70px "+FONT, "#ffffff");
        _oMsgText1.x = CANVAS_WIDTH/2;
        _oMsgText1.y = (CANVAS_HEIGHT/2-50);
        _oMsgText1.textAlign = "center";
        _oMsgText1.textBaseline = "alphabetic";
        _oMsgText1.lineWidth = 700;
        _oGroup.addChild(_oMsgText1);     
        
        _oScoreText = new createjs.Text(""," 50px "+FONT, "#600101");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2) + 50;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.outline = 8;
        _oGroup.addChild(_oScoreText);  
        
        _oScoreText1 = new createjs.Text(""," 50px "+FONT, "#ffffff");
        _oScoreText1.x = CANVAS_WIDTH/2;
        _oScoreText1.y = (CANVAS_HEIGHT/2) + 50;
        _oScoreText1.textAlign = "center";
        _oScoreText1.textBaseline = "alphabetic";
        _oGroup.addChild(_oScoreText1); 


        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iScore){
        _oMsgText.text = TEXT_GAMEOVER;
        _oMsgText1.text = TEXT_GAMEOVER;
        
        _oScoreText.text = TEXT_SCORE + iScore;
        _oScoreText1.text = TEXT_SCORE + iScore;
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
        $(s_oMain).trigger("save_score",[iScore]);
    };
    
    this.GameOverAdventure = function(iScore){
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
	        createjs.Sound.play("game_over");
	}

        _oMsgText.text = TEXT_GAMEOVER_ADVENTURE;
        _oMsgText.y -= 100;
        _oMsgText1.text = TEXT_GAMEOVER_ADVENTURE;
        _oMsgText1.y -= 100;
        _oScoreText.text = TEXT_SCORE + iScore;
        _oScoreText.y += 150;
        _oScoreText1.text = TEXT_SCORE + iScore;
        _oScoreText1.y += 150;
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
        $(s_oMain).trigger("save_score",[iScore]);
    };
    
    this.win = function(iScore){
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
	        createjs.Sound.play("level_complete");
	}

        _oMsgText.text = TEXT_WIN;
        _oMsgText1.text = TEXT_WIN;
        
        _oScoreText.text = TEXT_SCORE + iScore;
        _oScoreText1.text = TEXT_SCORE + iScore;
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
        $(s_oMain).trigger("save_score",[iScore]);
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onExit();
    };
    
    this._init(oSpriteBg);
    
    return this;
}
