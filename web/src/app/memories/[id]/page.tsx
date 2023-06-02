import Image from 'next/image'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { ChevronLeft, PenBox, Trash } from 'lucide-react'
import { api } from '@/lib/api'
import dayjs from 'dayjs'

export default async function MemoryDetails({
  params,
}: {
  params: { id: string }
}) {
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory = response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à Timeline
      </Link>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <div className="flex gap-4">
            <Link
              href={`/memories/${memory.id}/edit`}
              className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <PenBox className="h-4 w-4" />
              Editar
            </Link>
            <div className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
              <Trash className="h-4 w-4 hover:text-gray-100" />
              Deletar
            </div>
          </div>
        </div>
        <Image
          src={memory.coverUrl.replace('localhost', '192.168.1.3')}
          width={592}
          height={250}
          alt=""
          className="aspect-auto w-full rounded-lg object-cover"
        />
        <p className="w-full flex-1 resize-none p-0 text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
      </div>
    </div>
  )
}
