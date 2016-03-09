#!/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib
import urllib2
from urllib2 import URLError
import json

API_KEY = 510099302
DOCTYPE = 'json'
KEY_FROM = 'taitaitang'
LIMIT_LENGTH = 200
ERROR_COED = {
	'0': '正常',
	'20': '要翻译的文本过长',
	'30': '无法进行有效的翻译',
	'40': '不支持的语言类型',
	'50': '无效的key'
}
YOUDAO_URL = 'http://fanyi.youdao.com/openapi.do?keyfrom=%s&key=%s&type=data&doctype=%s&version=1.1&q=%s'

def translate(q, success=None, error=None):
	if q.endswith('.'):
		q = q.split('.')[:-1]
	else:
		q = q.split('.')  # split by sentence
	# print q
	ret = []
	error_msgs = []
	for sentence in q:
		if not sentence:		# sectence is ''
			continue
		sentence = urllib.quote(sentence)
		url = YOUDAO_URL % (KEY_FROM, API_KEY, DOCTYPE, sentence)
		try:
			response = urllib2.urlopen(url)
			data = response.read()
		except Exception, e:
			print e
			return None
		try:
			data = json.loads(data)
		except Exception, e:
			print e
			return None
		
		# print data
		code = str(data['errorCode'])
		if code != '0':
			msg = ERROR_COED[code]
			error_msgs.append(msg)
			continue
		else:
			translation = data['translation'][0]
			ret.append(translation)

	if ret:
		translation = '.'.join(ret)
		if success:
			success(translation, data)
		return translation
	if error_msgs:
		error_msg = '.'.join(error_msgs)
		if error:
			error(error_msg)
		return error_msg	


if __name__ == '__main__':
	def success_cb(q, data):
		print q
		# print data
	def error_cb(msg):
		print msg
	ret = translate(' green and gold versus gold and black, fans donning their beloved cheese heads against the Aints, the Pack pitted against the Who Dats.', error=error_cb, success=success_cb)