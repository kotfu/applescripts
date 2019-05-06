/*

## Drafts Capture
Create a new note in Drafts, add a title, and paste in the contents
of the clipboard

Drafts already has a global shortcut key to do part of this, but it has several
shortcomings:

- it only works if Drafts is running
- It doesn't add a title to the note
- I wanted a way to do it from LaunchBar via an abbreviation

This script solves all of those problems.

## Using via Launchbar
To make it work from launchbar:

- install this script to ~/Library/Scripts
- add ~/Library/Scripts to your index
- Set an abbreviation (I use "dr") to the script

## User Beware

- if you have selected text, it will end up on the clipboard, replacing
  whatever you had there previously

TODO - figure out how reflection works, so we can detect if the function exists
       and then go call it. I have the checking if it exists part working, but
       can't figure out how to call a function whose name is in a string

TODO - save and restore the clipboard if there is selected text. I have basic code
       in here to do it, and it works for plain text, but it can't save
       images or other complex data types that are on the clipboard

TODO - figure out what to do if something besides text is selected
*/

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

// if Drafts isn't running, launch it, then bring it to the front
var drafts = Application('Drafts');
drafts.activate();

// need the process, not the application in order to access the menus
var drafts = se.processes.byName('Drafts');
// open a new draft
drafts.menuBars[0].menuBarItems['File'].menus[0].menuItems['New'].click();

// create a title for the note
delay(0.2);
se.keystroke('# Note ;date');
// wait for the date expansion to occur
delay(0.3);
se.keyCode(36); // enter
se.keyCode(36); // enter


// paste in the clipboard
var paste = drafts.menuBars[0].menuBarItems['Edit'].menus[0].menuItems.byName('Paste')
if (paste.enabled()) {
	paste.click();
}
