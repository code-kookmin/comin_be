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
const bcrypt_1 = __importDefault(require("bcrypt"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("../../config/connection"));
dotenv_1.default.config();
const allowedDomainList = [process.env.ALLOWED_DOMAIN];
const corsOption = {
    origin: allowedDomainList
};
const getHashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(parseInt(process.env.SALT_ROUND));
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    return hashedPassword;
});
const route = express_1.default.Router();
route.use((0, cors_1.default)(corsOption));
route.use(express_1.default.json());
route.use(express_1.default.urlencoded({ extended: true }));
// 회원가입 라우터
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, birthday, githubName, baekjoonName } = req.body;
    // 사용자 데이터 중 누락 데이터가 있다면 status:404 반환
    if (!email || !password || !name || !birthday || !githubName || !baekjoonName) {
        return res.json({
            status: false,
            message: "누락된 정보가 있습니다"
        });
    }
    const selectQuery = `SELECT * FROM user WHERE email=(?)`;
    const selectParam = [email];
    try {
        const selectResult = yield connection_1.default.query(selectQuery, selectParam);
        // email이 중복되지 않으면 현재 사용자 정보 추가
        if (selectResult[0].length == 0) {
            const hashedPassword = yield getHashedPassword(password);
            const insertQuery = `INSERT INTO user(email, password, name, birthday, github_name, baekjoon_name) 
        VALUES (?, ?, ?, ?, ?, ?)`;
            const insertParam = [email, hashedPassword, name, birthday, githubName, baekjoonName];
            yield connection_1.default.query(insertQuery, insertParam);
            return res.json({
                status: true,
                message: "회원가입 성공!"
            });
        }
        else {
            return res.json({
                status: false,
                message: "이미 가입한 사용자입니다."
            });
        }
    }
    catch (err) {
        return res.json({
            status: false,
            message: "서버 에러"
        });
    }
}));
exports.default = route;
