function CNextLevel(oSpriteBg, iLevel, mode,iScore){
    
    var _oBg;
    var _oGroup;

    var _oMsgText;
    var _oMsgText1;
    
    this._init = function(oSpriteBg,iScore){
        
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = 0;
        _oBg.y = 0;
        _oGroup.addChild(_oBg);
        
        _oMsgText = new createjs.Text(""," 60px "+FONT, "#600101");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/3+150);
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 700; 
        _oMsgText.outline = 8;
        _oGroup.addChild(_oMsgText);
        
        _oMsgText1 = new createjs.Text(""," 60px "+FONT, "#ffffff");
        _oMsgText1.x = CANVAS_WIDTH/2;
        _oMsgText1.y = (CANVAS_HEIGHT/3+150);
        _oMsgText1.textAlign = "center";
        _oMsgText1.textBaseline = "alphabetic";
        _oMsgText1.lineWidth = 700;     
        _oGroup.addChild(_oMsgText1);

        s_oStage.addChild(_oGroup);
        
        this.show(iLevel,iScore);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iLevel,iScore){
        if(mode === ADVENTURE_MODE){
            if(iLevel > 0){
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                    createjs.Sound.play("level_complete");
                }
                
                $(s_oMain).trigger("end_level",iScore);
            }
            var _oMsgLevel = new createjs.Text("LEVEL: "+(iLevel+1)," 100px "+FONT, "#600101");
            _oMsgLevel.x = CANVAS_WIDTH/2;
            _oMsgLevel.y = (CANVAS_HEIGHT/3);
            _oMsgLevel.textAlign = "center";
            _oMsgLevel.textBaseline = "alphabetic";
            _oMsgLevel.outline = 8;
            _oGroup.addChild( _oMsgLevel );
            
            _oMsgLevel = new createjs.Text("LEVEL: "+(iLevel+1)," 100px "+FONT, "#ffffff");
            _oMsgLevel.x = CANVAS_WIDTH/2;
            _oMsgLevel.y = (CANVAS_HEIGHT/3);
            _oMsgLevel.textAlign = "center";
            _oMsgLevel.textBaseline = "alphabetic";
            _oGroup.addChild( _oMsgLevel );
            
            _oMsgText.text = TEXT_SCORE_FOR_NEXT_LEVEL;
            _oMsgText1.text = TEXT_SCORE_FOR_NEXT_LEVEL;
            
        }else if(mode === SURVIVAL_MODE){
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("level_complete");
            }
            _oMsgText.text = TEXT_SURVIVAL;
            _oMsgText.x = CANVAS_WIDTH/2;
            _oMsgText.y = (CANVAS_HEIGHT/3+50);
            _oMsgText1.text = TEXT_SURVIVAL;
            _oMsgText1.x = CANVAS_WIDTH/2;
            _oMsgText1.y = (CANVAS_HEIGHT/3+50);
            
        }
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onNextLevelExit();
    };
    
    this._init(oSpriteBg,iScore);
    
    return this;
}
