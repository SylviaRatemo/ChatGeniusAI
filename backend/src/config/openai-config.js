"use strict";
exports.__esModule = true;
exports.configureOpenAI = void 0;
// src/config/openai-config.ts
var openai_1 = require("openai");
var configureOpenAI = function () {
    var config = new openai_1["default"]({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID
    });
    return config;
};
exports.configureOpenAI = configureOpenAI;
