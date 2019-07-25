export default class song{
  constructor({id,img,singer,name,url,alubm}){   //
    this.id=id;
    this.img=img;
    this.singer=singer;
    this.name=name;
    this.url=url;
    this.alubm=alubm;
  };
}
export function creatSong(hotSongs) {
  return new song({
    id:hotSongs.id,
    img:hotSongs.al.picUrl,
    singer:fitterSong(hotSongs.ar),
    name:hotSongs.name,
    alubm:hotSongs.al.name,
    url:`https://music.163.com/song/media/outer/url?id=${hotSongs.id}.mp3`
  })
}
function fitterSong(al) {
  let ret=[];
  if(al==''){
    return
  }
  al.forEach((item)=>{
    ret.push(item.name)
  })
  return ret.join('/')

}
