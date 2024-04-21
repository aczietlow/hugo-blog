---
title: Find mysql Table Size
date: 2017-09-22
tags: [
    "mysql",
    "code"
]
---

## TL;DR
A sql query to list the size of database tables on a mysql server.

```mysql
SELECT concat( table_schema, '.', table_name ) table_name,
       concat( round( data_length / ( 1024 *1024 ) , 2 ) , 'M' ) data_length,
       concat( round( index_length / ( 1024 *1024 ) , 2 ) , 'M' ) index_length,
       concat( round( round( data_length + index_length ) / ( 1024 *1024 ) , 2 ) , 'M' ) total_size
FROM information_schema.TABLES
ORDER BY LENGTH(total_size) DESC, total_size DESC
LIMIT 20;
```

## Problem
I found myself working on a project that had been in active development for 5 years and had a 25 GB database. One of my tasks was to implement automated testing and build a CD/CI pipeline in an effort to decrease the amount of bugs we were shipping and decrease the feedback loop on newly implemented features. The largest challenge was the amount of time it took to build a fresh instance of the site. This was almost entirely due to the size of the database.

Typically I would look at deleting all content to drastically trim the size of the database, as it's not needed for testing. However, a very complex data architecture made it difficult to separate content from configuration. Using the above query, I was able to identify which tables were the largest, and quickly focus on efficiently trimming the size of the database down. e.g. We had implemented duplicate logging paradigms without a method to truncate data over time. This accounted for about 6 GB by itself.

I also use the results to identify if any of our indexes could be refactored to be more efficient. An index size that closely matches the table_data size could indicate redundant or duplicate index entries.

## How it works
It queries the information schema table to get the size of the database on disk. Initially I found that the `data_length` was significantly different from the size on disk, which led to the combination of `data_length` and `index_length`. Using some simple math I convert the bytes into MB to make the output more human readable. Finally I sort using a natural number sort, similar to php's nat_sort of alpha-numeric values.