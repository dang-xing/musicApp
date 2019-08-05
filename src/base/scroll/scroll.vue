<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "scroll",
        props:{
          probeType:{
              type:Number,
              default:1,
          },
          click:{
            type:Boolean,
            default:true,
          },
        },
        mounted() {
          setTimeout(()=>{
            this._initScroll();
          },40)
        },
        methods:{
          _initScroll(){
            if(!this.$refs.wrapper){
              return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
              probeType: this.probeType,
              click: this.click
            })

          },
          refresh(){
              this.scroll() && this.scroll.refresh();
          },
          scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
          },
          scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
          }
        },
        watch:{
          data() {
            setTimeout(() => {
              this.refresh()
            }, 40)
          }
        }

    }
</script>

<style scoped>

</style>
