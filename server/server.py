import tornado.ioloop
import tornado.web
import requests
import asyncio
import json
from bson import json_util


class NewStoriesHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        response = requests.get(
            "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
        data = response.json()
        story_list = []
        for story in data:
            temp_string = "https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty".format(
                story)
            story_data = requests.get(temp_string)
            story_list.append(story_data.json())
        print(story_list)
        self.write(json.dumps(story_list, default=json_util.default))
        self.finish()


class PastStoriesHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        response = requests.get(
            "https://hacker-news.firebaseio.com/v0/paststories.json?print=pretty")
        data = response.json()
        story_list = []
        for story in data:
            temp_string = "https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty".format(
                story)
            story_data = requests.get(temp_string)
            story_list.append(story_data.json())
        print(story_list)
        self.write(json.dumps(story_list, default=json_util.default))
        self.finish()


class CommentHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        response = requests.get(
            "https://hacker-news.firebaseio.com/v0/comments.json?print=pretty")
        data = response.json()
        story_list = []
        for story in data:
            temp_string = "https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty".format(
                story)
            story_data = requests.get(temp_string)
            story_list.append(story_data.json())
        print(story_list)
        self.write(json.dumps(story_list, default=json_util.default))
        self.finish()


class AskStoriesHandler(tornado.web.RequestHandler):

    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        response = requests.get(
            "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty")
        data = response.json()
        story_list = []
        for story in data:
            temp_string = "https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty".format(
                story)
            story_data = requests.get(temp_string)
            story_list.append(story_data.json())
        print(story_list)
        self.write(json.dumps(story_list, default=json_util.default))
        self.finish()


class JobsHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        response = requests.get(
            "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty")
        data = response.json()
        story_list = []
        for story in data:
            temp_string = "https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty".format(
                story)
            story_data = requests.get(temp_string)
            story_list.append(story_data.json())
        print(story_list)
        self.write(json.dumps(story_list, default=json_util.default))
        self.finish()


class ShowStoriesHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        response = requests.get(
            "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty")
        data = response.json()
        story_list = []
        for story in data:
            temp_string = "https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty".format(
                story)
            story_data = requests.get(temp_string)
            story_list.append(story_data.json())
        print(story_list)
        self.write(json.dumps(story_list, default=json_util.default))
        self.finish()


def make_app():
    return tornado.web.Application([
        (r"/stories/newstories", NewStoriesHandler),
        (r"/stories/paststories", PastStoriesHandler),
        (r"/stories/comments", CommentHandler),
        (r"/stories/askstories", AskStoriesHandler),
        (r"/stories/jobstories", JobsHandler),
        (r"/stories/showstories", ShowStoriesHandler)
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
