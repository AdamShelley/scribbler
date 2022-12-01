import React, { useState } from "react";

import { useAuth } from "../utils/auth";
import { StyledSidebar } from "../styles/SidebarStyles";
import SidebarTabs from "./SidebarTabs";

import {
  saveScribbleToDatabase,
  deleteScribbleFromDatabase,
  archiveScribbleInDatabase,
  restoreScribbleToMain,
  moveScribbleToBin,
  duplicateScribbleHandler,
  pinScribbleHandler,
} from "../utils/HandleScribbles";

import OptionsMenu from "./OptionsMenu";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";

const Sidebar = ({
  scribbles,
  archived,
  setArchived,
  deleted,
  setDeleted,
  selectedScribble,
  changeScribble,
  createNewScribble,
  setScribbles,
  setSelectedScribble,
  settings,
  isMobile,
}) => {
  const [showScribbles, setShowScribbles] = useState(
    settings?.expandScribbles === "Yes" ? true : false
  );
  const [showArchive, setShowArchive] = useState(
    settings?.expandArchive === "Yes" ? true : false
  );
  const [showBin, setShowBin] = useState(
    settings?.expandBin === "Yes" ? true : false
  );

  const [currentRightClickedScribble, setCurrentRightClickedScribble] =
    useState(null);
  const { user } = useAuth();

  const archiveScribbleHandler = () => {
    archiveScribbleInDatabase(
      currentRightClickedScribble,
      setScribbles,
      setArchived,
      user.uid
    );
  };

  const saveScribbleHandler = () => {
    const { body, title } = currentRightClickedScribble;
    saveScribbleToDatabase(
      body,
      title,
      scribbles,
      selectedScribble,
      setSelectedScribble,
      setScribbles,
      user.uid
    );
  };

  const restoreScribbleHandler = () => {
    const prevLoc = currentRightClickedScribble.archived
      ? "archive"
      : "deleted";
    const setPrevLoc = currentRightClickedScribble.archived
      ? setArchived
      : setDeleted;
    restoreScribbleToMain(
      currentRightClickedScribble,
      setScribbles,
      prevLoc,
      setPrevLoc,
      user.uid
    );
  };

  const binScribbleHandler = () => {
    moveScribbleToBin(
      currentRightClickedScribble,
      setScribbles,
      setDeleted,
      setArchived,
      user.uid
    );
  };

  const deleteScribbleHandler = () => {
    deleteScribbleFromDatabase(
      currentRightClickedScribble,
      setDeleted,
      user.uid
    );
  };

  const deleteAllScribblesInBin = () => {
    deleted.forEach((deletedScribble) => {
      deleteScribbleFromDatabase(deletedScribble, setDeleted, user.uid);
    });
  };

  const copyScribbleHandler = () => {
    duplicateScribbleHandler(
      currentRightClickedScribble.id,
      user.uid,
      setScribbles,
      setSelectedScribble
    );
  };

  const unpinScribble = (id) => {
    pinScribbleHandler(
      scribbles,
      setScribbles,
      id,
      { pinned: false },
      user.uid
    );

    toast.success("Removed pin from Scribble", toastOptions);
  };

  return (
    <StyledSidebar className="selector selector-2" isMobile={isMobile}>
      <OptionsMenu
        currentRightClickedScribble={currentRightClickedScribble}
        archiveScribbleHandler={archiveScribbleHandler}
        saveScribbleHandler={saveScribbleHandler}
        deleteScribbleHandler={deleteScribbleHandler}
        binScribbleHandler={binScribbleHandler}
        restoreScribbleHandler={restoreScribbleHandler}
        copyScribbleHandler={copyScribbleHandler}
        archivedMenu={currentRightClickedScribble?.archived}
        deleteMenu={currentRightClickedScribble?.deleted}
        fullMenu={
          !currentRightClickedScribble?.archived &&
          !currentRightClickedScribble?.deleted
        }
      />

      <SidebarTabs
        naming={"Scribbles"}
        setShowScribbles={setShowScribbles}
        setCurrentRightClickedScribble={setCurrentRightClickedScribble}
        showScribbles={showScribbles}
        scribbles={scribbles}
        createNewScribble={createNewScribble}
        changeScribble={changeScribble}
        selectedScribble={selectedScribble}
        isMobile={isMobile}
        unpinScribble={unpinScribble}
      />
      <SidebarTabs
        naming={"Archive"}
        setShowScribbles={setShowArchive}
        setCurrentRightClickedScribble={setCurrentRightClickedScribble}
        showScribbles={showArchive}
        scribbles={archived}
        changeScribble={changeScribble}
        selectedScribble={selectedScribble}
        isMobile={isMobile}
      />

      <SidebarTabs
        naming={"Bin"}
        setShowScribbles={setShowBin}
        showScribbles={showBin}
        setCurrentRightClickedScribble={setCurrentRightClickedScribble}
        scribbles={deleted}
        changeScribble={changeScribble}
        selectedScribble={selectedScribble}
        deleteAllScribblesInBin={deleteAllScribblesInBin}
        isMobile={isMobile}
      />
    </StyledSidebar>
  );
};

export default Sidebar;
