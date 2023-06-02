import {
  Switch,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'

import NlwLogo2 from '../src/assets/nlw-spacetime-logo_horizontal.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import { api } from '../src/lib/api'

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [preview, setPreview] = useState<string | null>(null)
  const [content, setContent] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        selectionLimit: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (err) {
      console.log('algo de errado não está certo no ImagePicker')
    }

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')
    let coverUrl = null

    if (preview) {
      const uploadFormData = new FormData()
      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any)

      try {
        const uploadResponse = await api.post('/upload', uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        coverUrl = uploadResponse.data.fileUrl
      } catch (err) {
        console.error(err.response.data)
      }

      await api.post(
        '/memories',
        {
          content,
          isPublic,
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.push('/memories')
    }
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NlwLogo2 />
        <Link href="/memories" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{ false: '#767577', true: '#372560' }}
            value={isPublic}
            onValueChange={setIsPublic}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          onPress={openImagePicker}
          className="h-32 items-center justify-center rounded-lg border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              alt=""
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#FFF" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          className="p-0 align-text-top font-body text-lg text-gray-50"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor="#56565a"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateMemory}
          className="mt-6 items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
