import { useState } from "react"
import Search from "./Search";
import { SearchPlaylists } from ".";
import { SearchMenuIcon } from "../icons/SearchMenuIcon";
import { SearchMenuExitButtonIcon } from "../icons/SearchMenuExitButtonIcon";
import { SearchMusicListItem } from "../icons/SearchMusicListItem";
import { SearchMusicListIcon } from "../icons/SearchMusicListIcon";
import { useSearch } from "../../context/SearchContex";

export default function SearchSection() {
  const {
    isSearchActive,
    setIsSearchActive
  } = useSearch();

  if (!isSearchActive) {
    return <SearchMenuIcon setIsSearchActive={setIsSearchActive} />
  }

  return <div className="search--section-container">
    <SearchMenuExitButtonIcon setIsSearchActive={setIsSearchActive} />
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


