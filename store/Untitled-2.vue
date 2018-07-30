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
        this.allMessages.splice(index, 1);
      }
    },
    change__channel: function (index) {
      this.channelIcon = this.contents[index];
      this. channelData = this.channelNav[index];
    },
  },
}
</script>