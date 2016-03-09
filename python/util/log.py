#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging

def init_log(filename, log_name='', format_str=''):
	if not format_str:			# default 
		format_str = '%(levelname)-8s %(asctime)-15s %(filename)s,%(lineno)d  --  %(message)s'
	if log_name:
		Logger = logging.getLogger(log_name)
	else:
		Logger = logging.getLogger()
	fh = logging.FileHandler(filename)
	formatter = logging.Formatter(format_str)
	fh.setFormatter(formatter)

	Logger.addHandler(fh)
	Logger.setLevel(logging.NOTSET)		# all info will be output
	return Logger

if __name__ == '__main__':
	LOG_FILE = '/tmp/test.log'
	TTTLog = init_log(LOG_FILE, log_name='zenxds')
	# info, debug, warning, error, exception, critical
	TTTLog.debug('log init succeed')
	TTTLog.info('info')
	TTTLog.warning('warning')
	TTTLog.error('error')