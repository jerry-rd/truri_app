<template>
  <div class="mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="dev in list" class="device-card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center transition-transform duration-200 hover:shadow-xl hover:scale-101 relative">
        <img :src="dev?.deviceImage" alt="设备图片" class="w-32 h-32 object-cover mr-4" />
        <div class="flex-1">
          <h3 class="device-name text-xl font-bold text-gray-900 dark:text-white mb-1">{{ dev?.deviceName }}</h3>
          <p class="device-address text-sm text-gray-600 dark:text-gray-400">
            地址: <span class="font-medium">{{ dev?.deviceAddress }}</span>
          </p>
          <p class="device-id text-sm text-gray-600 dark:text-gray-400">
            ID: <span class="font-medium">{{ dev?.deviceId }}</span>
          </p>
          <div class="actions mt-2 flex space-x-3">
            <button @click="onEdit" class="text-blue-600 transition duration-150 cursor-pointer">编辑</button>
            <button @click="onEdit" class="text-blue-600 transition duration-150 cursor-pointer">详情</button>
            <button @click="onDelete" class="text-red-600 transition duration-150 cursor-pointer">删除</button>
          </div>
        </div>
        <span :class="['absolute top-4 right-4 inline-block px-2 py-1 rounded-full text-white font-medium text-xs', statusClass(dev?.deviceStatus)]">
          {{ dev?.deviceStatus }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeviceCard',
    data() {
      return {
        list: [
          {
            deviceId: '001',
            deviceAddress: 'Room 101',
            deviceStatus: '在线',
            deviceName: 'Device 1',
            deviceImage: 'https://picsum.photos/200/300?random=1',
          },
          {
            deviceId: '002',
            deviceAddress: 'Room 102',
            deviceStatus: '离线',
            deviceName: 'Device 2',
            deviceImage: 'https://picsum.photos/200/300?random=2',
          },
          {
            deviceId: '003',
            deviceAddress: 'Room 103',
            deviceStatus: '未知状态',
            deviceName: 'Device 3',
            deviceImage: 'https://picsum.photos/200/300?random=3',
          },
          {
            deviceId: '004',
            deviceAddress: 'Room 104',
            deviceStatus: '在线',
            deviceName: 'Device 4',
            deviceImage: 'https://picsum.photos/200/300?random=4',
          },
          {
            deviceId: '005',
            deviceAddress: 'Room 105',
            deviceStatus: '离线',
            deviceName: 'Device 5',
            deviceImage: 'https://picsum.photos/200/300?random=5',
          },
          {
            deviceId: '006',
            deviceAddress: 'Room 106',
            deviceStatus: '未知状态',
            deviceName: 'Device 6',
            deviceImage: 'https://picsum.photos/200/300?random=6',
          },
          {
            deviceId: '007',
            deviceAddress: 'Room 107',
            deviceStatus: '在线',
            deviceName: 'Device 7',
            deviceImage: 'https://picsum.photos/200/300?random=7',
          },
          {
            deviceId: '008',
            deviceAddress: 'Room 108',
            deviceStatus: '离线',
            deviceName: 'Device 8',
            deviceImage: 'https://picsum.photos/200/300?random=8',
          },
          {
            deviceId: '009',
            deviceAddress: 'Room 109',
            deviceStatus: '未知状态',
            deviceName: 'Device 9',
            deviceImage: 'https://picsum.photos/200/300?random=9',
          },
          {
            deviceId: '010',
            deviceAddress: 'Room 110',
            deviceStatus: '在线',
            deviceName: 'Device 10',
            deviceImage: 'https://picsum.photos/200/300?random=10',
          },
          {
            deviceId: '011',
            deviceAddress: 'Room 111',
            deviceStatus: '离线',
            deviceName: 'Device 11',
            deviceImage: 'https://picsum.photos/200/300?random=11',
          },
          {
            deviceId: '012',
            deviceAddress: 'Room 112',
            deviceStatus: '未知状态',
            deviceName: 'Device 12',
            deviceImage: 'https://picsum.photos/200/300?random=12',
          },
          {
            deviceId: '013',
            deviceAddress: 'Room 113',
            deviceStatus: '在线',
            deviceName: 'Device 13',
            deviceImage: 'https://picsum.photos/200/300?random=13',
          },
          {
            deviceId: '014',
            deviceAddress: 'Room 114',
            deviceStatus: '离线',
            deviceName: 'Device 14',
            deviceImage: 'https://picsum.photos/200/300?random=14',
          },
          {
            deviceId: '015',
            deviceAddress: 'Room 115',
            deviceStatus: '未知状态',
            deviceName: 'Device 15',
            deviceImage: 'https://picsum.photos/200/300?random=15',
          },
          {
            deviceId: '016',
            deviceAddress: 'Room 116',
            deviceStatus: '在线',
            deviceName: 'Device 16',
            deviceImage: 'https://picsum.photos/200/300?random=16',
          },
          {
            deviceId: '017',
            deviceAddress: 'Room 117',
            deviceStatus: '离线',
            deviceName: 'Device 17',
            deviceImage: 'https://picsum.photos/200/300?random=17',
          },
          {
            deviceId: '018',
            deviceAddress: 'Room 118',
            deviceStatus: '未知状态',
            deviceName: 'Device 18',
            deviceImage: 'https://picsum.photos/200/300?random=18',
          },
          {
            deviceId: '019',
            deviceAddress: 'Room 119',
            deviceStatus: '在线',
            deviceName: 'Device 19',
            deviceImage: 'https://picsum.photos/200/300?random=19',
          },
          {
            deviceId: '020',
            deviceAddress: 'Room 120',
            deviceStatus: '离线',
            deviceName: 'Device 20',
            deviceImage: 'https://picsum.photos/200/300?random=20',
          },
        ],
      }
    },
    computed: {},
    methods: {
      onEdit() {
        // 编辑设备的逻辑
        console.log('编辑设备:', this.deviceId)
      },
      onDelete() {
        // 删除设备的逻辑
        console.log('删除设备:', this.deviceId)
      },
      statusClass(deviceStatus) {
        return {
          'bg-green-500': deviceStatus === '在线',
          'bg-red-500': deviceStatus === '离线',
          'bg-yellow-600': deviceStatus === '未知状态',
        }
      },
    },
  }
</script>

<style scoped>
  .device-card {
    transition: transform 0.2s;
  }

  .device-card:hover {
    transform: scale(1.02);
  }
</style>
