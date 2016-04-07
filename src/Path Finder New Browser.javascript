/*
a script to open a new Path Finder window

This script exists so that I can do it from LaunchBar
*/

var pf = Application('System Events').processes.byName('Path Finder');

pf.menuBars[0].menuBarItems.byName('File').menus[0].menuItems.byName('New Browser').menus[0].menuItems.byName('New Browser').click();
