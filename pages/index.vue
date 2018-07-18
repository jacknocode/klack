<template>
  <section>
     <div class="title">{{ name }}</div>

      <ul>
        <li v-for="Message in Messages" :key="Message.id">{{ Message }}</li>
      </ul>



      <form @submit.prevent="addMessage">
       <input type="text" v-model="newMessage">
       <input type="submit" value="送る">
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
  methods:{
    addMessage: function(){
      this.Messages.push(this.newMessage);
      this.newMessage ="";
    }
  }
}
</script>

<style>
.title {
  color: red;
}
li {
  list-style-type: none;
  }
</style>
