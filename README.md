applescripts
============

A collection of miscellaneous AppleScripts.

The AppleScript native file format is binary, and contains the text version of the script and a compiled version. This makes it difficult to view, compare, share, and edit these scripts using anything other that the AppleScript Editor. So I have chosen to store all these scripts as plain text in the src directory. This makes it easy to version control them, and compare differences, and so forth. But it also means that they need to be turned into real AppleScript files in order to use them.

To create usable script files, just type:

    $ ./compilescripts
	
Then go look in the newly created `script` directory, and you will see all the usable script files.

To install the scripts, type:

	$ ./installscripts

which will put all the scripts into the `Library/Scripts` folder in your home directory.

I use [LaunchBar](http://www.obdev.at/products/launchbar/index.html), and have added the `~/Library/Scripts` folder to my index, so that I can easily search for and run these scripts.

