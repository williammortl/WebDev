# Makefile for WebDev project

.PHONY: all clean build run

# 1. Clean: delete wasm-life/pkg and web/pkg and their contents
clean:
	rm -rf wasm-life/pkg web/pkg

# 2. Build: clean, build wasm-life, copy pkg to web
build: clean
	cd wasm-life && wasm-pack build --target web --release
	mkdir -p web/pkg
	cp wasm-life/pkg/wasm_life.js wasm-life/pkg/wasm_life_bg.wasm web/pkg/

# 3. Run: start python3 web server in web directory
run:
	cd web && python3 -m http.server
