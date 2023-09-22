function CLevelMenu(){
    
    var _bNumActive;
    
    var _oDifficultyText;
    var _aMode = new Array();
    var _oModeNumOff;
    var _oModeNumOn;
    
    var _oBg;
    var _oButExit;
    var _oAudioToggle;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    
    this._init = function(){
        
        _bNumActive = false;
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        s_oStage.addChild(_oBg);
        _oDifficultyText = new createjs.Text(TEXT_LEVEL," 80px "+FONT, "#600101");
        _oDifficultyText.x = CANVAS_WIDTH/2;
        _oDifficultyText.y = 290;
        _oDifficultyText.textAlign = "center";
        _oDifficultyText.textBaseline = "alphabetic";
        _oDifficultyText.lineWidth = 1000;
        _oDifficultyText.outline = 8;
        s_oStage.addChild(_oDifficultyText);
        
        _oDifficultyText = new createjs.Text(TEXT_LEVEL," 80px "+FONT, "#ffffff");
        _oDifficultyText.x = CANVAS_WIDTH/2;
        _oDifficultyText.y = 290;
        _oDifficultyText.textAlign = "center";
        _oDifficultyText.textBaseline = "alphabetic";
        _oDifficultyText.lineWidth = 1000;
        s_oStage.addChild(_oDifficultyText);
        
        var oModePos = {x: CANVAS_WIDTH/2, y: 370};
        
        var offset_x = 0;
        var offset_y = 0;
        
        for(var i = 0; i < LEVEL_NUM; i++, offset_x += 150 ){
            if(offset_x > 800){
                offset_x = 0;
                offset_y += 150;
            }

            if( i < s_iLevel){
                _aMode.push(new CLevelBut((oModePos.x - 375)+offset_x,oModePos.y+offset_y, s_oSpriteLibrary.getSprite('Level_Sprite'),true,i+1));
            }else{
                _aMode.push(new CLevelBut((oModePos.x - 375)+offset_x,oModePos.y+offset_y, s_oSpriteLibrary.getSprite('Level_Sprite'),false,i+1));
            }
            _aMode[i].addEventListenerWithParams(ON_MOUSE_UP, this._onClick, this, i);
            
            s_bFirstTime = true;
        }
        
        
        var oExitX;        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 70, y: (oSprite.height/2) + 50};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2)- 190;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 50};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };  
    
    this.unload = function(){
        for(var i = 0; i < LEVEL_NUM; i++ ){
            _aMode[i].unload();
        }
        s_oLevelMenu = null;
        s_oStage.removeAllChildren();        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }        
    };
    
    this._onNumModeToggle = function(iData){
        if(iData === NUM_ACTIVE){
            _bNumActive = true;
            _oModeNumOff.setActive(false);
            _oModeNumOn.setActive(true);
            
        }else {
            _bNumActive = false;
            _oModeNumOff.setActive(true);
            _oModeNumOn.setActive(false);
        }
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onClick = function(i){
            var level = i;
            var clickable = _aMode[i].ifClickable();
            if(clickable){
                s_oLevelMenu.unload();
                s_oMain.gotoGame(ADVENTURE_MODE, level);
            }
            
    };
    
    this._onModeAdventure = function(){
            _oMode.setActive(true);
    };
     
    this._onExit = function(){
        s_oLevelMenu.unload();
        s_oMain.gotoMenu();
    };   
    
    
    s_oLevelMenu = this;        
    this._init();
    
    
    
};

var s_oLevelMenu = null;