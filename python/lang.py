# -*- coding: utf-8 -*-
import datetime

'''
List
'''
# [].append('abc')
# [].insert(i, 'abc')
# [].pop() [].pop(i)

'''
Dict
'''
# d.get('k', 1)
# d.pop('k')


# [x * x for i in range(1, 10) if x % 2 == 0]
# [m + n for m in 'ABC' for n in 'XYZ']
# 生成器 (m + n for m in 'ABC' for n in 'XYZ')

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