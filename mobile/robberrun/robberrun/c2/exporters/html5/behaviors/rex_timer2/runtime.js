// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
cr.behaviors.Rex_Timer2 = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var behaviorProto = cr.behaviors.Rex_Timer2.prototype;
		
	/////////////////////////////////////
	// Behavior type class
	behaviorProto.Type = function(behavior, objtype)
	{
		this.behavior = behavior;
		this.objtype = objtype;
		this.runtime = behavior.runtime;
	};

	var behtypeProto = behaviorProto.Type.prototype;

	behtypeProto.onCreate = function()
	{
        this.timeline = null;  
        this.timelineUid = -1;    // for loading
	};

    behtypeProto._timeline_get = function ()
    {
        if (this.timeline != null)
            return this.timeline;
    
        assert2(cr.plugins_.Rex_TimeLine, "Timer behavior: Can not find timeline oject.");
        var plugins = this.runtime.types;
        var name, inst;
        for (name in plugins)
        {
            inst = plugins[name].instances[0];
            if (inst instanceof cr.plugins_.Rex_TimeLine.prototype.Instance)
            {
                this.timeline = inst;
                return this.timeline;
            }
        }
        assert2(this.timeline, "Timer behavior: Can not find timeline oject.");
        return null;	
    };
	/////////////////////////////////////
	// Behavior instance class
	behaviorProto.Instance = function(type, inst)
	{
		this.type = type;
		this.behavior = type.behavior;
		this.inst = inst;				// associated object instance to modify
		this.runtime = type.runtime;
	};

	var behinstProto = behaviorProto.Instance.prototype;

    var timerCacheKlass = function ()
    {        
        this.lines = [];       
    };
    var timerCacheKlassProto = timerCacheKlass.prototype;   
    
	timerCacheKlassProto.getTimer = function(plugin)
	{
        var timer;
        if (this.lines.length > 0)
            timer = this.lines.pop();
        else
            timer = new cr.behaviors.Rex_Timer2.TimerKlass();
        timer.Reset(plugin);
		return timer;
	};
	timerCacheKlassProto.freeTimer = function (l)
	{
		this.lines.push(l);
	};	
    var timerCache = new timerCacheKlass();
    
    
	behinstProto.onCreate = function()
	{
        this.timers = {};
        this.timeout_name = null;
        this.is_my_call = false;
        this.timers_save = null;         
	};
    
	behinstProto.onDestroy = function()
	{
        var n;
        for (n in this.timers)
        {
            this._recycle_timer(n);
        }
	};    
    
	behinstProto.tick = function ()
	{
	};

	behinstProto._timer_get = function (thisArg, timeout_handler)
	{
        return this.type._timeline_get().CreateTimer(thisArg, timeout_handler);       
	};    
    
	behinstProto._recycle_timer = function (timer_name)
	{
        this.timers[timer_name].Stop();
        timerCache.freeTimer(this.timers[timer_name]);
        delete this.timers[timer_name];
	};
    
	behinstProto._run_trigger = function (timer_name, trigger_handler)
	{
        this.timeout_name = timer_name;
        this.is_my_call = true;
        this.runtime.trigger(trigger_handler, this.inst); 
        this.timeout_name = null;
        this.is_my_call = false;
	};
    
    behinstProto.on_timeout = function(timer_name)
    {
        this._run_trigger(timer_name, cr.behaviors.Rex_Timer2.prototype.cnds.OnTimeout);
        
        if (this.timers[timer_name].IsDone())
        {
            this._recycle_timer(timer_name);
            this._run_trigger(timer_name, cr.behaviors.Rex_Timer2.prototype.cnds.OnTimerDone);
        }
    };	
    
	behinstProto.saveToJSON = function ()
	{        
        var tim_save = {}, n;
        for (n in this.timers)
            tim_save[n] = this.timers.saveToJSON();
		return { "tims": tim_save,
                 "tluid": (this.type.timeline != null)? this.type.timeline.uid: (-1),
                };
	};
    
	behinstProto.loadFromJSON = function (o)
	{    
        this.timers_save = o["tims"];
        this.type.timelineUid = o["tluid"];  
	};
    
	behinstProto.afterLoad = function ()
	{
		if (this.type.timelineUid === -1)
			this.type.timeline = null;
		else
		{
			this.type.timeline = this.runtime.getObjectByUID(this.type.timelineUid);
			assert2(this.type.timeline, "Timer: Failed to find timeline object by UID");
		}		

        var n, t;
        for (n in this.timers_save)
        {
            t = timerCache.getTimer();
            this.timers[n] = t;
            t.loadFromJSON(this.timers_save[n]);
        }
        this.timers_save = null;        
	}; 
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	behaviorProto.cnds = new Cnds();
    
	Cnds.prototype.IsRunning = function (timer_name)
	{  
		return this.timers.hasOwnProperty(timer_name);
	};
    
	Cnds.prototype.OnTimeout = function (timer_name)
	{  
		return ((this.timeout_name == timer_name) && this.is_my_call);
	};
   
	Cnds.prototype.OnTimerDone = function (timer_name)
	{  
		return ((this.timeout_name == timer_name) && this.is_my_call);
	};    
	//////////////////////////////////////
	// Actions
	function Acts() {};
	behaviorProto.acts = new Acts();

    Acts.prototype.Start = function (timer_name, delay_time, cycles)
	{
        if (!this.timers.hasOwnProperty(timer_name))
        {
            this.timers[timer_name] = timerCache.getTimer(this);
        }
        if (cycles < 0)
            cycles = 0;
        this.timers[timer_name].Start(timer_name, delay_time, cycles);
	};

    Acts.prototype.Pause = function (timer_name)
	{
        if (!this.timers.hasOwnProperty(timer_name))
            return;
            
        this.timers[timer_name].Pause();
	};   

    Acts.prototype.Resume = function (timer_name)
	{
        if (!this.timers.hasOwnProperty(timer_name))
            return;
            
        this.timers[timer_name].Resume();
	};       
    
    Acts.prototype.Stop = function (timer_name)
	{
        if (!this.timers.hasOwnProperty(timer_name))
            return;
            
        //this.timers[timer_name].Stop();
        this._recycle_timer(timer_name);
	};   

    Acts.prototype.Setup2 = function (timeline_objs)
	{
        var timeline = timeline_objs.instances[0];
        if (timeline.check_name == "TIMELINE")
            this.type.timeline = timeline;        
        else
            alert ("Timer behavior should connect to a timeline object");     		
	};
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	behaviorProto.exps = new Exps();

    Exps.prototype.Remainder = function (ret, timer_name)
	{
        var t;
        if (!this.timers.hasOwnProperty(timer_name))
            t = -1;
        else
            t = this.timers[timer_name].timer.RemainderTimeGet();
  
	    ret.set_float(t);
	};
    
	Exps.prototype.Elapsed = function (ret, timer_name)
	{
        var t;
        if (!this.timers.hasOwnProperty(timer_name))
            t = -1;
        else
            t = this.timers[timer_name].timer.ElapsedTimeGet();
  
	    ret.set_float(t);
	};  

    Exps.prototype.RemainderPercent = function (ret, timer_name)
	{
        var t;
        if (!this.timers.hasOwnProperty(timer_name))
            t = -1;
        else
            t = this.timers[timer_name].timer.RemainderTimePercentGet();
  
	    ret.set_float(t);
	};
    
	Exps.prototype.ElapsedPercent = function (ret, timer_name)
	{
        var t;
        if (!this.timers.hasOwnProperty(timer_name))
            t = -1;
        else
            t = this.timers[timer_name].timer.ElapsedTimePercentGet() 
  
	    ret.set_float(t);
	};    
    
	Exps.prototype.DelayTime = function (ret, timer_name)
	{
        var t;
        if (!this.timers.hasOwnProperty(timer_name))
            t = -1;
        else
            t = this.timers[timer_name].timer.DelayTimeGet(); 
            
	    ret.set_float(t);
	};  

    Exps.prototype.RemainderCycle = function (ret, timer_name)
	{
        var c;
        if (!this.timers.hasOwnProperty(timer_name))
            c = -1;
        else
            c = this.timers[timer_name].remainder_cycles; 
	    ret.set_int(c);
	};
    
	Exps.prototype.ElapsedCycle = function (ret, timer_name)
	{
        var c;
        if (!this.timers.hasOwnProperty(timer_name))
            c = -1;
        else
        {
            var t = this.timers[timer_name];
            c = t.cycles - t.remainder_cycles;
        }
	    ret.set_int(c);
	};	
	 
}());


