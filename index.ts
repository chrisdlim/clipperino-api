import fastify from 'fastify';
import { GetClips, UploadClip } from './src/actions';
import { S3Service } from './src/services';

const port = 9000;
const init = () => {
  const app = fastify();
  app.register(require('@fastify/multipart'));
  const clipsBucketName = 'clips';

  const s3Service = new S3Service();

  app.get('/health', async (req, reply) => {
    reply.statusCode = 200;
    reply.send();
  });

  app.get('/clips', async (req, reply) => {
    const query = new GetClips(s3Service, clipsBucketName);
    reply.send(await query.handle());
  });

  app.post('/clips/upload', async (req, reply) => {
    const uploadedFile = await req.file();
    const { filename, file } = uploadedFile;
    const upload = new UploadClip(s3Service, clipsBucketName, filename.split(' ').join('-'), file);
    reply.send(await upload.handle());
  });
  return app;
}

if (require.main === module) {
  init().listen(port, err => {
    if (err) {
      console.error(err);
    }
  });
} else {
  module.exports = init;
}