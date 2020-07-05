# AppleScripts

A collection of miscellaneous AppleScripts.

The AppleScript native file format is binary, and contains the text version of the script and a compiled version. This makes it difficult to view, compare, share, and edit these scripts using anything other that the AppleScript Editor. I have chosen to store all these scripts as plain text in the src directory. It's easy to version control them and compare differences, but it also means they need to be turned into real AppleScript files in order to use them.

To create usable script files, just type:

    $ ./compilescripts
	
Then go look in the newly created `script` directory, and you will see all the binary script files which you can edit and run with Script Editor.

To install the scripts, type:

	$ ./installscripts

which will put all the scripts into the `Library/Scripts` folder in your home directory.

I use [LaunchBar](http://www.obdev.at/products/launchbar/index.html), and have added the `~/Library/Scripts` folder to my index, so that I can easily search for and run these scripts.

