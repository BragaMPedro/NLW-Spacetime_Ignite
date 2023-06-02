import { View, Text, TouchableOpacity, Image, ViewProps } from 'react-native'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Memory } from '../../app/memories'

dayjs.locale(ptBR)

interface MemoryCardProps extends ViewProps {
  memory: Memory
}

export function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <View className="mb-8 space-y-4">
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
          className="aspect-video w-full rounded-lg"
          alt=""
        />
        <Text className="font-body text-base leading-relaxed text-gray-100">
          {memory.content}
        </Text>
        <Link
          href={{
            pathname: '/details',
            params: { id: memory.id },
          }}
          asChild
        >
          <TouchableOpacity className="flex-row items-center gap-2">
            <Text className="font-body text-sm text-gray-200">Ler mais</Text>
            <Icon name="arrow-right" size={16} color={'#9e9ea0'} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
