import React from "react";
import logo from "../img/y.jpg";
import styled from "styled-components";
import Stories from "../Stories";

type StateProps = {
  searchItem: string
};

class Nav extends React.Component<StateProps> {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: "newstories"
    };
  }

  changeData(data) {
    this.setState({ searchItem: data });
  }

  render() {
    return (
      <Container>
        <Resize>
          <NavBar>
            <Logo src={logo} alt="logo" />
            <div>
              &nbsp;<b>Hacker News</b>&nbsp;&nbsp;
            </div>
            {
              <ChangeIcon onClick={() => this.changeData("newstories")}>
                new &nbsp;|
              </ChangeIcon>
            }
            {
              <ChangeIcon onClick={() => this.changeData("paststories")}>
                &nbsp; past &nbsp;|
              </ChangeIcon>
            }
            {
              <ChangeIcon onClick={() => this.changeData("comments")}>
                &nbsp;comments &nbsp;|
              </ChangeIcon>
            }
            {
              <ChangeIcon onClick={() => this.changeData("askstories")}>
                &nbsp;ask &nbsp;|
              </ChangeIcon>
            }
            {
              <ChangeIcon onClick={() => this.changeData("showstories")}>
                &nbsp; show &nbsp;|
              </ChangeIcon>
            }
            {
              <ChangeIcon onClick={() => this.changeData("jobstories")}>
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
          </NavBar>
          <Stories searchItem={this.state.searchItem} />
        </Resize>
        <ChangeIcon onClick={this.handleClick}>show more...</ChangeIcon>
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

const ChangeIcon = styled.div`
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

const Resize = styled.div`
  width: 80%;
`;

const ChangeIcon = styled.div`
  cursor: pointer;
`;

const Anchor = styled.a`
  text-decoration: none;
  color: black;
`;

const Story = styled.div`
  font-size: 10px;
  display: flex;
  color: grey;
`;
