import { useState } from "react"
import { SearchMusicListIcon } from "../icons/SearchMusicListIcon";
import { SearchMusicListItem } from "../icons/SearchMusicListItem";
import { SavedPlaylists } from "../saved-playlists";
import Logo from "../../common/assets/logo.png"
import { PlaylistsMenuExitButtonIcon } from "../icons/PlaylistsMenuExitButtonIcon";
import { usePlaylist } from "../../context/PlaylistContext";

export default function MobilePlaylistAccordion({ databaseData }) {

  const { setIsPlaylistActive, isPlaylistActive } = usePlaylist();

  if (!isPlaylistActive) {
    return (<SearchMusicListIcon setIsOpen={setIsPlaylistActive} />)
  }

  return (
    <div className="mob--playlists-section">
      <div className="mob--playlists-container">
        <div className="playlists--header">
          <img className="playlists--logo" src={Logo} alt="logo" />
          <h1 className="playlists--title">Favorite playlists:</h1>
          <div className="playlists--exit-btn">
            <PlaylistsMenuExitButtonIcon />
          </div>
        </div>
        <SavedPlaylists databaseData={databaseData} />
      </div>
    </div>
  )
}