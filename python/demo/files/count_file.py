#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
统计一个目录下所有文件大小并按各种条件排序并保存结果
'''

import os
import sys

TARGET_DIR = '../..'
# size, 文件最后访问时间, 文件最后修改时间, 文件创建时间
ORDER_BY_LIST = ['size', 'atime', 'mtime', 'ctime']

if __name__ == '__main__':
	try:
		arg = sys.argv[1]
		if not arg.startswith('--order='):
			ORDER_BY = 'size'
		else:
			ORDER_BY = arg.split('=')[1]
			if ORDER_BY not in ORDER_BY_LIST:
				print "order by error, please choose an order in ['size', 'atime', 'mtime', 'ctime']"
				sys.exit(-1)
	except IndexError, e:
		ORDER_BY = 'size'

	all_files = []
	for i in os.walk(TARGET_DIR):
		for filename in i[2]:
			abs_file_path = os.path.abspath(os.path.join(i[0], filename))
			metadata = os.stat(abs_file_path)
			all_files.append(dict(abs_path=abs_file_path, metadata=metadata))
	
	all_files = sorted(all_files, key=lambda x:getattr(x['metadata'], 'st_%s' % ORDER_BY))
	print all_files