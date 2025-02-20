import { Store } from '@tauri-apps/plugin-store'

export const useStore = (storeName = 'glb.json') => {
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
  init()
  return { setStore, getStore, deleteStore }
}
