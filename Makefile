#
# turn 
# osacompile -o file.scpt file.txt

SRC=src
SCPT=scpt

test:
	osacompile -o scpt/test.scpt src/test.txt

.PHONY: all
all:
	mkdir -p $SCPT

scpt/%.scpt : src/%.applescript
	echo osacompile -o $@ $^

.PHONY: clean
clean:
	rm -rf scpt
	
	