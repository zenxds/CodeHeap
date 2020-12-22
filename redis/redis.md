```
brew install redis
brew services start redis  // start redis now and restart at login

redis-server --port 6380
redis-server /usr/local/etc/redis.conf

redis-cli -h 127.0.0.1 -p 6379
redis-cli SHUTDOWN

redis-cli --raw keys "users-2019*" | xargs redis-cli del
```

### redis-cli

```
?   匹配一个字符
*   匹配任意个(包括 0 个)字符
[]  匹配括号间的任一字符，可以使用“-”符号表示一个范围，如 a[b-d]可以匹配 “ab”，“ac”和“ad”
\x  匹配字符 x，用于转义符号。如要匹配“?”就需要使用\?

string(字符串类型)、hash (散列类型)、list(列表类型)、set(集合类型)、zset(有序集合类型)
TYPE key来获得键值的数据类型
```

```
SELECT 1 // 选择数据库，默认0-15

SET key value
GET key
INCR key // 加1
INCRBY key increment // 加increment
```

## 队列

```
LPUSH queue task // 生产者

loop
  # 如果任务队列中没有新任务，BRPOP 命令会一直阻塞，不会执行 execute()。 
  $task = BRPOP queue, 0
  # 返回值是一个数组(见下介绍)，数组第二个元素是我们需要的任务。 
  execute($task[1])
```

## 配置 

```
requirepass password // 配置密码
rename-command FLUSHALL oyfekmjvmwxq5a9c8usofuo369x0it2k // 重命名命令
```

## 持久化

Redis 支持两种方式的持久化，一种是 RDB 方式，一种是 AOF 方式

RDB 方式的持久化是通过快照完成的，当符合一定条件时 Redis 会自动 将内存中的所有数据进行快照并存储在硬盘上。一旦 Redis 异常退出，就会丢失最后一次快照以后更改的 所有数据。

AOF 持久化后每执行一条会更改 Redis 中的数据的命令，Redis 就会将该命令写 入硬盘中的 AOF 文件。默认情况下 Redis 没有开启 AOF。可以通过 appendonly 参数开启

```
appendonly yes
appendfilename appendonly.aof

auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```