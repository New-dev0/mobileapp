function CCell(iRow,iCol,iX,iY,oParentContainer,state){
    var _iRow;
    var _iCol;
    var _iX;
    var _iY;
    var _szValue;
    var _oSourceImage;
    
    var _oCell;
    
    this._init = function(iRow,iCol,iX,iY,oParentContainer,state){
        _iRow = iRow;
        _iCol = iCol;
        _iX = iX;
        _iY = iY;
        _oSourceImage = s_oSpriteLibrary.getSprite("snake_sprites");
        
        var oData = {   
                        images: [_oSourceImage], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_WIDTH, height: CELL_HEIGHT, regX: CELL_WIDTH/2, regY: CELL_HEIGHT/2}, 
                        animations: {background:[0], wall1:[1], wall2:[2], wall3:[3], wall4:[4], wall5:[5], head:[6], body:[7], tail:[8], curves:[9], eating:[10], mouth_opened:[11], apple:[12], cherry:[13], pear:[14], orange:[15], grapes:[16], strawberry:[17]}
                    };
                    
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oCell = createSprite(oSpriteSheet, state, 0, 0, CELL_WIDTH, CELL_HEIGHT);
        _oCell.x = iX;
        _oCell.y = iY;
        _oCell.rotation = 0;
        _szValue = state;
        oParentContainer.addChild(_oCell);
    };
    
    this.changeCellState = function(iPrecDir, _iDir, szState){
        if(_iDir === RIGHT_DIR){       
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            if(iPrecDir === DOWN_DIR && szState === 'curves'){
                _oCell.scaleY = -1;
            }else if(iPrecDir === UP_DIR && szState === 'curves'){
                _oCell.scaleY = 1;
            }
        }else if(_iDir === UP_DIR){     
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 270;
            if(iPrecDir === RIGHT_DIR && szState === 'curves'){
                _oCell.scaleY = -1;
            }else if(iPrecDir === LEFT_DIR && szState === 'curves'){
                _oCell.scaleY = 1;
            }
        }else if(_iDir === LEFT_DIR){   
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 180;
            if(iPrecDir === UP_DIR && szState === 'curves'){
                _oCell.scaleY = -1;
            }else if(iPrecDir === DOWN_DIR && szState === 'curves'){
                _oCell.scaleY = 1;
            }
        }else if(_iDir === DOWN_DIR){   
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 90;
            if(iPrecDir === LEFT_DIR && szState === 'curves'){
                _oCell.scaleY = -1;
            }else if(iPrecDir === RIGHT_DIR && szState === 'curves'){
                _oCell.scaleY = 1;
            }
        }else if(szState === 'apple'){  
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            _oCell.scaleY = 1;
            _oCell.scaleX = 1;
        }else if(szState === 'cherry'){  
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            _oCell.scaleY = 1;
            _oCell.scaleX = 1;
        }else if(szState === 'pear'){  
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            _oCell.scaleY = 1;
            _oCell.scaleX = 1;
        }else if(szState === 'grapes'){  
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            _oCell.scaleY = 1;
            _oCell.scaleX = 1;
        }else if(szState === 'orange'){  
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            _oCell.scaleY = 1;
            _oCell.scaleX = 1;
        }else if(szState === 'strawberry'){  
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            _oCell.scaleY = 1;
            _oCell.scaleX = 1;
        }else if(szState === 'background'){                         
            _oCell.rotation = 0;
            _oCell.gotoAndStop(szState);
            _oCell.rotation = 0;
            _oCell.scaleY = 1;
            _oCell.scaleX = 1;
        }
        
        _szValue=szState;
        if(CGame._bChangeDir){
            CGame._bChangeDir = false;
        }
    };
    
    this._deathEffect = function(oContainer, oEndPanel, iScore){
        createjs.Tween.get(oContainer).to({alpha:0 }, 200).call(function() {    createjs.Tween.get(oContainer).to({alpha:1 }, 200).call(function() {
                                                                                    createjs.Tween.get(oContainer).to({alpha:0 }, 200).call(function() {
                                                                                        createjs.Tween.get(oContainer).to({alpha:1 }, 200).call(function() {
                                                                                            createjs.Tween.get(oContainer).to({alpha:0 }, 200).call(function() {
                                                                                            oEndPanel.show(iScore);
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
    };
    
    this.getValue = function(){
        return _szValue;
    };
    
    this._init(iRow,iCol,iX,iY,oParentContainer,state);
    
}