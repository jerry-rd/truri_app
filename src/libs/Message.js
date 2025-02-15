import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog'

const Message = {
  async success(content) {
    await message(content, { title: '提示', kind: 'success' })
  },
  async error(content) {
    await message(content, { title: '提示', kind: 'error' })
  },
}

export default Message
