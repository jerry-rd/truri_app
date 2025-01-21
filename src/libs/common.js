import { getBpk } from '@/api/common'
import { JSEncrypt } from 'jsencrypt'

export const getJSEncrypt = async () => {
  const encrypt = new JSEncrypt()
  const { data } = await getBpk()
  encrypt.setPublicKey(data.pubkey)
  return encrypt
}
