(*
open the quick entry window of Omnifocus and create a new empty task

OmniFocus already has a global shortcut key to do this, but I wanted
to be able to do it from LaunchBar via an abbreviation. To make this work
you need to have this script in your LaunchBar index, and then you can set
any abbreviation you want (I use "todo")
*)

tell application "OmniFocus"
	tell quick entry
		open
		make new inbox task
		tell application "System Events" to keystroke tab
	end tell
end tell
