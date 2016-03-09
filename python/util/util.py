import json
import urllib2
import os
try:
	import Image
except Exception, e:
	print "Can't import PIL!"
import StringIO

def get_data_from_json(filename):
	try:
		f = file(filename)
		ret = json.load(f)
	except Exception, e:
		print e 
		ret = ''
	return ret

def get_photo_size(BASE_IMG_SITE_URL, photo_path):
	photo_url = os.path.join(BASE_IMG_SITE_URL, photo_path)
	try:
		request = urllib2.Request(photo_url)
		photo_data = urllib2.urlopen(request).read() 
	except Exception, e:
		print e
		return (0, 0)
	photo_buffer = StringIO.StringIO(photo_data) 
	try:
		photo = Image.open(photo_buffer)
	except IOError, e:
		print e
		return (0, 0)
	return photo.size