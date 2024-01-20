"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
var User_js_1 = require("../models/User.js");
var openai_config_js_1 = require("../config/openai-config.js");
var OpenAI = require('openai').OpenAI;
var generateChatCompletion = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var message, user, userChats, newUserMessage, chats, config, openai, chatResponse, responseMessage, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                message = req.body.message;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, User_js_1["default"].findById(res.locals.jwtData.id)];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(500)
                            .json({ message: "User not registered OR Token malfunctioned" })];
                userChats = user.chats.map(function (_a) {
                    var role = _a.role, content = _a.content;
                    return ({ role: role, content: content });
                });
                newUserMessage = { role: "user", content: message };
                chats = __spreadArray(__spreadArray([], userChats, true), [newUserMessage], false);
                config = (0, openai_config_js_1.configureOpenAI)();
                openai = new OpenAI(config);
                return [4 /*yield*/, openai.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        messages: chats
                    })];
            case 3:
                chatResponse = _a.sent();
                if (!(chatResponse.choices &&
                    chatResponse.choices[0] &&
                    chatResponse.choices[0].message &&
                    chatResponse.choices[0].message.content)) return [3 /*break*/, 5];
                responseMessage = {
                    role: "assistant",
                    content: chatResponse.choices[0].message.content
                };
                user.chats.push(newUserMessage, responseMessage);
                user.markModified('chats');
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        prompt: newUserMessage,
                        response: responseMessage,
                        chats: user.chats
                    })];
            case 5:
                console.error('Invalid chatResponse structure:', chatResponse);
                _a.label = 6;
            case 6: return [2 /*return*/, res.status(200).json({ chats: user.chats })];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: "Something went wrong" })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.generateChatCompletion = generateChatCompletion;
var sendChatsToUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_js_1["default"].findById(res.locals.jwtData.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).send("User not registered OR Token malfunctioned")];
                }
                if (user._id.toString() !== res.locals.jwtData.id) {
                    return [2 /*return*/, res.status(401).send("Permissions didn't match")];
                }
                return [2 /*return*/, res.status(200).json({ message: "OK", chats: user.chats })];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                // Assuming 'error' is an instance of the Error class
                return [2 /*return*/, res.status(500).json({ message: "ERROR", cause: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendChatsToUser = sendChatsToUser;
var deleteChats = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_js_1["default"].findById(res.locals.jwtData.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).send("User not registered OR Token malfunctioned")];
                }
                if (user._id.toString() !== res.locals.jwtData.id) {
                    return [2 /*return*/, res.status(401).send("Permissions didn't match")];
                }
                //@ts-ignore
                user.chats = [];
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "OK" })];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(200).json({ message: "ERROR", cause: error_3.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteChats = deleteChats;
