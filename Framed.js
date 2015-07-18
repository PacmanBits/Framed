var Framed = {};

(function()
{
	var funcs    = {}   ;
	var lastTime = null ;
	var timer    = null ;
	
	var ID = 0;
	
	var fpsEl = $(document.createElement("div"))
		.css({
			position   : "fixed",
			top        : 0,
			right      : 0,
			color      : "black",
			fontFamily : "\"Courier New\", monospace"
		})
	;
	
	$(function() { fpsEl.appendTo($("body")); });
	
	var fpsID;
	
	Framed.AddOnFrameHandler = function(func)
	{
		if(funcsEmpty())
			StartFrames();
		
		ID++;
		
		funcs[ID] = func;
		
		return ID;
	};
	
	Framed.RemoveOnFrameHandler = function(ID)
	{
		if(funcs[ID])
			delete funcs[ID];
		
		if(funcsEmpty())
			StopFrames();
	};
	
	Framed.ShowFPS = function()
	{
		fpsEl.show();
		
		fpsID = Framed.AddOnFrameHandler(function(dt)
		{
			fpsEl.text(Math.round(1000 / dt) + " fps");
		});
	};
	
	Framed.HideFPS = function()
	{
		Framed.RemoveOnFrameHandler(fpsID);
		
		fpsEl.hide();
		
		fpsID = null;
	};
	
	Framed.FPSColor = function(color)
	{
		fpsEl.css("color", color);
	}
	
	function funcsEmpty()
	{
		for(var f in funcs)
			return false;
		
		return true;
	}
	
	function StartFrames()
	{
		if(timer)
			StopFrames();
		
		lastTime = new Date();
		timer = setInterval(OnFrame, 0);
	}
	
	function StopFrames()
	{
		clearInterval(timer);
		timer = null;
	}
	
	function OnFrame()
	{
		var now = new Date();
		var diff = now - lastTime;
		
		lastTime = now;
		
		for(var f in funcs)
			funcs[f](diff);
	}
})();