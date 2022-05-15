import fastify from 'fastify';
import { GetClips, UploadClip } from './src/actions';
import { S3Service } from './src/services';

const app = fastify()
app.register(require('@fastify/multipart'));
const port = 9000;
const clipsBucketName = 'clips';

const s3Service = new S3Service();

app.get('/health', async (request, reply) => {
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

app.listen(port, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})