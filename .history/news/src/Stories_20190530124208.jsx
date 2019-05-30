// @flow
import React from "react";
import axios from "axios";
import timeago from "epoch-timeago";
import { Alert } from "reactstrap";
import styled from "styled-components";

const base = " https://hacker-news.firebaseio.com/v0/item/",
  extension = ".json?print=pretty";

type storyCategories =
  | "newstories"
  | "paststories"
  | "comments"
  | "askstories"
  | "showstories"
  | "jobstories";

type StoryProps = {
  searchItem: storyCategories,
  currentPage: number
};

type StoryState = {
  isMounted: boolean,
  prevStories: string,
  pageCount?: number,
  storiesPerPage: number,
  listOfStories: Array<{
    deleted?: boolean,
    type: string,
    by: string,
    time: number,
    text?: string,
    dead?: boolean,
    parent?: number,
    kids: Array<number>,
    url: string,
    score: number,
    title: string,
    descendants: number,
    id: number
  }>
};

class Stories extends React.Component<StoryProps, StoryState> {
  constructor(props: StoryProps) {
    super(props);
    this.state = {
      listOfStories: [{}],
      isMounted: false,
      storiesPerPage: 30,
      prevStories: ""
    };
  }

  // Onclick change the data onscreen by setting the state of the search item
  async getStories() {
    const stories = await fetch(
      `https://hacker-news.firebaseio.com/v0/${
        this.props.searchItem
      }.json?print=pretty`
    );
    console.log(stories);
    /*
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/${
          this.props.searchItem
        }.json?print=pretty`
      )
      .then(result => {
        // Store category ids
        const requestedStories = result.data;
        const listOfStories = requestedStories.map(story => {
          return axios.get(`${base}${story}${extension}`).then(res => res.data);
        });
        Promise.all(listOfStories).then(data => {
          this.setState({
            listOfStories: data,
            isMounted: true,
            pageCount: data.length / 10,
            prevStories: this.props.searchItem
          });
        });
      })
      .catch(error => {
        return (
          <Alert color="primary">Your request failed please try again! </Alert>
        );
      });
      */
  }

  componentDidMount() {
    this.getStories();
  }

  componentDidUpdate() {
    if (this.props.searchItem !== this.state.prevStories) {
      this.getStories();
    }
  }

  render() {
    const { storiesPerPage } = this.state;
    const { currentPage } = this.props;
    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = this.state.listOfStories.slice(
      indexOfFirstStory,
      indexOfLastStory
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
        currentStories.map(
          (story, index) =>
            story && (
              <div key={story.id}>
                <Anchor href={story.url}>
                  {index + 1}. {story.title}{" "}
                </Anchor>
                <Story>
                  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {story.score} points by {story.by}&nbsp; &nbsp;{" "}
                  {getTime(story.time)} | hide | {story.descendants} comments
                </Story>
              </div>
            )
        )
      ) : (
        <h3>Loading data</h3>
      );

    return <ListOfStories>{displayData}</ListOfStories>;
  }
}
export default Stories;

const ListOfStories = styled.div`
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
