# William M Mortl's Website

My personal website which uses Rust code compiled into [WebAssembly](https://webassembly.org/) to run [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## Pre-requisites

Make sure to have the following installed to

1. [**Rust**](https://www.rust-lang.org/)
1. **wasm-pack** to install run `cargo install wasm-pack`
1. **python3** (if you want to use the built in webserver for testing)
1. **make**

## Building, etc.

* **make clean** cleans the project
* **make build** builds the WebAssembly and copies the needed file to the **/web/pkg** directory
* **make run** starts the python3 webserver and serves up the web page with the corresponding WebAssembly code (so long as you build it first)