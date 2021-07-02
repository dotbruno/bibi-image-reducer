import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";
import { resolve } from "path";

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

export function imageReducerInRouter(
  destination: string,
  quality: number,
  resize?: IBibiImgReducerMulterResize | number
) {
  function verifyResizeIsNumber(
    resize?: IBibiImgReducerMulterResize | number
  ): any {
    if (resize) {
      if (typeof resize === "number") {
        return { width: resize, height: null };
      } else {
        return resize;
      }
    }

    return { width: null, height: null };
  }

  return async function (
    request?: IRequest,
    _?: Response,
    next?: NextFunction
  ) {
    if (request && request.file) {
      const file = request.file;

      const [, ext] = file.originalname.split(".");
      const { filename }: any = file;

      const configResize = verifyResizeIsNumber(resize);
      let width = configResize.width ? configResize.width : null;
      let height = configResize.height ? configResize.height : null;

      if (ext === "jpeg" || ext === "jpg") {
        await sharp(file.path)
          .resize(width, height)
          .jpeg({ quality })
          .toBuffer()
          .then((data) => {
            fs.writeFile(resolve(destination, `${filename}`), data, (err) => {
              if (err) {
                throw err;
              }
            });
          });
      }
      if (ext === "png") {
        await sharp(resolve(destination, `${filename}`))
          .resize(width, height)
          .png({ quality })
          .toBuffer()
          .then((data) => {
            fs.writeFile(resolve(destination, `${filename}`), data, (err) => {
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

export async function imageReducer(
  file: IFile | any,
  destination: string,
  quality: number,
  resize?: IBibiImgReducerMulterResize | number
) {
  function verifyResizeIsNumber(
    resize?: IBibiImgReducerMulterResize | number
  ): any {
    if (resize) {
      if (typeof resize === "number") {
        return { width: resize, height: null };
      } else {
        return resize;
      }
    }

    return { width: null, height: null };
  }

  const [, ext] = file.originalname.split(".");
  const { filename }: any = file;

  const configResize = verifyResizeIsNumber(resize);
  let width = configResize.width ? configResize.width : null;
  let height = configResize.height ? configResize.height : null;

  if (ext === "jpeg" || ext === "jpg") {
    await sharp(file.path)
      .resize(width, height)
      .jpeg({ quality })
      .toBuffer()
      .then((data) => {
        fs.writeFile(resolve(destination, `${filename}`), data, (err) => {
          if (err) {
            throw err;
          }
        });
      });
  }
  if (ext === "png") {
    await sharp(resolve(destination, `${filename}`))
      .resize(width, height)
      .png({ quality })
      .toBuffer()
      .then((data) => {
        fs.writeFile(resolve(destination, `${filename}`), data, (err) => {
          if (err) {
            throw err;
          }
        });
      });
  }
}
