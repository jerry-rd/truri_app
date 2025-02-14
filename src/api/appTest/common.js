import { GET, POST } from '@/libs/http'

const baseUrl = 'http://v5.sndtest.com'

export const getData = () => POST(`${baseUrl}/portal/sessionState.as`)

export const getIndividual = () => GET(`${baseUrl}/portal/v5/gbl/individual.as?edition=ESTATE_V5`)

export const accountLogin = (params) => POST(`${baseUrl}/portal/login.as`, params)

export const getBpk = () => GET(`${baseUrl}/portal/v5/gbl/bpk.as?kf=base64`)
