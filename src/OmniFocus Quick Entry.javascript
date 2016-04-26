/*

## OmniFocus Quick Entry
Open the quick entry window of Omnifocus and create a new task. Any selected
text is put in the note of the task

OmniFocus already has a global shortcut key to do part of this, but it has several
shortcomings:

- it only works of OmniFocus is running
- I wanted to capture the selected text to put in the note of an app
- I wanted a way to do it from LaunchBar via an abbreviation

This script solves all of those problems.

## Using via Launchbar
To make it work from launchbar:

- install this script to ~/Library/Scripts
- add ~/Library/Scripts to your index
- Set an abbreviation (I use "todo") to the script

## User Beware

- if you have selected text, it will end up on the clipboard, replacing
  whatever you had there previously
- In System Preferences -> Keyboard -> Shortcuts, the "text boxes and lists only"
option must be selected

TODO - if we are in evernote, add an evernote link to the note

TODO - if we are in Safari, add the url to note

TODO - figure out how reflection works, so we can detect if the function exists
       and then go call it. I have the checking if it exists part working, but
       can't figure out how to call a function whose name is in a string

TODO - save and restore the clipboard if there is selected text. I have basic code
       in here to do it, and it works for plain text, but it can't save
       images or other complex data types that are on the clipboard

TODO - figure out what to do if something besides text is selected
*/

var omnifocusBundleID = 'com.omnigroup.OmniFocus2';

var se = Application('System Events');
se.includeStandardAdditions = true;  

var app = se.processes.whose({ frontmost: { '=': 'true'}});
//if (Object.prototype.toString.call(app) === '[object Array]') {
//	app = app[0];
//}

// determine of something is selected in the frontmost app
// if there is something selected, then the "Copy" menu item should be
// enabled
var haveSelection = app.menuBars[0].menuBarItems['Edit'].menus[0].menuItems['Copy'].enabled();

if (haveSelection == 'true') {
	// TODO save the current contents of the clipboard to be restored later
	// var clipsave = se.theClipboard();
	
	// copy the selection to the clipboard
	// sending keystrokes is iffy because a different app may have the focus
	//se.keystroke('c', {using: 'command down'});
	
	// clicking the copy menu is better, because I can specify the app
	app.menuBars[0].menuBarItems['Edit'].menus[0].menuItems['Copy'].click();
}

// if OmniFocus isn't running, set a flag so we can activate it
var whistle = !isRunning(omnifocusBundleID)
// this launches OmniFocus if it isn't already running
var of = Application(omnifocusBundleID);
if (whistle) { of.activate(); }

// open the quick entry window and add a new task
of.quickEntry.open();
var task = of.InboxTask();
task.note = makeTaskNote(se, app, haveSelection);
of.quickEntry.inboxTasks.push(task);

// send a tab character to set focus to the new task in the task name field
se.keystroke('\t');

if (task.note) {
	// send command-' to open the note view
	se.keystroke("'", {using: 'command down'});
	// send it again to set focus back to the task name field
	//delay(0.1);
	se.keystroke("'", {using: 'command down'});
}

$.exit(0);


// a function to intelligently create a task note, based on which app
// is in front, and whether text is selected or not
//
// se - the system events app
// app - the application you want to construct a task note from
// haveSelection - true if there was text selected, we assume the selected
//                 text is now on the clipboard for us to get
// returns the task note
function makeTaskNote(se, app, haveSelection) {
	var note = '';

	/*
	// make a CamelCase function Name based on the app identifier
	functionName = app.bundleIdentifier().toString();
	functionName = functionName.replace(/\.([A-z])/g, function(_, word) { return word.toUpperCase(); });
	functionName = functionName.charAt(0).toUpperCase() + functionName.slice(1);
	functionName = "noteFor" + functionName;

	note += functionName;
	note += '()\n';
	note += typeof(functionName) + '\n';
	if ( typeof(functionName) === typeof(Function) ) {
		note += 'calling function' + functionName
		note += '\n'
	};
	// TODO we know the function exists, now we just need a way to call it
	*/
	
	// since I can't get reflection to work yet, we just do a switch statement
	//note += app.bundleIdentifier().toString() + '\n';

	/* this isn't working yet either, can't get rich text for a link into OmniFocus
	switch (app.bundleIdentifier().toString()) {
	case "com.evernote.Evernote":
		e = Application("com.evernote.Evernote");
		e.includeStandardAdditions = true;
		en = e.windows[0].selectedNotes()[0];
		html = '<a href="' + en.noteLink() + '">' + en.title() + '</a>\n';
		// we have to convert the note rtf, which can only be done via the command line
		exapp = Application.currentApplication();
		exapp.includeStandardAdditions = true
		cmdline = "echo '" + html + "' | textutil -stdin -stdout -format html -convert rtf";
		rtf = exapp.doShellScript(cmdline);
		note += rtf + '\n';
		break;
	default:
		note += 'default case\n'
		break;
	}
	*/
	
	// add selected text to the end of the note no matter what
	if (haveSelection == 'true') {
		note += note.concat(se.theClipboard());
		// TODO now restore the clipboard
		// se.setTheClipboardTo(clipsave);
	}
	
	return note;
}

// a function to check if an app is running
// via https://github.com/dtinth/JXA-Cookbook/wiki/Getting-the-Application-Instance
//
// bundleIdentifier - the bundle ID of the app to check for
// returns true if the app is running, false if it is not
function isRunning(bundleIdentifier) {

	ObjC.import('stdlib')
	ObjC.import('AppKit')
	var result = false
	var apps = $.NSWorkspace.sharedWorkspace.runningApplications // Note these never take () unless they have arguments
	apps = ObjC.unwrap(apps) // Unwrap the NSArray instance to a normal JS array
	var app
	for (var i = 0, j = apps.length; i < j; i++) {
	  app = apps[i]
	  // Some applications do not have a bundleIdentifier as an NSString
	  if (typeof app.bundleIdentifier.isEqualToString === 'undefined') {
	    continue;
	  }

	  if (app.bundleIdentifier.isEqualToString(bundleIdentifier)) {
	    result = true;
	    break;
	  }
	}

	return result;
}
