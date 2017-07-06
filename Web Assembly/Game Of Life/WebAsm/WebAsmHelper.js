const webasmImportObject = {
  'imports' : { 
    'i': arg => console.log(arg) 
  },
  'env': {
    'memoryBase': 0,
    'tableBase': 0,
    'memory': new WebAssembly.Memory({initial: 256}),
    'table': new WebAssembly.Table({initial: 0, element: 'anyfunc'})
  }
}

async function createWebAssemblyDefault(path) {
  return createWebAssembly(path, webasmImportObject);
}

async function createWebAssembly(path, importObject) {
  const bytes = await window.fetch(path).then(x => x.arrayBuffer());
  return WebAssembly.instantiate(bytes, importObject);
}