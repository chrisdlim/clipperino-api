import fastify from 'fastify';

const server = fastify()

server.get('/health', async (request, reply) => {
  return { statusCode: 200, message: 'OK' }
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})