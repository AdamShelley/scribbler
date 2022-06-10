import React from "react";
import styled from "styled-components";

const StyledNote = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  p {
    margin-top: 2rem;
    line-height: 1.8;
  }
`;

const Note = () => {
  return (
    <StyledNote>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque,
        assumenda est architecto natus porro vel, repudiandae accusantium, iusto
        quasi dolorum ducimus corporis! Iusto commodi repudiandae consectetur
        nesciunt nemo quidem enim in itaque facilis, minus odit ad sunt autem
        quos, voluptatibus eos tempora recusandae expedita. Nemo sequi dolore
        doloribus ipsum ratione!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
        ullam officiis culpa et quas dolores, dicta fugiat! Esse pariatur cumque
        aperiam maxime harum et eaque, ratione, sunt consectetur praesentium
        debitis ullam laboriosam ad. Tenetur deleniti voluptatem, inventore
        rerum eius, impedit eos fugiat quia animi dignissimos quo doloremque
        repellat quasi voluptatum optio nam tempora repellendus cumque. Cumque
        nesciunt unde laboriosam obcaecati? Cumque beatae blanditiis, aspernatur
        qui incidunt in autem ut, illo dolor harum quibusdam consequuntur
        aliquam quia explicabo, provident laborum enim. Officiis cum error esse
        assumenda possimus, numquam animi aliquam deleniti molestias commodi est
        explicabo non at. Nihil vero eaque culpa.
      </p>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
        fugit in nulla aliquid. Vitae voluptas aut rem a, possimus iste!
      </p>
    </StyledNote>
  );
};

export default Note;
