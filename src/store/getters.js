export const singer = state =>state.singer
export const playing = state=>state.playing
export const fullScreen = state =>state.fullScreen
export const playList = state=>state.playList
export const squeenList = state=>state.squeenList
export const currentIndex=state=>state.currentIndex
export const loop=state=>state.loop
export const order=state=>state.order
export const currentSong=(state)=>{
  return state.playList[state.currentIndex]
}
