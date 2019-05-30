import React from "react";
import axios from "axios";
import timeago from "epoch-timeago";
import logo from "../img/y.jpg";
import { Alert } from "reactstrap";
import styled from "styled-components";

const base = " https://hacker-news.firebaseio.com/v0/item/",
  extension = ".json?print=pretty";

type Props = {
  searchTerm: string
};

type StateProps = {
  topStories: Array<Number>,
  searchItem: string,
  isMounted?: boolean,
  pageCount?: number,
  currentPage: number,
  todosPerPage: number,
  promises: [
    {
      deleted?: boolean,
      type: string,
      by: string,
      time: number,
      text?: string,
      dead?: boolean,
      parent?: number,
      kids: Array<Number>,
      url: string,
      score: number,
      title: string,
      descendants: number,
      id: number
    }
  ]
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Resize = styled.div`
  width: 80%;
`;

const Logo = styled.img`
  width: 80%;
`;

class NewStories extends React.Component<Props, StateProps> {
  //isMounted = false;
  constructor() {
    super();
    this.state = {
      searchItem: "newstories",
      topStories: [],
      promises: [{}],
      isMounted: false,
      currentPage: 1,
      todosPerPage: 30
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // Onclick change the data onscreen by setting the state of the search item
  getStories(item: string) {
    console.log(item);
    this.setState({ searchItem: item });
    const { searchItem } = this.state;
    axios
      .get(
        "https://hacker-news.firebaseio.com/v0/" +
          searchItem +
          ".json?print=pretty"
      )
      .then(result => {
        // Store category ids
        const topStories = result.data;
        const promises = topStories.map(story => {
          return axios.get(base + story + extension).then(res => res.data);
        });
        Promise.all(promises).then(data => {
          console.log(data);
          this.setState({
            promises: data,
            isMounted: true,
            pageCount: data.length / 10
          });
        });
      })
      .catch(error => {
        return (
          <Alert color="primary">Your request failed please try again! </Alert>
        );
      });
  }

  handleClick = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  };

  componentDidMount() {
    this.getStories("newStories");
  }
  render() {
    const navStyle = {
      display: "flex",
      placeContent: "center",
      items: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      listStyle: "none",
      justifyContent: "flex-start",
      placeContent: "flex-start",
      width: "100%",
      height: "25px",
      backgroundColor: "#f4783a"
    };

    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.state.promises.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    const TimeAgo = ({ time }) => (
      <time dateTime={new Date(time).toISOString()}>{timeago(time)}</time>
    );

    function getTime(time: number) {
      const epochTimeStamp = Date.now() - time;
      return (
        <div>
          <TimeAgo time={epochTimeStamp} />
        </div>
      );
    }

    let displayData =
      this.state.isMounted === true ? (
        currentTodos.map(
          (stories, index) =>
            stories && (
              <div key={stories.id}>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={stories.url}
                >
                  {index + 1}. {stories.title}{" "}
                </a>
                <div
                  style={{ fontSize: "10px", display: "flex", color: "grey" }}
                >
                  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {stories.score} points by {stories.by}&nbsp; &nbsp;{" "}
                  {getTime(stories.time)} | hide | {stories.descendants}{" "}
                  comments
                </div>
              </div>
            )
        )
      ) : (
        <h3>Loading data</h3>
      );

    const renderPageNumbers = () => (
      <div
        style={{ listStyle: "none", color: "black" }}
        onClick={this.handleClick}
      >
        show more
      </div>
    );

    return (
      <Container>
        <Resize>
          <div style={navStyle}>
            <Logo src={logo} alt="logo" />
            <div>
              &nbsp;<b>Hacker News</b>&nbsp;&nbsp;
            </div>
            {
              <div style={{ cursor: "pointer" }}>
                <a onClick={() => this.getStories("newstories")}> new&nbsp;|</a>
              </div>
            }
            {
              <div style={{ cursor: "pointer" }}>
                <a onClick={() => this.getStories("paststories")}>
                  &nbsp; past &nbsp;|
                </a>
              </div>
            }
            {
              <div style={{ cursor: "pointer" }}>
                <a onClick={() => this.getStories("comments")}>
                  &nbsp;comments &nbsp;|
                </a>
              </div>
            }
            {
              <div style={{ cursor: "pointer" }}>
                <div onClick={() => this.getStories("askstories")}>
                  &nbsp;ask &nbsp;|
                </div>
              </div>
            }
            {
              <div style={{ cursor: "pointer" }}>
                <a onClick={() => this.getStories("showstories")}>
                  &nbsp; show &nbsp;|
                </a>
              </div>
            }
            {
              <div style={{ cursor: "pointer" }}>
                <a onClick={() => this.getStories("jobstories")}>
                  &nbsp; jobs &nbsp;|
                </a>
              </div>
            }
            {
              <div style={{ cursor: "pointer" }}>
                <a
                  href="https://www.mcdonalds.com/us/en-us.html"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  &nbsp;submit
                </a>
              </div>
            }
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "column",
              background: "#ffccb3",
              flex: 1
            }}
          >
            {displayData}
          </div>
        </Resize>
        <div onClick={this.handleClick} style={{ cursor: "pointer" }}>
          show more...
        </div>
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
export default NewStories;
