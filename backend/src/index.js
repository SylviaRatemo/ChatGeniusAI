"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Here");
const app_js_1 = __importDefault(require("./app.js"));
const connection_js_1 = require("./db/connection.js");
// connection and listeners
const PORT = process.env.PORT || 5000;
(0, connection_js_1.connectToDatabase)()
    .then(() => {
    app_js_1.default.listen(5000, () => console.log("Server Open.. Project by Sylvia Ratemo"));
})
    .catch((err) => console.log(err));
