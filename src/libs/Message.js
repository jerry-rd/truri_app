import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog'

class Message {
  constructor() {
    this.message = message
  }

  async success(message) {
    await message(message, { title: 'Tauri', kind: 'success' })
  }

  async error(message) {
    await message(message, { title: 'Tauri', kind: 'error' })
  }
}

export default Message
