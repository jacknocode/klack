<template>
  <section>
      <img :src="klackIcon" class="title__icon">
      <div class="message__body" :class="currentTabClassname">
        <p v-for="(m, index) in channelMsg" :key="m">{{ m }}
          <span v-on:click="changeEditMode(index)">📝</span>
          <span v-on:click="deleteMessage(index)">❌</span>
        </p>
      </div>
      <div class="message__sidebar">
        <div class="message__sidebar__title">{{ channelIcon }}</div>
        <ul>
          <li v-for="(t, index) in channelNav" @click="changeChannel(index)" :key="t.name">
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
      newMessage: '',
      channels: [
        { name: 'general', icon: '📝',Msg: []},//channnels.Msg[index] = allMessages.channnelData[index] やりたい→Msg: { number: n ,body:"" }
        { name: 'dev', icon: '💻',Msg: []},
        { name: 'asobiba', icon: '🏀',Msg: []}
      ],
      channelIcon:'⤵️',
      channelData: '',
      editNumber: '',
    }
  },
  computed: {
    currentTabClassname() {
      return `message__body_${this.channelData}`;
    },
    channelNav() {
      return this.channels
    },
    currentMessages() {
      return this.channelMsg;
    },
  },
  methods: {
     changeChannel: function (index) {
      this.channelIcon = this.channels[index].icon;
      this.channelData = this.channels[index].name;
      this.channelMsg = this.channels[index].Msg;
    },
    addMessage() {
      this.channelMsg.push(this.newMessage);
      this.newMessage ='';
    },
    changeEditMode(index) {
      this.editNumber = index;
      const editMessageArray = this.channelMsg;
      this.newMessage = editMessageArray[index];
    },
    setMessage() {
      this.$set(this.currentMessages, this.editNumber , this.newMessage);
      this.newMessage ='';
      this.editNumber ='';
    },
    deleteMessage(index) {
      if(confirm('消しちゃうよ?')) {
        this.currentMessages.splice(index, 1);
        // this.$set(this.currentMessages, index , this.channelMsg[index]);
      }
    },
  },
}
</script>
