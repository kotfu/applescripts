(*
Create a new email message in Outlook and attach the files
currently selected in Path Finder

Tested with Outlook 15.33, i.e. Outlook 2016 for Mac
*)

set thePaths to {}
tell application "Path Finder"
	repeat with pfItem in (get selection)
		set thePath to path of pfItem as alias
		set the end of thePaths to thePath
	end repeat
end tell

tell application "Microsoft Outlook"
	activate
	set theMessage to make new outgoing message
	-- loop through the paths from the records and add them
	-- as attachments to the message
	repeat with thePath in thePaths
		tell theMessage
			make new attachment with properties {file:thePath}
		end tell
	end repeat
	open theMessage
end tell
