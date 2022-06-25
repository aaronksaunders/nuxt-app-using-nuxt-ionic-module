import dbClient from '../utils/prisma-client';

export default defineEventHandler(async ({ req }) => {

  const data = await dbClient.imagePost.findMany();
  return  data 
});
