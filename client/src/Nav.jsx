// @flow
import React from "react";
import logo from "./img/y.jpg";
import styled from "styled-components";
import Stories from "./Stories";

type StoryCategories =
  | "newstories"
  | "paststories"
  | "comments"
  | "askstories"
  | "showstories"
  | "jobstories";

type NavProps = {};

type NavState = {
  searchItem: StoryCategories,
  currentPage: number
};

class Nav extends React.Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      searchItem: "newstories",
      currentPage: 1
    };
  }

  handleClick = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  };

  changeStories(storyCategory: StoryCategories) {
    this.setState({ searchItem: storyCategory });
  }

  render() {
    return (
      <Container>
        <FeedContainer>
          <NavBar>
            <Logo src={logo} alt="logo" />
            <div>
              &nbsp;<b>Hacker News</b>&nbsp;&nbsp;
            </div>
            {
              <Category onClick={() => this.changeStories("newstories")}>
                new &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeStories("paststories")}>
                &nbsp; past &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeStories("comments")}>
                &nbsp;comments &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeStories("askstories")}>
                &nbsp;ask &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeStories("showstories")}>
                &nbsp; show &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeStories("jobstories")}>
                &nbsp; jobs &nbsp;|
              </Category>
            }
            {
              <Category>
                <Anchor href="https://www.mcdonalds.com/us/en-us.html">
                  &nbsp;submit
                </Anchor>
              </Category>
            }
          </NavBar>
          <Stories
            searchItem={this.state.searchItem}
            currentPage={this.state.currentPage}
          />
        </FeedContainer>
        <MoreStories onClick={this.handleClick}>show more...</MoreStories>
        <div>
          Search:{" "}
          <input
            type="text"
            name="q"
            placeholder=""
            size="17"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="false"
          />
        </div>
      </Container>
    );
  }
}
export default Nav;

const Logo = styled.img`
  border: solid white 0.2px;
`;

const NavBar = styled.div`
  display: flex;
  place-content: center;
  items: center;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  justify-content: flex-start;
  place-content: flex-start;
  width: 100%;
  height: 25px;
  background-color: #f4783a;
`;

const Category = styled.div`
  cursor: pointer;
`;

const MoreStories = styled.div`
  cursor: pointer;
`;

const Anchor = styled.a`
  text-decoration: none;
  color: black;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedContainer = styled.div`
  width: 80%;

  @media (max-width: 700px) {
    width: 100%;
  }
`;