(function ()
{
    cr.behaviors.Rex_Timer2.TimerKlass = function()
    {   
        this.plugin = null;
        this.name = null;
        this.cycles = null;
        this.remainder_cycles = null;            
        this.timer = null;
    };
    
    var TimerKlassProto = cr.behaviors.Rex_Timer2.TimerKlass.prototype;

    TimerKlassProto.Reset = function(plugin)
    {   
        this.plugin = plugin;
        if (this.timer == null)
            this.timer = plugin._timer_get(this, this.on_timeout);
        else
            this.timer.SetCallback(this, this.on_timeout);
    };
    
    TimerKlassProto.Start = function (name, delay_time, cycles)
	{
        this.name = name;
        this.cycles = cycles;
        this.remainder_cycles = cycles;    
        this.timer.Start(delay_time);
	};  
    
    TimerKlassProto.Pause = function ()
	{
        this.timer.Suspend();
	};   

    TimerKlassProto.Resume = function ()
	{
        this.timer.Resume();
	};       
    
    TimerKlassProto.Stop = function ()
	{
        this.timer.Remove();
	};
    
    TimerKlassProto.on_timeout = function ()
    {
        if (this.cycles == 0)
        {
            this.plugin.on_timeout(this.name);
            this.timer.Start();        
        }
        else // if (this.remainder_cycles > 0)
        {
            this.remainder_cycles -= 1;        
            this.plugin.on_timeout(this.name);    
            
            if (this.remainder_cycles > 0)           
                this.timer.Start();
        }
    };
    
    TimerKlassProto.IsDone = function ()
	{
        return ((this.cycles > 0) && (this.remainder_cycles == 0));
	};
    
	TimerKlassProto.saveToJSON = function ()
	{                    
		return { "n": this.name,
                 "c": this.cycles,
                 "rc": this.remainder_cycles,
                 "t": this.timer.saveToJSON(),
                };
	}; 

	TimerKlassProto.loadFromJSON = function (o)
	{                   
        this.name = o["n"];
        this.cycles = o["c"];
        this.remainder_cycles = o["rc"]; 
        this.timer.loadFromJSON(o["t"]);
	};

	TimerKlassProto.afterLoad = function ()
	{                   
        this.timer.afterLoad();
	};
    
}());       