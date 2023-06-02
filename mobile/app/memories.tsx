import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NlwLogo2 from '../src/assets/nlw-spacetime-logo_horizontal.svg'
import { MemoryCard } from '../src/components/MemoryCard'
import { api } from '../src/lib/api'

export interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [memories, setMemories] = useState<Memory[]>([])

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <View
      className="flex-1 px-6"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NlwLogo2 scale={0.85} />

        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500 text-black"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              className="h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black"
            >
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {memories ? (
        <FlatList
          data={memories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemoryCard memory={item} />}
          className="mt-6 space-y-10"
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="font-body text-base text-gray-100">
            Ops, parece que não há nada por aqui ainda
          </Text>
        </View>
      )}
    </View>
  )
}
