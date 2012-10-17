//global setting
var stagearr = {};
var GSCALE;
//var bmpAnim = {};
stage_index = 0;
Ticker.setFPS(30);
function stop() {
	Ticker.removeListener(window);
}
function tick() {
	for(idx in stagearr){
		//alert(idx);
		stagearr[idx].update();
	}
}
Ticker.addListener(window);
//divisor = window.devicePixelRatio;
if(window.devicePixelRatio&&0){ //tempporarily disable
	PIXELRATIO = window.devicePixelRatio;
}
else{
	PIXELRATIO = 2;
}


GSCALE = 1 / PIXELRATIO; //because we are working on HD for 640 x 960


/**********************************************************************************************/

/*
 canvas = jQuery("#canvas");
 canvasImageFit(canvas, "images/callus.png");
 */
function canvasImageFit(canvas, filename, funcx) {
	img = new Image();
	img.src = filename;
	img.onload = function() {
		regX = 0;
		regY = 0;
		elemWH(canvas, this.width, this.height);
        
		if(canvas.hasClass("scale")) {
			elemScale(canvas);
		}
		json = {
			"images": [this.src],
			"frames": {
				"width": this.width,
				"height": this.height,
				"count": 1,
				"regX": regX,
				"regY": regY
			},
			"animations": {"start": [0], "end": [0]}
		};
		anim = new mm_animation(canvas.attr("id"), json);
		anim.play("start");
		funcx();
	}
	
}


function canvasImage(canvas, filename, left, top){
	img = new Image();
	img.src = filename;
	img.onload = function() {
		regX = 0;
		regY = 0;
		
		if(left=='left'){
			regX = 0;
		}
		else if(left=='center'){
			if(this.width<canvas.width()){
				regX = -1*(canvas.width()/2)+(this.width/2);
			}
			else{
				regX = (this.width - canvas.width()) / 2;
			}
		}
		else if(left=='right'){
			if(this.width<canvas.width()){
				regX = -1*(canvas.width())+this.width;
			}
			else{
				regX = (this.width - canvas.width());
			}
		}
		else{
			regX = -1*left;
		}
		
		if(top=="top"){
			regY = 0;
		}
		else if(top=="middle"){
			if(this.height<canvas.height()){
				regY = -1*(canvas.height()/2)+(this.height/2);
			}
			else{
				regY = (this.height - canvas.height()) / 2;
			}
		}
		else if(top=='bottom'){
			if(this.height<canvas.height()){
				regY = -1*(canvas.height())+this.height;
			}
			else{
				regY = (this.height - canvas.height());
			}
		}
		else{
			regY = -1*top;
		}
		
		json = {
			"images": [this.src],
			"frames": {
				"width": this.width,
				"height": this.height,
				"count": 1,
				"regX": regX,
				"regY": regY
			},
			"animations": {"start": [0], "end": [0]}
		};
		anim = new mm_animation(canvas.attr("id"), json);
		anim.play("start");
	}
	
}

function elemAnimateIn(elem, func){
	var topx = elem.css("top");
	topx = topx.replace(/[^-\d\.]/g, '');
	elemTop(elem, 500);
	elem.css("opacity", 0);
	elem.animate({
                 top: topx-10,
                 opacity: 1
                 }, 500, function() {
                 elem.animate({
                              top: topx
                              }, 50, function() {
                              func();
                              });
                 });
}
function elemAnimateOut(elem, func){
	var topx = elem.css("top");
	topx = topx.replace(/[^-\d\.]/g, '');;
	elem.css("opacity", 100);
	elem.animate({
				 top: topx-10
				 }, 50, function() {
				 elem.animate({
							  top: 500,
							  opacity: 0
							  }, 500, function() {
							  func();
							  });
				 });
}

function elemScroll(elem, selector){
	elem.css("cursor", "pointer");
	elem.mousedown(function(){
                   jQuery(this).fadeTo(1,0.95);
                   });
	elem.mouseout(function(){
                  jQuery(this).fadeTo(1,1);
                  });
	elem.click(function(){
               try{
               myScroll.scrollToElement(selector, 500);
               }
               catch(e){
               }
               try{
               if(jQuery(selector)){
               destination = jQuery(selector).offset().top;
               jQuery("html,body").animate({ scrollTop: destination},"easeInQuad");
               }
               }
               catch(e){
               }
               });
}

function elemLink(elem, url){
	elem.css("cursor", "pointer");
	elem.mousedown(function(){
                   jQuery(this).fadeTo(1,0.95);
                   });
	elem.mouseout(function(){
                  jQuery(this).fadeTo(1,1);
                  });
    
	elem.click(function(){
			   self.location = url;
			   });
}

