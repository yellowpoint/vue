
<script>
export default {

  props: {
    panes:{
      type:Array,
      require: true
    }
  },
  mounted(){
    //  console.log(this.panes)
    // setTimeout(()=>{
    //   console.log(this.panes)
    // },1000)
  },
  watch: {
    panes(){
      console.log('panes watch')
    }
  },
  render() {
    console.log('render')
    const contents = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null;
    });
    return (
        <div class="tabs-content">{contents}</div>
    );
  },
  methods: {

  }
};
</script>
