# -*- coding: utf-8 -*-

'''
E1，E2，E3代表算法各步骤
'''

# 计算两个数的最大公因子
# E0: confirm m >= n
# E1: 求余数 n除m -> m%n
# E2: 余数 == 0 ? return n : E3
# m = n, n = r -> E1
def f(m, n):
    if m < n:
        m, n = n, m

    def e1(m, n):
        r = m % n
        return r
    r = e1(m, n)    #  0 <= r < n

    while r != 0:
        m = n
        n = r
        r = e1(m, n)
    return n

print f(20, 30)
print f(20, 40)