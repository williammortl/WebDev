all: gameoflife.c clean console webasm
console:
	gcc -o gameoflife.exe gameoflife.c
	ls -la
webasm:
	emcc gameoflife.c -O2 -s WASM=1 -o gameoflife.html --shell-file gameoflife_template.html
	ls -la
clean:
	rm -rf gameoflife.exe
	rm -rf gameoflife.wasm
	rm -rf gameoflife.html
	rm -rf gameoflife.js
	ls -la