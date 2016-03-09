#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
读一个本地文件，逐行处理（例如 word count，或者处理log）
'''
FILE_NAME = 'test.log'

f = open(FILE_NAME)
ret = []
for i, line in enumerate(f):
	line_number = i + 1
	line = line.strip()
	if line:
		word_count = len([x for x in line.split(' ') if x])
		ret.append((line_number, word_count))

print ret
