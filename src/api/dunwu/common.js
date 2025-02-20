import { GET, POST } from '@/libs/axios'

export const getData = () => POST(`/portal/sessionState.as`)

export const getIndividual = () => GET(`/portal/v5/gbl/individual.as?edition=ESTATE_V5`)

export const accountLogin = (params) => POST(`/portal/login.as`, params)

export const getBpk = () => GET(`/portal/v5/gbl/bpk.as?kf=base64`)

export const getGblInfo = (params) => POST(`/portal/v5/gbl/info.as?v=${new Date().getTime()}`, params)
