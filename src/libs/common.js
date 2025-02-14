import { getBpk } from '@/api/appTest/common'
import { JSEncrypt } from 'jsencrypt'

export const getJSEncrypt = async () => {
  const encrypt = new JSEncrypt()
  const { data } = await getBpk()
  encrypt.setPublicKey(data.pubkey)
  return encrypt
}

export const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
    document.body.append(script)
  })
