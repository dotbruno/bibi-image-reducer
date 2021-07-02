import { NextFunction, Request, Response } from "express";
interface IBibiImgReducerMulterResize {
    width: number | null;
    height: number | null;
}
interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
interface IRequest extends Request {
    file: any;
}
export declare function imageReducerInRouter(destination: string, quality: number, resize?: IBibiImgReducerMulterResize | number): (request?: IRequest, _?: Response, next?: NextFunction) => Promise<void>;
export declare function imageReducer(file: IFile | any, destination: string, quality: number, resize?: IBibiImgReducerMulterResize | number): Promise<void>;
export {};
