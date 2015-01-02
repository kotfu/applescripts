applescripts
============

A collection of miscellaneous AppleScripts

The AppleScript native file format is binary, and contains the text version of the script and a compiled version. This makes it difficult to view, compare, share, and edit these scripts using anything other that the AppleScript Editor. So I have chosen to store all these scripts as plain text in the src directory. This makes it easy to version control them, and compare differences, and so forth. But it also means that they need to be turned into real AppleScript files in order to use them. I have included a Makefile which does exactly that.

