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

if (haveSelection) {
	// save the current contents of the clipboard to be restored later
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
if (haveSelection) {
	task.note = se.theClipboard();
	// now restore the clipboard
	// se.setTheClipboardTo(clipsave);
}
of.quickEntry.inboxTasks.push(task);

// send a tab character to set focus to the new task in the task name field
se.keystroke('\t');

if (haveSelection) {
	 // send command-' to open the note view
	se.keystroke("'", {using: 'command down'});
	 // send it again to set focus back to the task name field
	se.keystroke("'", {using: 'command down'});
}

$.exit(0);


// a function to check if an app is running
// via https://github.com/dtinth/JXA-Cookbook/wiki/Getting-the-Application-Instance
//
// bundleID - the bundle ID of the app to check for
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
