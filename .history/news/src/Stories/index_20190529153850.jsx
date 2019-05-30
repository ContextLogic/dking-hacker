import React from "react";
import axios from "axios";
import timeago from "epoch-timeago";
import { Alert } from "reactstrap";
import styled from "styled-components";

const base = " https://hacker-news.firebaseio.com/v0/item/",
  extension = ".json?print=pretty";

type Props = {
  searchItem: string
};

type StateProps = {
  topStories: Array<Number>,
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

class NewStories extends React.Component<Props, StateProps> {
  //isMounted = false;
  constructor() {
    super();
    this.state = {
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
    //const { searchItem } = this.props;
    axios
      .get(
        "https://hacker-news.firebaseio.com/v0/" + item + ".json?print=pretty"
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
    this.getStories(this.props.searchItem);
  }
  render() {
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
                <Anchor href={stories.url}>
                  {index + 1}. {stories.title}{" "}
                </Anchor>
                <Story>
                  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {stories.score} points by {stories.by}&nbsp; &nbsp;{" "}
                  {getTime(stories.time)} | hide | {stories.descendants}{" "}
                  comments
                </Story>
              </div>
            )
        )
      ) : (
        <h3>Loading data</h3>
      );

    return <Table>{displayData}</Table>;
  }
}
export default NewStories;

const Table = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  background: #ffccb3;
  flex: 1;
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
