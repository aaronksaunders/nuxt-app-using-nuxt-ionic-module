import dbClient from '../utils/prisma-client';

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    console.log(body);
    
    const resp = await dbClient.imagePost.create({
        data: {
            title: body.title,
            content:  body.content,
            image:  body.image,
        }
    });
    return { resp }
});
