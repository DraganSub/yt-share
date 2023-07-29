import BackButtonIcon from "../icons/BackButtonIcon";
import { MobilePlaylistAccordion } from "../mob";
import Logo from "../../common/assets/logo.png";
import { SearchMenuIcon } from "../icons/SearchMenuIcon";

export default function MobileTopMenu({ databaseData, navigate }) {

  return (
    <div className="mobile--top-menu">
      <div className="top-menu__logo">
        <BackButtonIcon navigate={navigate} />
      </div>
      <div className="midd--loc-logo">
        <img src={Logo} className="top--menu-logo" />
      </div>
      <div className="right--menu">
        <div className="custom--lists">
          <MobilePlaylistAccordion databaseData={databaseData} />
        </div>

        <div className="custom--lists">
          <div className="search--menu search--section--mob ">
            <SearchMenuIcon />
          </div>
        </div>
      </div>
    </div>
  )
}