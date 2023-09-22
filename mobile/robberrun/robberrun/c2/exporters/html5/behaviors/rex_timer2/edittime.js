function GetBehaviorSettings()
{
	return {
		"name":			"Timer2",
		"id":			"Rex_Timer2",
		"version":		"0.1",          
		"description":	"Fire the trigger when time-out",
		"author":		"Rex.Rainbow",
		"help url":		"https://dl.dropboxusercontent.com/u/5779181/C2Repo/rex_timer2.html",
		"category":		"Timer",
		"flags":		0
	};
};

//////////////////////////////////////////////////////////////
// Conditions
AddAnyTypeParam("Name", "Timer's name", '""');
AddCondition(0, 0, "Is timmer running", "Timer", "Is running", "", "IsRunning");
AddAnyTypeParam("Name", "Timer's name", '""');
AddCondition(1, cf_trigger, "On time-out", "Time-out", "On {my} <i>{0}</i> timeout", 
             "Triggered when time-out.", "OnTimeout");
AddAnyTypeParam("Name", "Timer's name", '""');
AddCondition(2, cf_trigger, "On timer done", "Time-out", "On {my} <i>{0}</i> done", 
             "Triggered when timeout at last cylce.", "OnTimerDone");
//////////////////////////////////////////////////////////////
// Actions
AddAnyTypeParam("Name", "Timer's name", '""');
AddNumberParam("Time", "Time-out in seconds", 0);
AddNumberParam("Cycles", "Count of restarting timer. 0 is infinity (continue). ", 0);
AddAction(1, 0, "Start", "Control", 
          "Start {my} <i>{0}</i> with time-out to <i>{1}</i> seconds, cycles to <i>{2}</i>", 
          "Start timer.", "Start");
AddAnyTypeParam("Name", "Timer's name", '""');          
AddAction(2, 0, "Pause", "Control", 
          "Pause {my}", 
          "Pause timer.", "Pause"); 
AddAnyTypeParam("Name", "Timer's name", '""');          
AddAction(3, 0, "Resume", "Control", 
          "Resume {my}", 
          "Resume timer.", "Resume");         
AddAnyTypeParam("Name", "Timer's name", '""');
AddAction(4, 0, "Stop", "Control", 
          "Stop {my}", 
          "Stop timer.", "Stop"); 

AddObjectParam("Timeline", "Timeline object to get timer");
AddAction(11, 0, "Setup timer", "Setup", 
          "{my} get timer from <i>{0}</i>", 
          "Setup timer.", "Setup2");

//////////////////////////////////////////////////////////////
// Expressions
AddAnyTypeParam("Name", "Timer's name", '""');
AddExpression(0, ef_return_number, "Get remainder time", 
              "Time", "Remainder", 
              "Get remainder time. -1 is invalid timer.");
AddAnyTypeParam("Name", "Timer's name", '""');              
AddExpression(1, ef_return_number, "Get elapsed time of timer", 
              "Time", "Elapsed", 
              "Get elapsed time of timer. -1 is invalid timer.");  
AddAnyTypeParam("Name", "Timer's name", '""');              
AddExpression(2, ef_return_number, "Get remainder time percentage of timer", 
              "Time", "RemainderPercent", 
              "Get remainder time percentage of timer. -1 is invalid timer.");
AddAnyTypeParam("Name", "Timer's name", '""');              
AddExpression(3, ef_return_number, "Get elapsed time percentage of timer", 
              "Time", "ElapsedPercent", 
              "Get elapsed time percentage of timer. -1 is invalid timer.");  
AddAnyTypeParam("Name", "Timer's name", '""');              
AddExpression(4, ef_return_number, "Get delay time", 
              "Time", "DelayTime", 
              "Get delay time. -1 is invalid timer.");
AddAnyTypeParam("Name", "Timer's name", '""');              
AddExpression(5, ef_return_number, "Get remainder cycles", 
              "Cycle", "RemainderCycle", 
              "Get remainder cycles. -1 is invalid timer.");
AddAnyTypeParam("Name", "Timer's name", '""');              
AddExpression(6, ef_return_number, "Get elapsed cycles", 
              "Cycle", "ElapsedCycle", 
              "Get elapsed cycles. -1 is invalid timer.");
              
              
ACESDone();

// Property grid properties for this plugin
var property_list = [
	];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}