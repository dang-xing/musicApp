import * as types from './mutatins-types'
export const selectPlay=function ({commit,state},{list,index}) {

  commit(types.SET_FULLSCREEN,true)
  commit(types.SET_PLAYLIST,list)
  commit(types.SET_SQUEENLIST,list)
  commit(types.SET_CURRENTINDEX,index)
  commit(types.SET_PLAYING,true)
}
