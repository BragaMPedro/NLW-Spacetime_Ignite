import { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import NlwLogo2 from '../src/assets/nlw-spacetime-logo_horizontal.svg'
import { api } from '../src/lib/api'
import { Memory } from './memories'

dayjs.locale(ptBR)

export default function Details() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()
  const params = useLocalSearchParams()
  const { id } = params

  const [memory, setMemory] = useState<Memory>({
    id: '',
    content: '',
    coverUrl: '',
    createdAt: '',
  })

  async function loadMemory() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemory(response.data)
  }

  useEffect(() => {
    loadMemory()
  }, [])

  if (memory.coverUrl === '') {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={50} color="#8257e5" />
      </View>
    )
  }

  return (
    <View
      className="flex-1 px-6 pb-2"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NlwLogo2 scale={0.85} />
        <Link href="/memories" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView className="mt-4 space-y-6">
        <View className="flex-row items-center gap-2">
          <View className="h-px w-5 bg-gray-50" />
          <Text className="font-body text-xs text-gray-100">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </Text>
        </View>
        <View className="space-y-4 px-4">
          <Image
            source={{
              uri: memory.coverUrl.replace('localhost', '192.168.1.3'),
            }}
            className="aspect-square w-full rounded-lg"
            alt=""
          />
          <Text className="font-body text-base leading-relaxed text-gray-100">
            {memory.content}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
