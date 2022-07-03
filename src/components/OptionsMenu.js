import useContextMenu from "../utils/useContextMenu";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFloppyDisk,
  faTrash,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";

const StyledOptionsMenu = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--dark-grey);
  border: 1px solid var(--light-grey);
  font-size: 0.8rem;
  padding: 0.5rem 0 !important;
  border-radius: 3px;

  li {
    padding: 0.8rem 1rem !important;
    margin: 0 !important;
    height: 1.5rem !important;
    border-left: none !important;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start !important;

    &:hover {
      border-radius: 0;
      background-color: var(--light-grey);
    }
  }

  span {
    margin-left: 0.8rem;
    font-weight: 600;
    color: var(--text-color);
  }

  svg {
    font-weight: 100;
    color: #ddd;
  }
`;

const Menu = ({
  archiveScribbleHandler,
  saveScribbleHandler,
  deleteScribbleHandler,
}) => {
  const { anchorPoint, show } = useContextMenu();

  if (show) {
    return (
      <StyledOptionsMenu
        className="menu"
        style={{ top: anchorPoint.y, left: anchorPoint.x }}
      >
        <li onClick={saveScribbleHandler}>
          <FontAwesomeIcon icon={faFloppyDisk} />
          <span>Save</span>
        </li>
        <li onClick={deleteScribbleHandler}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Delete</span>
        </li>
        <li onClick={archiveScribbleHandler}>
          <FontAwesomeIcon icon={faBoxArchive} />
          <span>Archive</span>
        </li>
        <li>Exit</li>
      </StyledOptionsMenu>
    );
  }
  return <></>;
};

export default Menu;
