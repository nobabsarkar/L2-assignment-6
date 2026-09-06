
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url); 
   
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/app.ts
import express from "express";
var app, app_default;
var init_app = __esm({
  "src/app.ts"() {
    app = express();
    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });
    app_default = app;
  }
});

// src/server.ts
var require_server = __commonJS({
  "src/server.ts"() {
    init_app();
    var PORT = 5e3;
    async function main() {
      try {
        app_default.listen(PORT, () => {
          console.log(`Server is running on port: ${PORT}`);
        });
      } catch (error) {
        console.log("Error starting the server:", error);
      }
    }
    main();
  }
});
export default require_server();
//# sourceMappingURL=server.mjs.map