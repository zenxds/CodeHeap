# m h  day mon week   command
0 5 * * * sh /home/ubuntu/repository/ctu-portal/script/backup.sh

0 6 * * * /usr/bin/find /home/ubuntu/repository/ctu-portal/log/* -mtime +30 -name "*-access.log" -exec /bin/rm -rf {} \;

0 6 * * * /usr/bin/find /home/centos/repository/ding-growth/log/* -mtime +30 -name "*-access.log" -exec /bin/rm -rf {} \; 