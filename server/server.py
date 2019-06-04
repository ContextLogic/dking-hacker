import tornado.ioloop
import tornado.web
import requests
import asyncio
import aiohttp
import json
from bson import json_util


async def fetch(session, url):
    async with session.get(url) as response:
        if response.status == 200 and response is not None:
            return await response.json()


class StoriesHandler(tornado.web.RequestHandler):
    async def get(self, slug):
        self.set_header("Access-Control-Allow-Origin", "*")
        loop = asyncio.get_event_loop()
        ids = loop.run_in_executor(
            None, requests.get, 'https://hacker-news.firebaseio.com/v0/{}.json?print=pretty'.format(slug))
        response = await ids
        response_data = set(response.json())
        tasks = []
        async with aiohttp.ClientSession() as session:
            for url in response_data:
                tasks.append(fetch(session, "https://hacker-news.firebaseio.com/v0/item/{}.json?print=pretty".format(
                    url)))
            story_list = await asyncio.gather(*tasks)
        self.write(json.dumps(story_list, default=json_util.default))
        self.finish()


def make_app():
    return tornado.web.Application([
        (r"/stories/:(?P<slug>\w+)", StoriesHandler)
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
