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
const weeklyProblem_1 = __importDefault(require("../repository/weeklyProblem"));
function save(problemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const nowString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const problemResponse = yield fetch("https://solved.ac/api/v3/problem/show?problemId=" + problemId);
        if (problemResponse.status != 200) {
            return;
        }
        const problem = yield problemResponse.json();
        const result = yield weeklyProblem_1.default.save(problemId, problem.acceptedUserCount, nowString);
        return result;
    });
}
function findByLikeDate() {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const nowString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const weeklyProblem = yield weeklyProblem_1.default.findByLikeDate(nowString);
        if (!weeklyProblem)
            return;
        const problemResponse = yield fetch("https://solved.ac/api/v3/problem/show?problemId=" + weeklyProblem.problemId);
        if (problemResponse.status != 200) {
            return;
        }
        const problem = yield problemResponse.json();
        const result = Object.assign(Object.assign({}, weeklyProblem), { weeklySolvedUserCount: problem.acceptedUserCount - weeklyProblem.acceptedUserCount });
        return result;
    });
}
const weeklyProblemService = { save, findByLikeDate };
exports.default = weeklyProblemService;
