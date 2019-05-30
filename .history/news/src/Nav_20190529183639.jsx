// @flow
import React from "react";
import logo from "./img/y.jpg";
import styled from "styled-components";
import Stories from "./stories";

type Props = {};

type StateProps = {
  searchItem: string,
  currentPage: number
};

class Nav extends React.Component<Props, StateProps> {
  constructor() {
    super();
    this.state = {
      searchItem: "newstories",
      currentPage: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  };

  changeData(data: string) {
    return <Stories searchItem={data} />;
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
              <Category onClick={() => this.changeData("newstories")}>
                new &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeData("paststories")}>
                &nbsp; past &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeData("comments")}>
                &nbsp;comments &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeData("askstories")}>
                &nbsp;ask &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeData("showstories")}>
                &nbsp; show &nbsp;|
              </Category>
            }
            {
              <Category onClick={() => this.changeData("jobstories")}>
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
        <Category onClick={this.handleClick}>show more...</Category>
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
`;
