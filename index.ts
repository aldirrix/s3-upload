import * as path from "path";
import * as fs from "fs";
import { PassThrough } from "stream";
import { homedir } from "os";

import s3 from "./s3";
import mimeTypeMap from "./mimes";


const getFilenamesFromPath = (path) => {
  return fs.readdirSync(path);
}

(async function upload() {
  const desktopPath = path.join(homedir(), "Desktop");
  const folderPath = `${desktopPath}/fotos`;

  const filenames = getFilenamesFromPath(folderPath);

  await Promise.all(filenames.map(filename => {
    const extension = path.extname(filename).replace(".", "").toLowerCase();
    const contentType = mimeTypeMap[extension];
    const fileStream = fs.createReadStream(`${folderPath}/${filename}`);
    const passThrough = new PassThrough();

    fileStream.pipe(passThrough).on("error", (e: Error) => passThrough.emit("error", e));

    return s3.upload({
      Key: filename,
      Body: passThrough,
      ContentType: contentType
    }as any).promise();
  }));
})();
