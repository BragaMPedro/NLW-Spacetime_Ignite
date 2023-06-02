import { NewMemoryForm } from '@/components/NewMemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function EditMemory({
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

      <NewMemoryForm memory={memory} action="update" />
    </div>
  )
}
