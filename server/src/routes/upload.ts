/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { z } from 'zod';

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {

  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
        limits:{
            fileSize: 5_242_880, // 5Mb
        }
    })

    if(!upload){
        return reply.status(400).send(`iiiih erro ${reply.statusCode}, nenhum upload identificado`)
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if(!isValidFileFormat){
        return reply.status(400).send(`Erro ${reply.statusCode} amigão, formato do upload inválido`)
    }

    /**
     * gerando nome único do arquivo
     * usando randomUUID e a extensão do arquivo
     */
    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)

    const wirteStream = createWriteStream(
        resolve(__dirname, `../../uploads`, fileName)
    )
    
    await pump(upload.file, wirteStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return {
        ok: 'aeeeeee, agora foi viu. Tudo Certo!',
        fileUrl
    }
})
}
