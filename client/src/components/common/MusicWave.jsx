export default function MusicWave({ isPlaying, className }) {
  if (!isPlaying) {
    return null;
  }

  return (
    <div class={className != null ? `${className} boxContainer` : "boxContainer"} >
      <div class="box box1"></div>
      <div class="box box2"></div>
      <div class="box box3"></div>
      <div class="box box4"></div>
      <div class="box box5"></div>
    </div>
  )
}