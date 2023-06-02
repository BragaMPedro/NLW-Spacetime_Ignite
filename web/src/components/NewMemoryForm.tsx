'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent } from 'react'
import cookie from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface NewMemoryFormProps {
  memory?: any
  action: 'update' | 'create'
}

export function NewMemoryForm({ memory, action }: NewMemoryFormProps) {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    /**
     * Ver entradas do formulário em forma de Array,
     *  necessário nomear todos os inputs, atributo 'name'
     */
    console.log(Array.from(formData.entries()))

    const fileToUpload = formData.get('coverUrl')
    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      console.log(uploadResponse)
      coverUrl = uploadResponse.data.fileUrl
    }

    const token = cookie.get('token')

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  async function handleUpdateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl') as File

    let coverUrl = ''

    if (fileToUpload.name !== '') {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    } else {
      coverUrl = memory.coverUrl
    }

    console.log(Array.from(formData.entries()), 'coverURL: ' + coverUrl)

    const token = cookie.get('token')
    await api.put(
      `/memories/${memory.id}`,
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push(`/memories/${memory.id}`)
  }

  return (
    <form
      onSubmit={action === 'create' ? handleCreateMemory : handleUpdateMemory}
      className="flex flex-1 flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          {action === 'create' ? 'Anexar mídia' : 'Trocar mídia'}
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            defaultChecked={memory.isPublic ?? false}
            contentEditable={action === 'update'}
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 "
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker coverUrl={memory.coverUrl} />
      <textarea
        name="content"
        spellCheck={false}
        contentEditable={action === 'update'}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        defaultValue={memory.content ?? ''}
      />
      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 text-center font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
