function CMenu(){
    
    var _bNumActive;
    
    var _oDifficultyText;
    var _oModeSurvival;
    var _oModeAdventure;
    
    var _oBg;
    var _oAudioToggle;
    
    var _pStartPosAudio;
    
    this._init = function(){
        
        _bNumActive = false;
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        
        _oDifficultyText = new createjs.Text(TEXT_DIFFICULTY," 50px "+ FONT, "#600101");
        _oDifficultyText.x = CANVAS_WIDTH/2;
        _oDifficultyText.y = 170+650;
        _oDifficultyText.textAlign = "center";
        _oDifficultyText.textBaseline = "alphabetic";
        _oDifficultyText.lineWidth = 1000;
        _oDifficultyText.outline = 8;
        s_oStage.addChild(_oDifficultyText);
        
        _oDifficultyText = new createjs.Text(TEXT_DIFFICULTY," 50px "+ FONT, "#ffffff");
        _oDifficultyText.x = CANVAS_WIDTH/2;
        _oDifficultyText.y = 170+650;
        _oDifficultyText.textAlign = "center";
        _oDifficultyText.textBaseline = "alphabetic";
        _oDifficultyText.lineWidth = 1000;
        s_oStage.addChild(_oDifficultyText);
        
        var oModePos = {x: CANVAS_WIDTH/2, y: 825};
        
        var oSpriteSurvival = s_oSpriteLibrary.getSprite('survival');
        _oModeSurvival = new CToggle(oModePos.x - 400,oModePos.y,oSpriteSurvival,true);
        _oModeSurvival.addEventListener(ON_MOUSE_UP, this._onModeSurvival, this, 0);
        
        var oTextSurvival =  new createjs.Text("SURVIVAL","bold 50px "+FONT, "#600101");
        oTextSurvival.x = oModePos.x - 400;
        oTextSurvival.y = oModePos.y + 130;
        oTextSurvival.textAlign = "center";
        oTextSurvival.textBaseline = "alphabetic";
        oTextSurvival.outline = 8;
        s_oStage.addChild(oTextSurvival);
        
        var oTextSurvival =  new createjs.Text("SURVIVAL","bold 50px "+FONT, "#ffffff");
        oTextSurvival.x = oModePos.x - 400;
        oTextSurvival.y = oModePos.y + 130;
        oTextSurvival.textAlign = "center";
        oTextSurvival.textBaseline = "alphabetic";
        s_oStage.addChild(oTextSurvival);
        
        var oSpriteAdventure = s_oSpriteLibrary.getSprite('adventure');
        _oModeAdventure = new CToggle(oModePos.x + 400,oModePos.y,oSpriteAdventure,true);
        _oModeAdventure.addEventListener(ON_MOUSE_UP, this._onModeAdventure, this);
        
        var oTextAdventure =  new createjs.Text("ADVENTURE","bold 50px "+FONT, "#600101");
        oTextAdventure.x = oModePos.x + 400;
        oTextAdventure.y = oModePos.y + 130;
        oTextAdventure.textAlign = "center";
        oTextAdventure.textBaseline = "alphabetic";
        oTextAdventure.outline = 8;
        s_oStage.addChild(oTextAdventure);
        
        var oTextAdventure =  new createjs.Text("ADVENTURE","bold 50px "+FONT, "#ffffff");
        oTextAdventure.x = oModePos.x + 400;
        oTextAdventure.y = oModePos.y + 130;
        oTextAdventure.textAlign = "center";
        oTextAdventure.textBaseline = "alphabetic";
        s_oStage.addChild(oTextAdventure);
        
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            var oExitX = CANVAS_WIDTH - (oSprite.width/2)- 120;
            _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };  
    
    this.unload = function(){
        _oModeSurvival.unload();
        
        _oModeAdventure.unload();  

        s_oMenu = null;
        s_oStage.removeAllChildren();    
        
        $(s_oMain).trigger("session_start");
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }        
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onModeSurvival = function( level ){
            s_oMenu.unload();
            s_oMain.gotoGame(SURVIVAL_MODE, 0);
    };
    
    this._onModeAdventure = function(){
            s_oMenu.unload();
            
            s_oMain.gotoLevelMenu();
    };
          
    s_oMenu = this;        
    this._init();
    
    
};

var s_oMenu = null;