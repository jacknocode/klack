<template>
  <section>
     <div class="title">{{ name }}</div>
      <div class="message__body" :class="currentTabClassname">
        <p v-for="(m, index) in currentMessages" :key="m">{{ m }}
          <span v-on:click="edit__click(index)">📝</span>
          <span v-on:click="delete__click(index)">❌</span>
        </p>
      </div>
      <div class="message__sidebar">
        <div class="message__sidebar__title">{{ channelIcon }}</div>
        <ul>
          <li v-for="(t, index) in channelNav" @click="change__channel(index)" :key="t">
            {{ t }}
          </li>
        </ul>
      </div>
      <form @submit.prevent="addMessage">
       <textarea type="text" v-model="newMessage" class="Message__text"></textarea>
       <input type="submit" value="送信" class="Message__btn">
      </form>
  </section>
</template>
<script>

const channels = ['general', 'dev', 'asobiba'];

const allMessages = {};
channels.forEach((c) => {
  allMessages[c] = [];
});

export default {
  data () {
    return {
      newMessage: '',
      name: 'Wellcome klack!!',
      channelNav: channels,
      contents: [
        '📝',
        '💻',
        '🏀'
      ],
      channelIcon:'🏠',
       channelData: '',

      allMessages
    }
  },
  computed: {
    currentTabClassname() {
      return `message__body_${this. channelData}`;
    },

    currentMessages() {
      return this.allMessages[this. channelData] || [];
    }
  },
  // mounted() {
  //   window.setInterval(() => {
  //     this.releasedAtFromNow = this.getReleasedAtFromNow()
  //     }, 1000 * 60)
  // },
  // watch: {
  //   Messages: function() {
  //     localStorage.setItem('Messages', JSON.stringify(this.Messages));
  //     //   handler: function() {
  //     //   localStorage.setItem('Messages', JSON.stringify(this.Messages));
  //     // },
  //     // deep: ture
  //   }
  // },
  methods: {

    addMessage() {
      this.currentMessages.push(this.newMessage);
      this.newMessage ='';
    },
    edit__click(index) {
      const newMessagesArray = this.currentMessages;
      this.currentMessages = [];
      const newMessages = window.prompt('Message edit' , newMessagesArray[index]);
      if (typeof newMessages === 'string') {
        newMessagesArray[index] = newMessages;
      }
      this.currentMessages = newMessagesArray;
    },
    delete__click(index) {
      if(confirm('消しちゃうよ?')) {
        this.currentMessages.splice(index, 1);
      }
    },
    change__channel: function (index) {
      this.channelIcon = this.contents[index];
      this. channelData = this.channelNav[index];
    },
    // async changeCL() {
    //    this.$store.dispatch("addMessage",{
    //       Messages: this.Messages
    //       })
    //   }
  },
}
</script>
<style>
section {
  display: grid;
  grid-template-rows: 80px 500px 60px 1fr;
  grid-template-columns: 100px 300px;
}
.title {
  height: 80px;
  width: 100px;
  color: #3ca89f;
  border: solid 2px;
}
.message__body {
  grid-row: 2;
  grid-column: 2;
  background-color: #ffffff;
}
.message__body_dev {
  background-color: #d3d3d3;
}
.message__body_asobiba {
  background-color: #bdd3dd;
}
.message__body > p {
  margin: 10px;
  display: grid;
  grid-template-columns: 240px 20px 20px;
  border-bottom: solid 0.2px #ccc;
  padding-bottom: 6px;
}
p > span {
  font-size: 13px;
}
.message__sidebar {
  grid-column: 1;
  background-color: #3ca89f;
}
.message__sidebar > ul {
  list-style-type:none;
  padding: 0;
  text-align: center;

}
.message__sidebar > ul > li {
  padding: 10px;
  border-bottom: solid 0.2px #badbeb;
}
.message__sidebar__title {
  text-align: center;
  margin: 20px;
  font-size: 20px;
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
.Message__btn:hover {
  background-color: #38a5ff;
  transition: 0.2s;
}
</style>
