import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NavBurger from "../components/NavBurger";
import NoteContainer from "../components/NoteContainer";
import firestore from "../utils/db";
import { collection, getDocs } from "firebase/firestore";
import { CSSTransition } from "react-transition-group";

const StyledContainer = styled.div`
  display: flex;
  min-height: 80vh; /* Change this later */
  width: 100%;
`;

const scribbles = [
  {
    id: 1,
    title: "Shopping list",
    createdAt: new Date(),
    body: `# shopping List 
    *Tomatoes 
    * Apples 
    * Oranges`,
  },
  { id: 2, title: "Lecture notes", createdAt: new Date(), body: "# Testing 2" },
  {
    id: 3,
    title: "Movies to watch",
    createdAt: new Date(),
    body: "# Testing 3",
  },
  { id: 4, title: "Journal Day 1", createdAt: new Date(), body: "# Testing 4" },
];

const emptyScribble = {
  id: "empty",
  title: "Empty Note",
  createdAt: new Date(),
  body: "# Start by typing and creating a scribble",
};

const Scribble = () => {
  let fakeFirebaseRequest = scribbles;
  const [showNav, setShowNav] = useState(false);
  const [users, setUsers] = useState();
  const [selectedScribble, setSelectedScribble] = useState(
    fakeFirebaseRequest[0]
  );

  const usersCollectionRef = collection(firestore, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log("called");
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      <Navbar
        setShowNav={setShowNav}
        noteTitle={selectedScribble.title}
        unsaved={true}
      />
      <CSSTransition
        in={showNav}
        timeout={300}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <NavBurger />
      </CSSTransition>
      <StyledContainer>
        <Sidebar
          scribbles={scribbles}
          selectedScribble={selectedScribble}
          setSelectedScribble={setSelectedScribble}
        />
        <NoteContainer
          scribbles={scribbles}
          selectedScribble={selectedScribble}
        />
      </StyledContainer>
    </div>
  );
};

export default Scribble;
