import { usePlaylist } from "../../context/PlaylistContext"

export function PlaylistsMenuExitButtonIcon() {

  const { setIsPlaylistActive } = usePlaylist();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      onClick={() => { setIsPlaylistActive(false) }}
      class="w-6 h-6 exit-search"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}