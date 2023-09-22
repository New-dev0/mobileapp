function CInterface(){
    
    var _oAudioToggle;
    var _oButTimer;
    var _oButExit;
    var _oTimePane;   //bonus timer
    var _oTimerLevelPane;   //level timer
    var _oScorePane;
    var _oScoreNum;
    var _oGoalPane;
    var _oTimeNum;
    var _aText = new Array();
    var _aText1 = new Array();
    var _oTimerLevelNum;

    var _oContainerTimerBonus;
    var _oContainerTimerLevel;
    var _oContainerGoal;
    
    var _oTimerLevelNum1;
    var _oScoreNum1;
    var _oTimeNum1;
    
    var _oHelpPanel=null;

    var _oButMovementUp;
    var _oButMovementRight;
    var _oButMovementDown;
    var _oButMovementLeft;
    var _oButMovementUp1;
    var _oButMovementRight1;
    var _oButMovementDown1;
    var _oButMovementLeft1;
        
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosButtonUp;
    var _pStartPosButtonRight;
    var _pStartPosButtonDown;
    var _pStartPosButtonLeft;
    var _pStartPosButtonUp1;
    var _pStartPosButtonRight1;
    var _pStartPosButtonDown1;
    var _pStartPosButtonLeft1;
    
    
    this._init = function(){                
        var oExitX;        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.width/2)-10, y: (oSprite.height/2)+10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2)-110;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2)+10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_timer');
        _oButTimer = new CGfxButton(_pStartPosAudio.x - 100, _pStartPosAudio.y+50, oSprite, s_oStage);
        _oButTimer.addEventListener(ON_MOUSE_UP, this._onTimer, this);
        

        var _oButPos = {x:CANVAS_WIDTH/2, y: 70};

        var oScoreSprite = s_oSpriteLibrary.getSprite('time_display');
        _oScorePane = createBitmap(oScoreSprite);
        _oScorePane.x = _oButPos.x-500;
        _oScorePane.y = _oButPos.y;
        s_oStage.addChild(_oScorePane);
        
        _oScoreNum = new createjs.Text("0","bold 50px "+FONT, "#600101");
        _oScoreNum.x = _oButPos.x - 390;
        _oScoreNum.y = _oButPos.y + 55;
        _oScoreNum.textAlign = "center";
        _oScoreNum.textBaseline = "alphabetic";
        _oScoreNum.outline = 8;
        s_oStage.addChild(_oScoreNum);
        
        _oScoreNum1 = new createjs.Text("0","bold 50px "+FONT, "#ffffff");
        _oScoreNum1.x = _oButPos.x - 390;
        _oScoreNum1.y = _oButPos.y + 55;
        _oScoreNum1.textAlign = "center";
        _oScoreNum1.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreNum1);
        
        _oContainerTimerBonus = new createjs.Container();
        s_oStage.addChild(_oContainerTimerBonus);

        var oTimerBonusSprite = s_oSpriteLibrary.getSprite('time_display');
        _oTimePane = createBitmap(oTimerBonusSprite);
        _oTimePane.x = _oButPos.x-100;
        _oTimePane.y = _oButPos.y;
        _oContainerTimerBonus.addChild(_oTimePane);

        _oTimeNum = new createjs.Text("00:00","bold 50px "+FONT, "#600101");
        _oTimeNum.x = _oButPos.x + 15;
        _oTimeNum.y = _oButPos.y +55;
        _oTimeNum.textAlign = "center";
        _oTimeNum.textBaseline = "alphabetic";
        _oTimeNum.outline = 8;
        _oContainerTimerBonus.addChild(_oTimeNum);
        
        _oTimeNum1 = new createjs.Text("00:00","bold 50px "+FONT, "#ffffff");
        _oTimeNum1.x = _oButPos.x +15;
        _oTimeNum1.y = _oButPos.y +55;
        _oTimeNum1.textAlign = "center";
        _oTimeNum1.textBaseline = "alphabetic";
        _oContainerTimerBonus.addChild(_oTimeNum1);
        
        this.setContainerVisible( false);
        
        _oContainerTimerLevel = new createjs.Container();
        s_oStage.addChild(_oContainerTimerLevel);

        var oTimerSprite = s_oSpriteLibrary.getSprite('time_display');
        _oTimerLevelPane = createBitmap(oTimerSprite);
        _oTimerLevelPane.x = _oButPos.x +275;
        _oTimerLevelPane.y = _oButPos.y;
        _oContainerTimerLevel.addChild(_oTimerLevelPane);

        _oTimerLevelNum = new createjs.Text("00:00","bold 50px "+FONT, "#600101");
        _oTimerLevelNum.x = _oButPos.x + 390;
        _oTimerLevelNum.y = _oButPos.y + 55;
        _oTimerLevelNum.textAlign = "center";
        _oTimerLevelNum.textBaseline = "alphabetic";
        _oTimerLevelNum.outline = 8;
        _oContainerTimerLevel.addChild(_oTimerLevelNum);
        
        _oTimerLevelNum1 = new createjs.Text("00:00","bold 50px "+FONT, "#ffffff");
        _oTimerLevelNum1.x = _oButPos.x + 390;
        _oTimerLevelNum1.y = _oButPos.y + 55;
        _oTimerLevelNum1.textAlign = "center";
        _oTimerLevelNum1.textBaseline = "alphabetic";
        _oContainerTimerLevel.addChild(_oTimerLevelNum1);
       
        this.setButVisible(true);
        
        
        
        //BUTTON ON THE RIGHT
        if(s_bMobile && !isTablet()){
            var oSprite = s_oSpriteLibrary.getSprite('left_mobile');
            _pStartPosButtonLeft = {x: CANVAS_WIDTH - 335, y: oSprite.height + 880};
            _oButMovementLeft = new CGfxButton(_pStartPosButtonLeft.x, _pStartPosButtonLeft.y, oSprite, s_oStage);
            _oButMovementLeft.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'left');

            var oSprite = s_oSpriteLibrary.getSprite('up_mobile');
            _pStartPosButtonUp = {x: CANVAS_WIDTH - 200, y: oSprite.height + 745};
            _oButMovementUp = new CGfxButton(_pStartPosButtonUp.x, _pStartPosButtonUp.y, oSprite, s_oStage);
            _oButMovementUp.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'up');

            var oSprite = s_oSpriteLibrary.getSprite('right_mobile');
            _pStartPosButtonRight = {x: CANVAS_WIDTH - 65, y: oSprite.height + 880};
            _oButMovementRight = new CGfxButton(_pStartPosButtonRight.x, _pStartPosButtonRight.y, oSprite, s_oStage);
            _oButMovementRight.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'right');

            var oSprite = s_oSpriteLibrary.getSprite('down_mobile');
            _pStartPosButtonDown = {x: CANVAS_WIDTH - 200, y: oSprite.height + 880};
            _oButMovementDown = new CGfxButton(_pStartPosButtonDown.x, _pStartPosButtonDown.y, oSprite, s_oStage);
            _oButMovementDown.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'down');

            //BUTTON ON THE LEFT
            var oSprite = s_oSpriteLibrary.getSprite('left_mobile');
            _pStartPosButtonLeft1 = {x: CANVAS_WIDTH - 1850, y: oSprite.height + 880};
            _oButMovementLeft1 = new CGfxButton(_pStartPosButtonLeft1.x-1575, _pStartPosButtonLeft1.y, oSprite, s_oStage);
            _oButMovementLeft1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'left');

            var oSprite = s_oSpriteLibrary.getSprite('up_mobile');
            _pStartPosButtonUp1 = {x: CANVAS_WIDTH - 1715, y: oSprite.height + 745};
            _oButMovementUp1 = new CGfxButton(_pStartPosButtonUp1.x, _pStartPosButtonUp1.y, oSprite, s_oStage);
            _oButMovementUp1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'up');

            var oSprite = s_oSpriteLibrary.getSprite('right_mobile');
            _pStartPosButtonRight1 = {x: CANVAS_WIDTH - 1580, y: oSprite.height + 880};
            _oButMovementRight1 = new CGfxButton(_pStartPosButtonRight1.x, _pStartPosButtonRight1.y, oSprite, s_oStage);
            _oButMovementRight1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'right');

            var oSprite = s_oSpriteLibrary.getSprite('down_mobile');
            _pStartPosButtonDown1 = {x: CANVAS_WIDTH - 1715, y: oSprite.height + 880};
            _oButMovementDown1 = new CGfxButton(_pStartPosButtonDown1.x, _pStartPosButtonDown1.y, oSprite, s_oStage);
            _oButMovementDown1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'down');
            
        }else{
            var oSprite = s_oSpriteLibrary.getSprite('left');
            _pStartPosButtonLeft = {x: CANVAS_WIDTH - 275, y: oSprite.height + 900};
            _oButMovementLeft = new CGfxButton(_pStartPosButtonLeft.x, _pStartPosButtonLeft.y, oSprite, s_oStage);
            _oButMovementLeft.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'left');

            var oSprite = s_oSpriteLibrary.getSprite('up');
            _pStartPosButtonUp = {x: CANVAS_WIDTH - 170, y: oSprite.height + 795};
            _oButMovementUp = new CGfxButton(_pStartPosButtonUp.x, _pStartPosButtonUp.y, oSprite, s_oStage);
            _oButMovementUp.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'up');

            var oSprite = s_oSpriteLibrary.getSprite('right');
            _pStartPosButtonRight = {x: CANVAS_WIDTH - 65, y: oSprite.height + 900};
            _oButMovementRight = new CGfxButton(_pStartPosButtonRight.x, _pStartPosButtonRight.y, oSprite, s_oStage);
            _oButMovementRight.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'right');

            var oSprite = s_oSpriteLibrary.getSprite('down');
            _pStartPosButtonDown = {x: CANVAS_WIDTH - 170, y: oSprite.height + 900};
            _oButMovementDown = new CGfxButton(_pStartPosButtonDown.x, _pStartPosButtonDown.y, oSprite, s_oStage);
            _oButMovementDown.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'down');

            //BUTTON ON THE LEFT
            var oSprite = s_oSpriteLibrary.getSprite('left');
            _pStartPosButtonLeft1 = {x: CANVAS_WIDTH - 1850, y: oSprite.height + 900};
            _oButMovementLeft1 = new CGfxButton(_pStartPosButtonLeft1.x-1575, _pStartPosButtonLeft1.y, oSprite, s_oStage);
            _oButMovementLeft1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'left');

            var oSprite = s_oSpriteLibrary.getSprite('up');
            _pStartPosButtonUp1 = {x: CANVAS_WIDTH - 1745, y: oSprite.height + 795};
            _oButMovementUp1 = new CGfxButton(_pStartPosButtonUp1.x, _pStartPosButtonUp1.y, oSprite, s_oStage);
            _oButMovementUp1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'up');

            var oSprite = s_oSpriteLibrary.getSprite('right');
            _pStartPosButtonRight1 = {x: CANVAS_WIDTH - 1640, y: oSprite.height + 900};
            _oButMovementRight1 = new CGfxButton(_pStartPosButtonRight1.x, _pStartPosButtonRight1.y, oSprite, s_oStage);
            _oButMovementRight1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'right');

            var oSprite = s_oSpriteLibrary.getSprite('down');
            _pStartPosButtonDown1 = {x: CANVAS_WIDTH - 1745, y: oSprite.height + 900};
            _oButMovementDown1 = new CGfxButton(_pStartPosButtonDown1.x, _pStartPosButtonDown1.y, oSprite, s_oStage);
            _oButMovementDown1.addEventListenerWithParams(ON_MOUSE_DOWN, this._onDirectionPressed, this, 'down');
        }
        
        _oContainerGoal = new createjs.Container();
        s_oStage.addChild(_oContainerGoal);
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this._onDirectionPressed = function( szDirection ){
        var _iDirection;
        if(szDirection === 'left'){
            _iDirection = 37;
            _bPressed = true;
        }else if(szDirection === 'up'){
            _iDirection = 38;
            _bPressed = true;
        }else if(szDirection === 'right'){
            _iDirection = 39;
            _bPressed = true;
        }else if(szDirection === 'down'){
            _iDirection = 40;
            _bPressed = true;
        }
        s_oGame._onButtonDirDown(_iDirection);
    };
    
    this._onDirectionLeave = function(  ){
        _bPressed = false;
    };
    
    this.seeGoal = function(szSprite, num, numEated, off_x, off_y){
        
        
        var oGoalSprite = s_oSpriteLibrary.getSprite(szSprite);
        _oGoalPane = createBitmap(oGoalSprite);
        _oGoalPane.x = off_x;
        _oGoalPane.y = off_y;
        _oContainerGoal.addChild(_oGoalPane);
        
        _aText.push(new createjs.Text(numEated+"/"+num,"bold 40px "+FONT, "#600101"));
        _aText[_aText.length-1].x = off_x + 70;
        _aText[_aText.length-1].y = off_y + 35;
        _aText[_aText.length-1].textAlign = "left";
        _aText[_aText.length-1].textBaseline = "alphabetic";
        _aText[_aText.length-1].outline = 8;
        _oContainerGoal.addChild(_aText[_aText.length - 1]);
        
        _aText1.push(new createjs.Text(numEated+"/"+num,"bold 40px "+FONT, "#ffffff"));
        _aText1[_aText1.length-1].x = off_x + 70;
        _aText1[_aText1.length-1].y = off_y + 35;
        _aText1[_aText1.length-1].textAlign = "left";
        _aText1[_aText1.length-1].textBaseline = "alphabetic";
        _oContainerGoal.addChild(_aText1[_aText1.length - 1]);
    };
    
    this.seeGoalLeft = function( num, numEated, i){
        _aText[i].text = numEated+"/"+num;
        _aText1[i].text = numEated+"/"+num;
    };
    
    this.resetGoalInterface = function(){
        _aText = [];
        _aText1 = [];
        _oContainerGoal.removeAllChildren();
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        _oButTimer.unload();
        _oButExit.unload();
        if(_oHelpPanel!==null){
            _oHelpPanel.unload();
        }
        s_oInterface = null;
    };
        
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }        
        _oButTimer.setPosition((_pStartPosAudio.x)-100 - iNewX,iNewY + _pStartPosAudio.y);
        
        _oButMovementUp.setPosition(_pStartPosButtonUp.x - iNewX,_pStartPosButtonUp.y - iNewY);
        _oButMovementRight.setPosition(_pStartPosButtonRight.x - iNewX,_pStartPosButtonRight.y - iNewY);
        _oButMovementDown.setPosition(_pStartPosButtonDown.x - iNewX, _pStartPosButtonDown.y - iNewY);
        _oButMovementLeft.setPosition(_pStartPosButtonLeft.x - iNewX,_pStartPosButtonLeft.y - iNewY);
        _oButMovementUp1.setPosition(_pStartPosButtonUp1.x + iNewX,_pStartPosButtonUp1.y - iNewY);
        _oButMovementRight1.setPosition(_pStartPosButtonRight1.x + iNewX,_pStartPosButtonRight1.y - iNewY);
        _oButMovementDown1.setPosition(_pStartPosButtonDown1.x + iNewX,_pStartPosButtonDown1.y - iNewY);
        _oButMovementLeft1.setPosition(_pStartPosButtonLeft1.x + iNewX,_pStartPosButtonLeft1.y - iNewY);
    };
    
    this.setButVisible = function(bVal){

        _oButTimer.setVisible(bVal);

    };
    
    this.setContainerVisible = function(  bVal ){

        _oContainerTimerBonus.visible = bVal;

    };
    
    this.setTimerContainerVisible = function(  bVal ){

        _oContainerTimerLevel.visible = bVal;

    };
    
    this.refreshTime = function(iValue){
        _oTimeNum.text = iValue;
        _oTimeNum1.text = iValue;
    };
    
    this.refreshTimeLeft = function(iValue){
        _oTimerLevelNum.text = iValue;
        _oTimerLevelNum1.text = iValue;
    };
    
    this.refreshScore = function(iValue){
        _oScoreNum.text = iValue;
        _oScoreNum1.text = iValue;
    };

    this._onTimer = function(){
        s_oGame.onPause();
    };
    
    this._onRestart = function(){
        s_oGame.restartGame();
    };
    
    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        s_oGame.restartGame();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
      s_oGame.onExit();  
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;