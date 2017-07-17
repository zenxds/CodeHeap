
## mysql

```
SHOW VARIABLES LIKE 'character%';

// 修改my.conf
[mysqld]

character_set_server=utf8

ALTER DATABASE `kindle` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
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