/*
open the quick entry window of Omnifocus and create a new empty task

OmniFocus already has a global shortcut key to do this, but I wanted
to be able to do it from LaunchBar via an abbreviation. To make this work
you need to have this script in your LaunchBar index, and then you can set
any abbreviation you want (I use "todo")
*/

var of = Application("OmniFocus");

of.quickEntry.open();
of.quickEntry.inboxTasks.push(of.InboxTask());

// send a tab character to get the focus to the task name
Application("System Events").keystroke("\t");