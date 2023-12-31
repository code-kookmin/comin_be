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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weeklyProblem_1 = __importDefault(require("../service/weeklyProblem"));
const route = express_1.default.Router();
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield weeklyProblem_1.default.findByLikeDate();
    if (!result) {
        res.sendStatus(403);
        return;
    }
    res.send(result);
}));
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.body.problem_id !== "number") {
        res.sendStatus(403);
    }
    const result = yield weeklyProblem_1.default.save(req.body.problem_id);
    if (!result) {
        res.sendStatus(403);
        return;
    }
    res.sendStatus(201);
}));
exports.default = route;
