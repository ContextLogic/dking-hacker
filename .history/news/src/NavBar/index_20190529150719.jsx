import React from "react";
import logo from "../img/y.jpg";
import styled from "styled-components";
import NavBar from "../NavBar";

<NavBar>
  <Logo src={logo} alt="logo" />
  <div>
    &nbsp;<b>Hacker News</b>&nbsp;&nbsp;
  </div>
  {
    <ChangeIcon onClick={() => this.getStories("newstories")}>
      new &nbsp;|
    </ChangeIcon>
  }
  {
    <ChangeIcon onClick={() => this.getStories("paststories")}>
      &nbsp; past &nbsp;|
    </ChangeIcon>
  }
  {
    <ChangeIcon onClick={() => this.getStories("comments")}>
      &nbsp;comments &nbsp;|
    </ChangeIcon>
  }
  {
    <ChangeIcon onClick={() => this.getStories("askstories")}>
      &nbsp;ask &nbsp;|
    </ChangeIcon>
  }
  {
    <ChangeIcon onClick={() => this.getStories("showstories")}>
      &nbsp; show &nbsp;|
    </ChangeIcon>
  }
  {
    <ChangeIcon onClick={() => this.getStories("jobstories")}>
      &nbsp; jobs &nbsp;|
    </ChangeIcon>
  }
  {
    <ChangeIcon>
      <Anchor href="https://www.mcdonalds.com/us/en-us.html">
        &nbsp;submit
      </Anchor>
    </ChangeIcon>
  }
</NavBar>;
