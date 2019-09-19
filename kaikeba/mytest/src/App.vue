<template>
  <div id="app">
    <!-- <notification content="aaaa"></notification> -->
    <h1>{{$store.name}}</h1>
    <div>冲啊，手榴弹扔了{{$store.state.count}}个</div>
    <button @click="add">扔一个</button>
    <button @click="addAsync">蓄力扔俩</button>
    <img src="./assets/logo.png" />
    <router-view />
    <button @click="notify">点我show notify</button>
    <button @click="notify_hd">点我show notify_hd</button>
    <input
      type="text"
      v-model="inputValue"
    >
    <slotTest>{{inputValue}}</slotTest>
    <Tabs
      :value="tabsIndex"
      @change="tabsChange"
    >
      <Tab
        label="111"
        index="1"
      >
        <span>tab1 content{{inputValue}}</span>
      </Tab>
      <Tab
        label="222"
        index="2"
      >
        <span>tab2 content</span>
      </Tab>
      <Tab
        label="333"
        index="3"
      >
        <span>tab3 content</span>
      </Tab>
    </Tabs>
    <div :class="[undefinedData ? 'a11' : 'a22']">{{}}</div>
    <div>{{getName()}}</div>
    <div>{{getNameByComputed}}</div>
    <div>{{getNameByComputed_set}}</div>
    <div>name:<input
        type="text"
        v-model="getNameByComputed_set"
      ></div>
      <div v-for="item of obj" :key="item">{{item}}</div>
  </div>
</template>

<script>
import slotTest from './components/slotTest'
export default {
  name: "App",
  components: {
    slotTest
  },
  data() {
    return {
      tabsIndex: "1",
      inputValue: "",
      name: '我是name',
      obj:{
        a:11,
        b:22
      }
    };
  },
  created() {
    this.undefinedData = '哈哈'
  },
  mounted() {
    // this.undefinedData = '哈哈'
    document.dispatchEvent(new Event('render-event'))
  },
  watch: {
    name: {
      handler() {
        console.log('change了')
      },
      // immediate: true //true表示初次赋值也执行一次watch

    },

  },
  computed: {
    getNameByComputed() {
      console.log('getNameByComputed')
      return this.name
    },
    getNameByComputed_set: {
      get() {
        console.log('getNameByComputed_set')
        return this.name + 'getNameByComputed_set'
      },
      set(name) {
        console.log(name)
      }
    }
  },
  methods: {
    add() {
      this.$store.commit("increment");
    },
    addAsync() {
      this.$store.dispatch("incrementAsync");
    },
    notify() {
      this.$notify({
        content: "wosghui"
      });
    },
    notify_hd() {
      this.$notify_hd({
        content: "hahah"
      });
    },
    tabsChange(index) {
      this.tabsIndex = index;
    },
    getName() {
      console.log('getName')
      return this.name
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>