import { useState } from "react"
import Search from "./Search";
import { SearchPlaylists } from ".";
import { SearchMenuIcon } from "../icons/SearchMenuIcon";
import { SearchMenuExitButtonIcon } from "../icons/SearchMenuExitButtonIcon";
import { SearchMusicListItem } from "../icons/SearchMusicListItem";
import { SearchMusicListIcon } from "../icons/SearchMusicListIcon";

export default function SearchSection() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (!isSearchOpen) {
    return <SearchMenuIcon setIsSearchOpen={setIsSearchOpen} />
  }

  return <div className="search--section-container">
    <SearchMenuExitButtonIcon setIsSearchOpen={setIsSearchOpen} />
    <SearchContainer />
  </div>
}

function SearchContainer() {
  const [activeTab, setActiveTab] = useState(0)

  return <>
    <div className="search--input">
      <div className="search--tab-btns">
        <button className="search--tab-btn" onClick={() => setActiveTab(0)}>
          <SearchMusicListItem activeTab={activeTab} />
        </button>
        <button className="search--tab-btn" onClick={() => setActiveTab(1)}>
          <SearchMusicListIcon activeTab={activeTab} />
        </button>
      </div>
      {activeTab === 0 ? <Search /> : <SearchPlaylists />}
    </div>
  </>
}


