"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("./App.css");
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
function App() {
    const API_KEY = 'RGAPI-9dfaa9e7-d29d-48e5-b41e-65dda3d4ae09';
    const [data, setData] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        const getData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get(`https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=${page}&api_key=${API_KEY}`);
                setData(res.data);
            }
            catch (error) {
                if (error.response) {
                    // Request made but the server responded with an error
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
                else if (error.request) {
                    // Request made but no response is received from the server.
                    console.log(error.request);
                }
                else {
                    // Error occured while setting up the request
                    console.log('Error', error.message);
                }
            }
        });
        getData();
    }, [page]);
    (0, react_1.useEffect)(() => {
        console.log('data', data);
    }, [data]);
    return <div className='App'>test</div>;
}
exports.default = App;