function elemMarginAuto(elem){
	elem.css("margin", "auto");
}

function elemRel(elem){
	elem.css("position", "relative");
}

function elemAbs(elem){
	elem.css("position", "absolute");
}

function elemWH(elem, w, h){
	if(w){
		elemW(elem, w);
	}
	if(h){
		elemH(elem, h);
	}
}

function elemH(elem, h){
	h = h.toString();
	if(h.indexOf("%")<0){ //if not percentage
		h = h+"px";
	}
	else{
		h = h.replace(/[^-\d\.]/g, '');
		h = h / 100;
		h = elem.parent().height() * h ;
	}
	elem.css("height", h);
	elem.attr("height", h);
}

function elemW(elem, w){
	w = w.toString();
	if(w.indexOf("%")<0){ //if not percentage
		w = w+"px";
	}
	else{
		w = w.replace(/[^-\d\.]/g, '');
		w = w / 100;
		w = elem.parent().width() * w ;
	}
	elem.css("width", w);
	elem.attr("width", w);
}

function elemBorder(elem, color){
	return 0;
	if(!color){
		elem.css("border", "1px dotted black");
	}
	else{
		elem.css("border", "1px dotted "+color);
	}
}

function elemFull(elem){
	fullHeight(elem);
	fullWidth(elem);
}

function elemFullH(elem){
	h = elem.parent().height();
	elem.height(h);
}

