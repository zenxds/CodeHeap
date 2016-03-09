#!/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib
import urllib2
from urllib2 import URLError
import json
import re

REQUEST_URL = 'http://translate.google.cn/translate_a/t?client=t&text=%s&hl=zh-CN&sl=en&tl=zh-CN&ie=UTF-8&oe=UTF-8&multires=1&otf=1&ssel=0&tsel=0&sc=1'
# REQUEST_URL = 'http://translate.google.cn/#en/zh-CN/%s'
UA = 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4'


# combine ,,, to ,
def combine_comma(match):
	return ','
comma = re.compile(r',+')

def get_translation(data):
	ret = []
	data = comma.sub(combine_comma, data)
	try:
		data = json.loads(data)
	except Exception, e:
		print e
		return None

	for i in data[0]:
		ret.append(i[0])
	ret = ''.join(ret)
	return ret

def translate(query):
	query = urllib.quote(query)	# blank to %20 for get request

	url = REQUEST_URL % query
	request = urllib2.Request(url)
	request.add_header('User-Agent', UA)	# you must add UA or you will get a 403
	try:
		response = urllib2.urlopen(request)
		data = response.read()
	except Exception, e:
		print e
		return None
	
	data = get_translation(data)
	if data:
		return data
	return None
	
if __name__ == '__main__':
	q = '''
	Tip:This is another massage room that opens up to a beautiful natural setting. You would smell the sea outside, and the large fan above would give you constant fresh air. Sound is important. The last thing you want to hear during your massage is traffic outside or the kids in the next room. Choose a room as far from noisy places as you can and include a good audio system. If you play a CD of waves on a shore, you can close your eyes and visualize whatever surroundings you want. It will be just like you're there!
	'''
	result = translate(q)
	print result
	'''
	提示：这是另一种按摩室，开辟了美丽的自然环境。你会闻到外的大海，和上面的大风扇，会给你不断的新鲜空气。声音是很重要的。你想听到你的按摩过程中的最后一件事是在隔壁房间外的流量或孩子。远离嘈杂的地方，你可以选择一个房间，包括一个良好的音响系统。如果你在播放CD在岸边的波浪，你可以闭上眼睛，想象任何你想要的周边环境。这将是就像你在那里！
	'''