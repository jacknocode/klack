export default{
  name: 'chat',
  methods: {
    send_message(){
      this.message.push(this.message)
      this.message = ""
    }
  },
  data(){
    return {
      message: "",
      messages:[]
    }
  }
}
