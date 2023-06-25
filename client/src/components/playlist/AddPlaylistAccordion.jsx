import { useState } from "react";
import { AddWholePlaylist } from ".";
import { AddPlaylistAccordionButtonIcon } from "../icons/AddPlaylistAccordionButtonIcon";

export default function AddPlaylistAccordion() {

  const [isOpen, setIsOpen] = useState(false);
  return <>
    <div className="add-pl--btn">
      <AddPlaylistAccordionButtonIcon
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </div>
    {isOpen && <div className="add--form-accordion">
      <AddWholePlaylist setIsOpen={setIsOpen} />
    </div>}
  </>
}