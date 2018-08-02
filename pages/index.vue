<template>
  <section>
      <img :src="klackIcon" class="title__icon">
      <div class="message__body" :class="currentTabClassname">
        <p v-for="(m, index) in currentChannelMessages" :key="m">{{ m }}
          <span v-on:click="changeEditMode(index)">📝</span>
          <span v-on:click="deleteMessage(index)">❌</span>
        </p>
      </div>
      <div class="message__sidebar">
        <div class="message__sidebar__title">{{ currentChannel.icon }}</div>
        <ul>
          <li v-for="(t, index) in channels" @click="changeChannel(index)" :key="t.name">
            {{ t.name }}
          </li>
        </ul>
      </div>
      <form @submit.prevent="addMessage">
       <textarea type="text" v-model="newMessage" class="message__text"></textarea>
       <input type="submit" value="送信" class="message__btn">
      </form>
      <form v-if="this.editNumber !== ''"  @submit.prevent="setMessage" class="form2">
       <textarea type="text" v-model="newMessage" class="message__text"></textarea>
       <input type="submit" value="確定" class="message__btn">
      </form>
  </section>
</template>
<script>
import lodash from'lodash'

export default {
  data () {
    return {
      klackIcon: require("../assets/klack-logo.png"),

      channels: [
        { name: 'general', icon: '📝',Msg: []},//channnels.Msg[index] = allMessages.channnelData[index] やりたい→Msg: { number: n ,body:"" }
        { name: 'dev', icon: '💻',Msg: []},
        { name: 'asobiba', icon: '🏀',Msg: []}
      ],

      currentChannelIndex: 0,

      newMessage: '',
      editNumber: ''
    }
  },
  computed: {
    currentTabClassname() {
      return `message__body_${this.currentChannel.name}`;
    },
    currentChannel() {
      return this.channels[this.currentChannelIndex];
    },
    currentChannelMessages() {
      return this.currentChannel.Msg;
    }
  },
  methods: {
     changeChannel(index) {
       this.currentChannelIndex = index;
     },
    addMessage() {
      this.currentChannelMessages.push(this.newMessage);
      this.newMessage ='';
    },
    changeEditMode(index) {
      this.editNumber = index;
      this.newMessage = this.currentChannelMessages[index];
    },
    setMessage() {
      this.currentChannelMessages[this.editNumber] = this.newMessage;
      this.newMessage ='';
      this.editNumber ='';
    },
    deleteMessage(index) {
      if(confirm('消しちゃうよ?')) {
        this.currentChannelMessages.splice(index, 1);
        // this.$set(this.currentMessages, index , this.channelMsg[index]);
      }
    },
  },
}
</script>
