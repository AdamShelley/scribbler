import useContextMenu from "../utils/useContextMenu";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFloppyDisk,
  faTrash,
  faBoxArchive,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const StyledOptionsMenu = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--background);
  border: 1px solid var(--light-grey);
  font-size: 0.8rem;
  padding: 0 !important;
  border-radius: 2px;
  z-index: 999;
  box-shadow: 4px 9px 16px -3px rgba(0, 0, 0, 0.75);

  li {
    padding: 1rem 1rem !important;
    margin: 0 !important;
    height: 1.5rem !important;
    border-left: none !important;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start !important;

    &:hover {
      span {
        color: #ccc;
      }
    }
  }

  span {
    margin-left: 0.8rem;
    font-weight: 600;
    color: var(--text-color);
  }
  svg {
    font-weight: 100;
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.8;
  }
`;

const Menu = ({
  currentRightClickedScribble,
  archiveScribbleHandler,
  saveScribbleHandler,
  binScribbleHandler,
  deleteScribbleHandler,
  restoreScribbleHandler,
  copyScribbleHandler,
  fullMenu,
  deleteMenu,
  archivedMenu,
}) => {
  const { anchorPoint, show } = useContextMenu();

  // console.log(anchorPoint);

  if (currentRightClickedScribble === null) return;

  let menuChoices;
  if (fullMenu) {
    menuChoices = (
      <>
        <li onClick={saveScribbleHandler}>
          <FontAwesomeIcon icon={faFloppyDisk} />
          <span>Save</span>
        </li>
        <li onClick={copyScribbleHandler}>
          <FontAwesomeIcon icon={faCopy} />
          <span>Duplicate</span>
        </li>
        <li onClick={binScribbleHandler}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Delete</span>
        </li>
        <li onClick={archiveScribbleHandler}>
          <FontAwesomeIcon icon={faBoxArchive} />
          <span>Archive</span>
        </li>
      </>
    );
  } else if (deleteMenu) {
    menuChoices = (
      <>
        <li onClick={restoreScribbleHandler}>
          <FontAwesomeIcon icon={faBoxArchive} />
          <span>Restore</span>
        </li>
        <li onClick={deleteScribbleHandler}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Fully Delete</span>
        </li>
      </>
    );
  } else if (archivedMenu) {
    menuChoices = (
      <>
        <li onClick={binScribbleHandler}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Delete</span>
        </li>
        <li onClick={restoreScribbleHandler}>
          <FontAwesomeIcon icon={faBoxArchive} />
          <span>Restore</span>
        </li>
      </>
    );
  } else {
    menuChoices = <></>;
  }

  if (show) {
    return (
      <StyledOptionsMenu
        className="menu"
        style={{ top: anchorPoint.y - 50, left: anchorPoint.x }}
      >
        {menuChoices}
      </StyledOptionsMenu>
    );
  }
  return <></>;
};

export default Menu;
