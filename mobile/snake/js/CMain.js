function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;
    var newUrl = "/games/snake/";

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound(newUrl+"/sounds/snake_soundtrack.ogg", "soundtrack");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_press_but.ogg", "click");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_game_over.ogg", "game_over");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_appear_fruits.ogg", "appear_fruit");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_eating.ogg", "eating");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_goal.ogg", "goal");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_level_complete.ogg", "level_complete");

        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound(newUrl+"./sounds/snake_soundtrack.mp3", "soundtrack");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_press_but.mp3", "click");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_game_over.mp3", "game_over");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_appear_fruits.mp3", "appear_fruit");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_eating.mp3", "eating");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_goal.mp3", "goal");
                createjs.Sound.registerSound(newUrl+"./sounds/snake_level_complete.mp3", "level_complete");
        }
        
        RESOURCE_TO_LOAD += 7;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("msg_box",newUrl+"./sprites/msg_box.png");
        
        s_oSpriteLibrary.addSprite("bg_menu",newUrl+"./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_top",newUrl+"./sprites/bg_top.png");
        s_oSpriteLibrary.addSprite("bg_bottom",newUrl+"./sprites/bg_bottom.jpg");
        
        s_oSpriteLibrary.addSprite("but_exit",newUrl+"./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon",newUrl+"./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("survival",newUrl+"./sprites/survival.png");
        s_oSpriteLibrary.addSprite("adventure",newUrl+"./sprites/adventure.png");
        s_oSpriteLibrary.addSprite("Level_Sprite",newUrl+"./sprites/levelsprite.png");

        s_oSpriteLibrary.addSprite("time_display",newUrl+"./sprites/time_display.png");
        s_oSpriteLibrary.addSprite("but_timer",newUrl+"./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("snake_sprites",newUrl+"./sprites/snake_sprites.png");
        
        s_oSpriteLibrary.addSprite("left",newUrl+"./sprites/left.png");
        s_oSpriteLibrary.addSprite("up",newUrl+"./sprites/up.png");
        s_oSpriteLibrary.addSprite("down",newUrl+"./sprites/down.png");
        s_oSpriteLibrary.addSprite("right",newUrl+"./sprites/right.png");
        
        s_oSpriteLibrary.addSprite("left_mobile",newUrl+"./sprites/left_mobile.png");
        s_oSpriteLibrary.addSprite("up_mobile",newUrl+"./sprites/up_mobile.png");
        s_oSpriteLibrary.addSprite("down_mobile",newUrl+"./sprites/down_mobile.png");
        s_oSpriteLibrary.addSprite("right_mobile",newUrl+"./sprites/right_mobile.png");
        
        s_oSpriteLibrary.addSprite("cherry",newUrl+"./sprites/cherry.png");
        s_oSpriteLibrary.addSprite("pear",newUrl+"./sprites/pear.png");
        s_oSpriteLibrary.addSprite("grapes",newUrl+"./sprites/grapes.png");
        s_oSpriteLibrary.addSprite("orange",newUrl+"./sprites/orange.png");
        s_oSpriteLibrary.addSprite("strawberry",newUrl+"./sprites/strawberry.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoLevelMenu = function(){
        
        s_oLevelMenu = new CLevelMenu();
        
        _iState = STATE_MENU;
    };    
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    }; 
    this.gotoGame = function(iMode, iLevel){
        s_iMode = iMode;
        s_iLevel = iLevel;
        
        _oGame = new CGame(iMode, iLevel,_oData);   						
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
	this.stopUpdate = function(){
		_bUpdate = false;
	};
	
	this.startUpdate = function(){
		_bUpdate = true;
	};
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }

        if(_iState === STATE_GAME){
            _oGame.update();
        }

        s_oStage.update(event);
       
    };
    
    s_oMain = this;
    
    _oData = oData;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iMode;
var s_iLevel = 1;
var s_szImage;
var s_oLevelMenu;
var s_oLevelSetting;
var s_bFirstTime = false;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack;
var s_oCanvas;
