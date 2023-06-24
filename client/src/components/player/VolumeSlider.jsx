export default function VolumeSlider({ volume, setVolume, setIsMuted }) {
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setIsMuted(false);
    setVolume(newVolume);
    const element = document.getElementById("test");
    element.style.setProperty("--before-width", `${volume * 100}% `);
  };

  return (
    <div class="slider">
      <input
        type="range"
        id="test"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
    </div>
  );
};