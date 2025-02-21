import { Store } from '@tauri-apps/plugin-store'

export const useSystemStore = async (storeName = 'glb.json') => {
  let store
  const init = async () => {
    store = await Store.load(storeName)
  }
  const setStore = async (key, value) => {
    await store.set(key, value)
  }
  const getStore = async (key) => {
    return await store.get(key)
  }
  const deleteStore = async (key) => {
    await store.delete(key)
  }
  await init()
  return { setStore, getStore, deleteStore }
}
