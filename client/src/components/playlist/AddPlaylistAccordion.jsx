import { useState } from "react";
import { AddWholePlaylist } from ".";

export default function AddPlaylistAccordion() {

  const [isOpen, setIsOpen] = useState(false);
  return <>
    <div className="add-pl--btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-6 h-6" style={{ width: "30px", height: "30px", background: "transparent" }} onClick={() => setIsOpen(!isOpen)}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    {isOpen && <div className="add--form-accordion">
      <AddWholePlaylist setIsOpen={setIsOpen} />
    </div>}
  </>
}