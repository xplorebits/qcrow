import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().qcrowAuthSecret || '',
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "username" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const res = await User.findOne({ username: credentials.username })

            if (res?._id && await useNitroApp().verifyPassword(credentials.password || '', res.hash)) {
              return { username: res.username }
            }

            return null
          }
        })
    ]
})