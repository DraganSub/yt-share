import { MusicWave } from "../common"

export default function CurrentPlayingSong(data) {
  if (data?.data.playList == null) {
    return <div>Not playing any song currently.</div>
  }

  const id = Object.values(data.data.playList).findIndex(element => element.videoId === data.data.specificVideo)

  const test = Object.values(data.data.playList).map((vid, i) => {
    if (i == id) {
      const sideImg = Object.values(data.data.playList)

      return <div className="pos-rel flex center current">
        <img className="prev-played-video" src={sideImg[i - 1]?.thumbnailUrl} />
        <div className="pos-rel">
          <img className="currently-playing-img" src={vid.thumbnailUrl} />
          <MusicWave isPlaying={data.data.isPlaying} />
          <h3 className="playing--title">{vid.videoTitle}</h3>
        </div>
        <img className="next-played-video" src={sideImg[i + 1]?.thumbnailUrl} />
      </div>
    }
  })
  return test;
}
