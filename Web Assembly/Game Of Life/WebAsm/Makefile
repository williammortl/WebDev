all: gameoflife.c clean console webasm
console:
	gcc -o gameoflife.exe gameoflife.c
	ls -la
webasm:
	emcc -O3 -s WASM=1 -s MODULARIZE=1 \
		*.c -o gameoflife.js
	ls -la
clean:
	rm -rf gameoflife.exe
	rm -rf gameoflife.wasm
	rm -rf gameoflife.js
	ls -la