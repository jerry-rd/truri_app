import { POST_JSON } from '@/libs/http'

import models from './model'

const baseURL = 'https://integrate.api.nvidia.com'

const config = models[0]

export const chatCompletion = (content) =>
  POST_JSON(
    `${baseURL}/v1/chat/completions`,
    {
      messages: [{ role: 'user', content }],
      model: config?.model,
      stream: false,
    },
    { Authorization: `Bearer ${config?.apiKey}`, Accept: 'application/json' }
  )
