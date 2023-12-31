"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const signin_1 = __importDefault(require("../src/route/signin"));
const weeklyProblem_1 = __importDefault(require("./route/weeklyProblem"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/weekly-problem", weeklyProblem_1.default);
app.use('/signin', signin_1.default);
app.get('/', (req, res) => {
    res.sendStatus(418);
});
app.listen('8080', () => {
    console.log(process.env.DB_HOST);
    console.log(`8080 port is lintening.`);
});
