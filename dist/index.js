"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageReducer = exports.imageReducerInRouter = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
function imageReducerInRouter(destination, quality, resize) {
    function verifyResizeIsNumber(resize) {
        if (resize) {
            if (typeof resize === "number") {
                return { width: resize, height: null };
            }
            else {
                return resize;
            }
        }
        return { width: null, height: null };
    }
    return async function (request, _, next) {
        if (request && request.file) {
            const file = request.file;
            const [, ext] = file.originalname.split(".");
            const { filename } = file;
            const configResize = verifyResizeIsNumber(resize);
            let width = configResize.width ? configResize.width : null;
            let height = configResize.height ? configResize.height : null;
            if (ext === "jpeg" || ext === "jpg") {
                await sharp_1.default(file.path)
                    .resize(width, height)
                    .jpeg({ quality })
                    .toBuffer()
                    .then((data) => {
                    fs_1.default.writeFile(path_1.resolve(destination, `${filename}`), data, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                });
            }
            if (ext === "png") {
                await sharp_1.default(path_1.resolve(destination, `${filename}`))
                    .resize(width, height)
                    .png({ quality })
                    .toBuffer()
                    .then((data) => {
                    fs_1.default.writeFile(path_1.resolve(destination, `${filename}`), data, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                });
            }
            next();
        }
    };
}
exports.imageReducerInRouter = imageReducerInRouter;
async function imageReducer(file, destination, quality, resize) {
    function verifyResizeIsNumber(resize) {
        if (resize) {
            if (typeof resize === "number") {
                return { width: resize, height: null };
            }
            else {
                return resize;
            }
        }
        return { width: null, height: null };
    }
    const [, ext] = file.originalname.split(".");
    const { filename } = file;
    const configResize = verifyResizeIsNumber(resize);
    let width = configResize.width ? configResize.width : null;
    let height = configResize.height ? configResize.height : null;
    if (ext === "jpeg" || ext === "jpg") {
        await sharp_1.default(file.path)
            .resize(width, height)
            .jpeg({ quality })
            .toBuffer()
            .then((data) => {
            fs_1.default.writeFile(path_1.resolve(destination, `${filename}`), data, (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    }
    if (ext === "png") {
        await sharp_1.default(path_1.resolve(destination, `${filename}`))
            .resize(width, height)
            .png({ quality })
            .toBuffer()
            .then((data) => {
            fs_1.default.writeFile(path_1.resolve(destination, `${filename}`), data, (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    }
}
exports.imageReducer = imageReducer;
