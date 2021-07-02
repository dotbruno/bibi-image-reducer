# Bibi Image Reducer

Reducer, Resize and Format image .JPG, .JPEG and .PNG to be used in projects that use Multer.
[![npm version](https://badge.fury.io/js/bibi-image-reducer.svg)](https://badge.fury.io/js/bibi-image-reducer)

### Installation

Requires [Multer](https://www.npmjs.com/package/multer) to run.

Install the dependencies and devDependencies and start the server.

```sh
yarn add bibi-image-reducer
```

#### Comments

It is recommended to create a file with the destination of the folder that the multer uses to save the files.

```sh
import path from 'path';

export default path.resolve(__dirname, '..', '..', 'tmp');
```

### Methods

##### imageReducerInRouter

To use in router to upload.

```sh
import imageDestination from 'config/imageDestination';
import { imageReducerInRouter } from 'bibi-image-reducer';

const upload = multer(uploadConfig);

filesRouter.post(
  '/',
  upload.single('file'),
  imageReducerInRouter(imageDestination, 60),
  filesController.create,
);

// or

filesRouter.post(
  '/',
  upload.single('file'),
  imageReducerInRouter(imageDestination, 60, 1500),
  filesController.create,
);

// or

filesRouter.post(
  '/',
  upload.single('file'),
  imageReducerInRouter(imageDestination, 60, {width: 500, height: 800}),
  filesController.create,
);

```

##### Params

####

| Name        | Type             | Required |
| ----------- | ---------------- | -------- |
| destination | string           | yes      |
| quality     | string           | yes      |
| resize      | object or number | no       |

#### imageReducer

To use in code.

```sh
import { imageReducer } from 'bibi-image-reducer'
import imageDestination from 'config/imageDestination';

class FilesController {
  public async create(request: Request, response: Response) {
    await imageReducer(request.file, imageDestination, 50)
    ...
```

##### Params

####

| Name        | Type             | Required |
| ----------- | ---------------- | -------- |
| file        | file             | yes      |
| destination | string           | yes      |
| quality     | string           | yes      |
| resize      | object or number | no       |
