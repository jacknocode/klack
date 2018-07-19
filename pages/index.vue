<template>
  <section>
     <div class="title">{{ name }}</div>
      <div class="message__body">
        <p v-for="Message in Messages" :key="Message.id">{{ Message }}</p>
      </div>
      <form @submit.prevent="addMessage">
       <input type="text" v-model="newMessage">
       <input type="submit" value="送信">
      </form>
  </section>
</template>
<script>
export default {
  data () {
    return {
      newMessage: '',
      name: 'Wellcome klack!!',
      Messages: []
    }
  },
  watch: {
    Messages: function(){
      localStorage.setItem('Messages', JSON.stringify(this.Messages));
      //   handler: function(){
      //   localStorage.setItem('Messages', JSON.stringify(this.Messages));
      // },
      // deep: ture
    }
  },
  methods:{
    addMessage: function(){
      this.Messages.push(this.newMessage);
      this.newMessage ='';
    },
    // sendMessage() {
    //   let now = new Date()  // 現在時刻（世界標準時）を取得
    //   now.setTime(now.getTime() + 1000 * 60 * 60 * 9) // 日本時間に変換
    //   now = now.toJSON().split('T')[1].slice(0, 5)  // 時刻のみを取得
    // }
  },
}
</script>
<style>
section{
  display: grid;
  grid-template-rows: 80px 500px 60px 1fr;
  grid-template-columns: 100px 300px;
}
.title {
  height: 80px;
  width: 100px;
  color: red;
  border: solid 2px;
}
.message__body {
  grid-row: 2;
  grid-column: 2;
  background-color: #d8d8d8;
}
.message__body > p {
  margin: 10px;
}
form {
  grid-row: 3;
  grid-column: 2;
  margin: auto;
}
form > input {
  border-color: #eeaa2c;
}
</style>
