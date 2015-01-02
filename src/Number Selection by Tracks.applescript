(*
This script takes the selected tracks in iTunes, and incrementaly numbers them by
setting track metadata
*)
tell application "iTunes"
	set num to 1
	if selection is not {} then -- there ARE tracks selected...
		set mySelection to selection
		repeat with aTrack in mySelection
			#log (get name of aTrack)
			set (track number of aTrack) to num
			set num to num + 1
		end repeat
	end if
end tell
