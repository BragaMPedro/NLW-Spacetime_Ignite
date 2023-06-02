import Image from 'next/image'

import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'

export const Hero = () => {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="NLW spacetime" />

      <div className="max-w-[420px] space-y-4">
        <h1 className="leading-light text-5xl font-bold text-gray-50">
          Sua Capsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 text-center font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        cadastrar lembrança
      </Link>
    </div>
  )
}
