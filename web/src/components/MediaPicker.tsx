'use client'

import { ChangeEvent, useState } from 'react'

interface MediaPickerProps {
  coverUrl?: string
}

export function MediaPicker({ coverUrl }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | undefined>(coverUrl)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        id="media"
        name="coverUrl"
        accept="image/*"
        onChange={onFileSelected}
        contentEditable
        className="invisible h-0 w-0"
      />
      {(preview || coverUrl) && (
        // eslint-disable-next-line
        <img
          src={preview ?? coverUrl}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
