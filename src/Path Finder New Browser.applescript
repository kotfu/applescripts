(*
Keyboard maestro seems to be able to tell Path Finder to open a new
browser window, and I have a Keyboard Maestro to do that. I want to be
able to do the same thing from LaunchBar. I can't seem to write an
AppleScript to get it done, so we just tell Keyboard Maestro to do it
*)


-- se = Application("System Events");
-- se.keystroke("n", {using: "command down", "option down", "control down"});

-- tell application "System Events" to keystroke "n" using {command down, control down, option down, shift down}

tell application "Keyboard Maestro Engine"
	do script "Path Finder New Browser"
end tell
