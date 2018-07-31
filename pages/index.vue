<template>
  <section>
     <div class="title">{{ name }}</div>
      <div class="message__body" :class="currentTabClassname">
        <p v-for="(m, index) in currentMessages" :key="m">{{ m }}
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
       <textarea type="text" v-model="newMessage" class="Message__text"></textarea>
       <input type="submit" value="送信" class="Message__btn">
      </form>
      <form @submit.prevent="setMessage" class="form2">
       <textarea type="text" v-model="newMessage" class="Message__text"></textarea>
       <input type="submit" value="確定" class="Message__btn">
      </form>
  </section>
</template>
<script>
const allMessages = {
   'general': [],
   'dev': [],
   'asobiba': []
};
export default {
  data () {
    return {
      newMessage: '',
      name: 'Wellcome klack!!',
      channels: [
        { name: 'general', icon: '📝' },
        { name: 'dev', icon: '💻' },
        { name: 'asobiba', icon: '🏀' }
      ],
      channelIcon:'🏠',
      channelData: '',
      editNumber: '',
      allMessages
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
      return allMessages[this.channelData];
    },
    // editModeClassname() {
    //   return  `form__body_editMode`;
    // }
  },
  methods: {
     changeChannel: function (index) {
      this.channelIcon = this.channels[index].icon;
      this.channelData = this.channels[index].name;
    },
    addMessage() {
      this.currentMessages.push(this.newMessage);
      this.newMessage ='';
    },
    changeEditMode(index) {
      this.editNumber = index;
      const eMA = this.currentMessages;
      this.newMessage = eMA[index];     // class付与　editMode
    },
    setMessage() {

      this.$set(this.currentMessages, this.editNumber , this.newMessage);
      this.newMessage ='';
    },
    deleteMessage(index) {
      if(confirm('消しちゃうよ?')) {
        this.currentMessages.splice(index, 1);
      }
    },
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
.form2 {
  grid-row: 3;
  grid-column: 3;
}
.form2 > textarea {
  background-color: #e6f0af;
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
