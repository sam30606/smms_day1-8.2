import { createApp } from 'vue/dist/vue.esm-bundler.js'

createApp({
  data() {
    return {
      title: 'NestJS Chat Real Time',
      name: '',
      text: '',
      selected: 'general',
      messages: [],
      socket: null,
      activeRoom: '',
      isShow: true,
      showChatWindow: false,
      showLeaveWindow: false,
      rooms: {
        general: false,
        roomA: false,
        roomB: false,
        roomC: false,
        roomD: false
      },
      listRooms: ['general', 'roomA', 'roomB', 'roomC', 'roomD'],
      isDisabled: true,
      clientCount: 0,
      roomClients: {
        general: 0,
        roomA: 0,
        roomB: 0,
        roomC: 0,
        roomD: 0
      },
      // otherMessage: ['溫度', '濕度'],
      humidity: {
        value: '更新中',
        timestamp: ''
      },
      temperature: {
        value: '更新中',
        timestamp: ''
      }
    }
  },
  methods: {
    // -------------------------
    intoChat() {
      if (this.name) {
        this.messages = []
        this.isShow = false
        this.showChatWindow = true
        this.socket.emit('joinRoom', {
          name: this.name,
          room: this.activeRoom,
          action: 'join'
        })
      }
    },
    switchBtn() {
      this.showLeaveWindow = true
    },
    leaveBtn() {
      this.showLeaveWindow = false
      this.showChatWindow = false
      this.isShow = true
      this.socket.emit('leaveRoom', {
        name: this.name,
        room: this.activeRoom,
        action: 'leave'
      })
    },
    exitBtn() {
      this.showChatWindow = true
      this.showLeaveWindow = false
    },
    handler() {
      if (this.isShow === false) {
        this.socket.emit('leaveRoom', {
          name: this.name,
          room: this.activeRoom
        })
      }
    },

    // ------------------------

    onChange(event) {
      // this.socket.emit('leaveRoom', {
      //   name: this.name,
      //   room: this.activeRoom
      // })
      this.activeRoom = event.target.value
      // this.socket.emit('joinRoom', {
      //   name: this.name,
      //   room: this.activeRoom
      // })
    },

    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
          room: this.activeRoom
        }
        this.socket.emit('msgToServer', message)
        this.text = ''
      }
    },

    receivedMessage(message) {
      this.messages.push(message)
    },

    validateInput() {
      return this.name.length > 0 && this.text.length > 0
    },

    // check() {
    //   if (this.isMemberOfActiveRoom) {
    //     this.socket.emit('leaveRoom', {
    //       name: this.name,
    //       room: this.activeRoom
    //     })
    //   } else {
    //     this.socket.emit('joinRoom', {
    //       name: this.name,
    //       room: this.activeRoom
    //     })
    //   }
    // },

    onNameChange(event) {
      if (this.name == '') {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    }
  },
  computed: {
    isMemberOfActiveRoom() {
      return this.rooms[this.activeRoom]
    }
  },

  created() {
    window.addEventListener('beforeunload', this.handler)
    this.activeRoom = this.selected
    this.socket = io('localhost:9090', {
      transports: ['websocket']
    })

    this.socket.on('msgToClient', (message) => {
      console.log('msgToClient', message)
      this.receivedMessage(message)
    })

    this.socket.on('roomMsg', (message) => {
      console.log('roomMsg', message)
      this.receivedMessage(message)
      this.clientCount = message.count
    })

    // this.socket.on('  ', (messages) => {
    //   console.log('connect', messages)
    //   // this.check()
    // })

    this.socket.on('joinedRoom', (room) => {
      console.log('joinedRoom', room)
      this.rooms[room] = true
    })

    this.socket.on('leftRoom', (room) => {
      console.log('leftRoom', room)
      this.rooms[room] = false
    })

    this.socket.on('roomNotiMsg', (messages) => {
      console.log('roomNotiMsg', messages)
      this.receivedMessage({
        name: messages.name,
        text:
          '使用者 [ ' +
          messages.name +
          ' ] ' +
          (messages.action == 'join' ? '加入' : '離開') +
          '了 [ ' +
          messages.room +
          ' ] 聊天室。'
      })
    })

    this.socket.on('updateClientCnt', (message) => {
      console.log('updateClientCnt', message)
      this.roomClients[message['room']] = message['count']
    })

    this.socket.on('emitHumi', (env_data) => {
      console.log('emitHumi', env_data)
      this.humidity.value = env_data.value
      this.humidity.timestamp = env_data.timestamp
    })

    this.socket.on('emitTemp', (env_data) => {
      console.log('emitTemp', env_data)
      this.temperature.value = env_data.value
      this.temperature.timestamp = env_data.timestamp
    })
  }
}).mount('#app')
