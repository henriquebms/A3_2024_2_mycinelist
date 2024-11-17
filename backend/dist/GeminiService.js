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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiService = void 0;
var generative_ai_1 = require("@google/generative-ai");
var connection_1 = __importDefault(require("./connection"));
var Log_1 = require("./Log");
var GeminiService = /** @class */ (function () {
    function GeminiService() {
        var genAI = new generative_ai_1.GoogleGenerativeAI(process.env.IA_KEY || "");
        this.ia = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.logRepository = connection_1.default.getRepository(Log_1.Log);
    }
    GeminiService.prototype.recomendations = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var initQuestion, result, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initQuestion = "\n            quero uma lista de filmes desse tipo { list: [ { \n            title: 'titulo do filme', \n            description: 'descricao do filme'\n            } ] }, quero apenas o json, a lista deve ter 3 filmes\n        ";
                        return [4 /*yield*/, this.ia.generateContent(initQuestion + " e o usuario busca por: " + question)];
                    case 1:
                        result = _a.sent();
                        response = result.response.text();
                        this.registerLog({
                            question: question,
                            response: response,
                            createdAt: new Date().toISOString()
                        });
                        return [2 /*return*/, response.replace("```json", "").replace("```", "").trim()];
                }
            });
        });
    };
    GeminiService.prototype.recomendation = function (movie) {
        return __awaiter(this, void 0, void 0, function () {
            var initQuestion, result, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initQuestion = "\n            me de { \n                title: 'titulo do filme', \n                description: 'descricao do filme',\n                recommendation: 'recomendacao do filme',\n                tags: [ 'tags do filme (no maximo 6)' ]  \n            }, do filme\n        ";
                        return [4 /*yield*/, this.ia.generateContent(initQuestion + " " + movie)];
                    case 1:
                        result = _a.sent();
                        response = result.response.text();
                        this.registerLog({
                            question: initQuestion + " " + movie,
                            response: response,
                            createdAt: new Date().toISOString()
                        });
                        return [2 /*return*/, response.replace("```json", "").replace("```", "").trim()];
                }
            });
        });
    };
    GeminiService.prototype.registerLog = function (log) {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        a = new Log_1.Log({
                            question: "teste",
                            createdAt: new Date().toISOString(),
                            response: "aaaa"
                        });
                        return [4 /*yield*/, this.logRepository.save(a)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return GeminiService;
}());
exports.geminiService = new GeminiService();
