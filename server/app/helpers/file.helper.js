import multer from 'multer';
import path from 'path';
import mime from 'mime-types';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('DIRNMAE', __dirname);
    return cb(null, path.join(__dirname, '..', 'userfiles' ));
  },
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}-${Date.now()}.${mime.extension(file.mimetype)}`);
  }
});

export const upload = multer({storage});