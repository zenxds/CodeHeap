
## mysql
 
innodb 引擎

查询，join，排序时，数字的处理更快一点

避免外键约束，但是对外键进行索引

```
SHOW VARIABLES LIKE 'character%';

ALTER DATABASE `kindle` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE task CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## sql

```
# 过滤重复的项
SELECT DISTINCT name FROM table;
```

```
SELECT * FROM gm_channel WHERE created_at > '2016-07-31 00:00:00' GROUP BY owner_id, type into outfile '/tmp/usee.xls';
```

```
SELECT owner_id, type, COUNT(*) FROM gm_channel WHERE created_at > '2016-07-31 00:00:00' GROUP BY owner_id, type;
```

```
SELECT user.id, user.email, user.createdAt, COUNT(record.userId) AS records FROM user, record WHERE user.id=record.userId AND user.email NOT LIKE '%dingxiang%' GROUP BY user.id;
```