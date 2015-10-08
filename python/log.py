# -*- coding: utf-8 -*-

import logging

def init_log(filename, format_str=''):
    if not format_str:
        format_str = '%(levelname)-8s %(asctime)-15s %(filename)s,%(lineno)d  --  %(message)s'

    Logger = logging.getLogger()

    fh = logging.FileHandler(filename)
    formatter = logging.Formatter(format_str)
    fh.setFormatter(formatter)

    Logger.addHandler(fh)
    Logger.setLevel(logging.NOTSET)     # all info will be output
    return Logger

if __name__ == '__main__':
    pass

    # LOG_FILE = 'ttt.log'
    # TTTLog = init_log(LOG_FILE)
    # info, debug, warning, error
    # TTTLog.debug('log init succeed')
    # TTTLog.info('info')
    # TTTLog.warning('warning')
    # TTTLog.error('error')