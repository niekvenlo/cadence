"use client";

import styled from "styled-components";

import BasicLink from "./basic/BasicLink";

const AppHeaderWrapper = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 3em;
  width: 100%;
`;
const Links = styled.header`
  align-items: center;
  display: flex;
  flew-wrap: wrap;
  gap: 0.5em;
  justify-content: space-between;
  min=width: 30em;
`;

function AppHeader() {
  return (
    <AppHeaderWrapper>
      <h1>Cadence</h1>
      <Links>
        <BasicLink href="/">Home</BasicLink>
        <BasicLink href="/about">About</BasicLink>
        <BasicLink href="/contact">Contact</BasicLink>
      </Links>
    </AppHeaderWrapper>
  );
}

export default AppHeader;
