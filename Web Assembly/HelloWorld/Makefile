all: helloworld_sidemodule.c clean console webasm
console:
	gcc -o helloworld_sidemodule.exe helloworld_sidemodule.c
	ls -la
webasm:
	emcc -O3 -s WASM=1 -s MODULARIZE=1 \
		*.c -o helloworld_sidemodule.js
	ls -la
clean:
	rm -rf *.exe
	rm -rf *.wasm
	rm -rf helloworld_sidemodule.js
	ls -la