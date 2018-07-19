<template>
  <section>
     <div class="title">{{ name }}</div>
      <div class="message__body">
        <p v-for="(m, index) in messageData" :key="m">{{ m }}
          <span v-on:click="edit__click(index)">📝</span>
          <span v-on:click="delete__click(index)">❌</span>
        </p>
      </div>
      <form @submit.prevent="addMessage">
       <textarea type="text" v-model="newMessage" class="Message__text"></textarea>
       <input type="submit" value="送信" class="Message__btn">
      </form>
  </section>
</template>
<script>
export default {
  data () {
    return {
      newMessage: '',
      name: 'Wellcome klack!!',
      Messages: [

      ]
    }
  },
  computed: {
    messageData() {
      return this.Messages;
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
    addMessage(){
      this.Messages.push(this.newMessage);
      this.newMessage ='';
    },
    edit__click(index) {
      var newMessagesArray = this.Messages;
      this.Messages = [];
      var newMessages = window.prompt('Message edit' , newMessagesArray[index]);
      if (typeof newMessages === 'string') {
        newMessagesArray[index] = newMessages;
      }
      this.Messages = newMessagesArray;
    },
    delete__click(index){
      if(confirm('消しちゃうよ?')){
        this.Messages.splice(index, 1);
      }
    }
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
  display: grid;
  grid-template-columns: 240px 20px 20px;
  border-bottom: solid 0.2px #ccc;
  padding-bottom: 6px;
}
p > span {
  font-size: 14px;
}
form {
  grid-row: 3;
  grid-column: 2;
  display: flex;
}
.Message__text {
  height: 60px;
  width: 230px;
}
.Message__btn {
  height: 60px;
  width: 70px;
  background-color: #3170e6;
  color: #fff;
}
.Message__btn:hover{
  background-color: #38a5ff;
  transition: 0.2s;
}
</style>
