import { VideoControlsMuteButtonIcon } from "../icons/VideoControlsMuteButtonIcon";
import { VideoControlsPauseButtonIcon } from "../icons/VideoControlsPauseButtonIcon";
import { VideoControlsPlayButtonIcon } from "../icons/VideoControlsPlayButtonIcon";
import { VideoControlsUnMuteButtonIcon } from "../icons/VideoControlsUnMuteButtonIcon";

export default function VolumeControls({ onPlay, onPause, databaseData, setIsMuted, isMuted }) {
  return (
    <>
      <button className="play-btn" onClick={databaseData.isPlaying ? onPause : onPlay}>
        {databaseData.isPlaying ?
          <VideoControlsPauseButtonIcon />
          :
          <VideoControlsPlayButtonIcon />
        }
      </button>
      <button className="mute-btn" onClick={() => setIsMuted(!isMuted)}>{!isMuted ? <VideoControlsUnMuteButtonIcon />
        :
        <VideoControlsMuteButtonIcon />
      }</button>
    </>
  )
}