import * as types from './mutatins-types'
const mutations={
  [types.SET_SINGER](state,singer){
    state.singer=singer
  },
  [types.SET_PLAYING](state,flag){
    state.playing=flag
  },
  [types.SET_FULLSCREEN](state,flag){
    state.fullScreen=flag
  },
  [types.SET_PLAYLIST](state,list){
    state.playList=list
  },
  [types.SET_SQUEENLIST](state,list){
    state.squeenList=list
  },
  [types.SET_CURRENTINDEX](state,index){
    state.currentIndex=index
  },
  [types.SET_LOOP](state,flag){
    state.loop=flag;
  },
  [types.SET_ORDER](state,flag){
    state.order=flag;
  }

 }
export default mutations;
