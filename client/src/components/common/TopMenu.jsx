import BackButtonIcon from "../icons/BackButtonIcon";
import Logo from "../../common/assets/logo.png"
import { MobilePlaylistAccordion } from "../mob";
import { SearchMenuIcon } from "../icons/SearchMenuIcon";
export default function TopMenu({ databaseData, navigate }) {

  return (
    <div className="top--menu-wrap">
      <div className="top-menu__logo-pic">
        <BackButtonIcon navigate={navigate} />
      </div>
      <div className="logo--left-pos">
        <img src={Logo} className="top--menu-logo" />
      </div>
      <div className="top__menu-right">
        <div className="custom--lists--w">
          <MobilePlaylistAccordion databaseData={databaseData} />
        </div>

        <div className="custom--lists--w">
          <div className="search--menu search--section--mob ">
            <SearchMenuIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