function elemFullW(elem){
	w = elem.parent().width();
	elem.width(w);
}
function elemZIndex(elem, n){
	elem.css("z-index", n);
}
function elemRight(elem, n){
	n = n.toString();
	if(n.indexOf("%")>=0){ //if percentage
		n = n.replace(/[^-\d\.]/g, '');
		n = n / 100;
		l = elem.parent().width() - (elem.width()+(elem.parent().width()*n));
	}
	else{
		n = n.replace(/[^-\d\.]/g, '');
		n = n * 1;
		l = elem.parent().width() - (elem.width()+n);
	}
	
	elem.css("left", l);
}
function elemLeft(elem, n){
	n = n.toString();
	if(n.indexOf("%")>=0){ //if percentage
		n = n.replace(/[^-\d\.]/g, '');
		n = n / 100;
		topx = elem.parent().height()*n;
	}
	else{
		n = n.replace(/[^-\d\.]/g, '');
		n = n * 1;
		l = n;
	}
	elem.css("left", l);
}
function elemBottom(elem, n){
	n = n.toString();
	if(n.indexOf("%")>=0){ //if percentage
		n = n.replace(/[^-\d\.]/g, '');
		n = n / 100;
		topx = elem.parent().height() - (elem.height()+(elem.parent().height()*n));
	}
	else{
		n = n.replace(/[^-\d\.]/g, '');
		n = n * 1;
		topx = elem.parent().height() - (elem.height()+n);
	}
	
	elem.css("top", topx);
}
function elemTop(elem, n){
	n = n.toString();
	if(n.indexOf("%")>=0){ //if percentage
		n = n.replace(/[^-\d\.]/g, '');
		n = n / 100;
		topx = elem.parent().height()*n;
	}
	else{
		n = n.replace(/[^-\d\.]/g, '');
		n = n * 1;
		topx = n;
	}
	elem.css("top", topx);
}
function elemMiddleAlign(elem){
	middle = elem.parent().height() / 2;
	topx = middle - elem.height() / 2;
	elem.css("top", topx);
}
function elemBottomAlign(elem){
	topx = elem.parent().height() - elem.height();
	elem.css("top", topx);
}
function elemTopAlign(elem){
	elem.css("top", 0);
}
function elemRightAlign(elem){
	left = elem.parent().width() - elem.width();
	elem.css("left", left);
}
function elemLeftAlign(elem){
	elem.css("left", 0);
}
function elemCenterAlign(elem){
	center = elem.parent().width() / 2;
	left = center - elem.width() / 2;
	elem.css("left", left);
}
function elemScale(elem, scale){
	if(!scale){
		scale = GSCALE;
	}
	w = elem.width();
	h = elem.height();
	l = elem.position().left;
	t = elem.position().top;
	font = elem.css("font-size").replace(/[^-\d\.]/g, '');
	padding = elem.css("padding-left").replace("px","");
	//console.log(elem.get(0).id + ":" +  w);
    
    // @todo Find a better solution
    if(elem.get(0).id == "main" || elem.get(0).id == "specs" || elem.get(0).id == "tab-menu"){
        w = w + (w*0.1);
    } 
    //console.log(elem.get(0).id + ":" +  w);
    elem.width(w*scale);
	elem.height(h*scale);
	elem.css("left", l*scale);
	elem.css("top", t*scale);
	elem.css("font-size", font*scale)
    elem.css("padding", padding*scale);
    
    
}
function scaleCanvases(scale){
	jQuery("canvas").each(function(){
						  scaleElem(jQuery(this), scale);
						  }
						  );
	
}
//class to create animations in canvas using easelJS and jQuery, json export from flash swf using ZOE
function mm_animation(idx, json) {
	
	//public variables
	this._idx = idx;
	this._json = json;
	
	//private variables
	var startrotate = false;
	var rotatespeed = 1;
	var maxrotate = 0;
	var speedskip = 0;
	var scale = 1;
	
	var canvas = document.getElementById(this._idx);
	
	var spriteSheet  = new SpriteSheet(this._json);
	var bmpAnim = new BitmapAnimation(spriteSheet);
	
	bmpAnim.onAnimationEnd = function(){
		bmpAnim.gotoAndPlay("end");
	};
	
	//public _anim object
	this._anim = bmpAnim;
	this._where = "";
	
	stagearr[this._idx] = new Stage(canvas);
	stagearr[this._idx].autoClear = true;
	stagearr[this._idx].addChild(bmpAnim);
	
	//animation controls
	this.play = function(where){
		if(where){
			this._where = where;
			this._anim.gotoAndPlay(where);
		}
		else{
			this._anim.gotoAndPlay(0);
		}
	}
	//this currently doesnt work
	this.stop = function(){
		bmpAnim.stop();
	}
	
	
	//rotation in animation
	//maxrotatex is still buggy
	this.startRotate = function (speed /*, maxrotatex*/){ // negative value is counter clockwise, maxrotate is the maximum degrees to rotate
		/*
		 if(maxrotatex){
		 maxrotate = maxrotatex;
		 }
		 */
		if(speed){
			rotatespeed = speed/10;
		}
		startrotate = true;
	}
	this.stopRotate = function (speed){
		startrotate = false;
	}
	this._anim.onTick = function(){
		if(startrotate){
			bmpAnim.rotation += rotatespeed;
			bmpAnim.rotation = bmpAnim.rotation%360;
			//maxrotatex is still buggy
			/*
			 if(maxrotate!=0){
			 if(Math.abs(bmpAnim.rotation)>=Math.abs(maxrotate)){
			 bmpAnim.rotation = maxrotate;
			 startrotate = false;
			 }
			 }
			 */
		}
	}
	
	//scaling in animation
	this.scaleAnim = function (scalex){
		if(!scalex){
			scalex = 1;
		}
		bmpAnim.scaleX = scalex;
		bmpAnim.regX *= scalex;
		bmpAnim.x *= scalex;
		bmpAnim.scaleY = scalex;
		bmpAnim.regY *= scalex;
		bmpAnim.y *= scalex;
	}
	
	//position of anim in canvas
	this.centerAnim = function (){
		w = jQuery("#"+this._idx).width() / 2;
		l = w - (this._json.frames.width / 2);
		bmpAnim.x = l + this._json.frames.regX;
	}
	this.leftAnim = function (){
		bmpAnim.x = this._json.frames.regX;
	}
	this.rightAnim = function (){
		w = jQuery("#"+this._idx).width();
		bmpAnim.x = w - this._json.frames.regX;
	}
	this.middleAnim = function (){
		h = jQuery("#"+this._idx).height() / 2;
		t = h - (this._json.frames.height / 2);
		bmpAnim.y = t + this._json.frames.regY;
	}
	this.top = function (n){
		bmpAnim.y = n;
	}
	this.topAnim = function (){
		bmpAnim.y = this._json.frames.regY;
	}
	this.bottomAnim = function (){
		h = jQuery("#"+this._idx).height();
		bmpAnim.y = h - this._json.frames.regY;
	}
}

function popPanel(n){
	return 0;
	jQuery("#scroller .scale").each(function(){
                                    elemScale(jQuery(this), .5);
                                    }
                                    );
	return 0;
	jQuery("#scroller .scale").each(function(){
                                    elemScale(jQuery(this), 1.1);
                                    }
                                    );
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.09);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.08);
									}
									);
	
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.07);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.06);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.05);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.04);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.03);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.02);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.01);
									}
									);
	jQuery("#scroller .scale").each(function(){
									elemScale(jQuery(this), 1.0);
									}
									);
	
	
	/*
	 setTimeout(function(){
	 
	 popPanel(n);
	 },100);
	 */
	
}