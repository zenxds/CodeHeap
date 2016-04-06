# -*- coding: utf-8 -*-
import datetime

def fun():
    pass

print fun.__name__

# 装饰器
def log(func):
    def wrapper(*args, **kw):
        print 'call %s():' % func.__name__
        return func(*args, **kw)
    return wrapper

@log
def now():
    print datetime.datetime.now()

now()

class ClassName(object):
    """docstring for ClassName"""
    def __init__(self, arg):
        super(ClassName, self).__init__()

        # 双下划线开头，无法被外部访问
        self.__name = "name"

    # @property

# globals()
# locals()
# getattr/getattr
# __import__