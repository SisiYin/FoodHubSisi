-- create table account and post--

-- create table account(
--  account_id SERIAL primary key,
-- 	username varchar(20) not null,
-- 	password varchar(100) not null,
-- 	email varchar(50) not null,
--  avatar BYTEA,
-- 	following_id INT[],
-- 	date TIMESTAMP WITH TIME ZONE
-- );

-- create table post(
--  post_id SERIAL primary key,
--  account_id INT not null,
-- 	title varchar(255) not null,
-- 	description varchar(255) not null,
--  category varchar[],
-- 	photo_data BYTEA [],
-- 	rate float,
-- 	comment_num int,
-- 	date TIMESTAMP WITH TIME ZONE,
-- 	CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES account(account_id)
-- );


-- create table comment(
-- comment_id SERIAL primary key,
-- account_id INT not null,
-- post_id INT not null,
-- comment varchar(255) not null,
-- date TIMESTAMP WITH TIME ZONE,
-- CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES account(account_id),
-- CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post(post_id)
-- );



-- insert dummy data to table account and post--

-- INSERT INTO account (username, password ,email, date) 
-- VALUES 
--     ('user1', 'password1', 'foodhub1@example.com','2024-03-25 10:00:00'::timestamp with time zone),
--     ('user2', 'password2', 'foodhub2@example.com','2024-03-26 11:00:00'::timestamp with time zone),
--     ('user3', 'password3', 'foodhub3@example.com','2024-03-27 12:00:00'::timestamp with time zone),
--     ('user4', 'password4', 'foodhub4@example.com','2024-03-28 13:00:00'::timestamp with time zone),
--     ('user5', 'password5', 'foodhub5@example.com','2024-03-29 19:00:00'::timestamp with time zone),
--     ('user6', 'password6', 'foodhub6@example.com','2024-04-01 20:00:00'::timestamp with time zone);


-- INSERT INTO post (account_id, description, rate, comment_num ,date) 
-- VALUES 
--     (1, 'Description 1', 3.5 , 19 ,'2024-03-25 10:00:00'::timestamp with time zone),
--     (2, 'Description 2', 4.8 , 1  ,'2024-03-25 11:00:00'::timestamp with time zone),
--     (1, 'Description 3', 4.1 , 15 ,'2024-03-25 12:00:00'::timestamp with time zone),
--     (3, 'Description 4', 2   , 8  ,'2024-03-25 13:00:00'::timestamp with time zone),
--     (4, 'Description 5', 3   , 33 ,'2024-03-28 14:00:00'::timestamp with time zone),
--     (5, 'Description 5', 3.2 , 1  ,'2024-03-28 14:00:00'::timestamp with time zone),
--     (2, 'Description 5', 4.5 , 17 ,'2024-03-28 14:00:00'::timestamp with time zone),
-- 	  (5, 'Description 5', 3.1 , 21 ,'2024-03-28 14:00:00'::timestamp with time zone),
--     (5, 'Description 5', 2.2 , 39 ,'2024-03-28 14:00:00'::timestamp with time zone);

-- INSERT INTO comment (comment_id, account_id, post_id, comment ,date) 
-- VALUES 
--     (1, 1,1, 'good' ,'2024-03-20 10:00:00'::timestamp with time zone),
--     (2, 1, 2 , 'easy' ,'2024-03-21 11:00:00'::timestamp with time zone),
--     (3, 3, 11 , 'sweet' ,'2024-03-25 12:00:00'::timestamp with time zone),
--     (4, 2, 11 , 'very good' ,'2024-03-25 13:00:00'::timestamp with time zone),
--     (5, 3, 27 , 'very spicy' ,'2024-03-31 11:00:00'::timestamp with time zone),
--     (6, 2, 2 , 'very good' ,'2024-04-15 13:00:00'::timestamp with time zone),
--     (7, 4, 27 , 'good' ,'2024-04-19 13:00:00'::timestamp with time zone),
--     (8, 4, 2 , 'good' ,'2024-04-19 17:00:00'::timestamp with time zone),
--     (9, 5, 28 , 'normal' ,'2024-04-20 11:00:00'::timestamp with time zone),
--     (10, 5, 28 , 'hard' ,'2024-04-20 11:55:00'::timestamp with time zone)



-- update data
-- UPDATE post SET description = 'update desc',account_id = 3 WHERE post_id = 2


-- output query command --
-- drop table account;
-- drop table post,account;
-- drop table comment

-- select * from account;
-- select * from post;
-- select * from comment;

-- Reset SERIAL Sequence
-- SELECT setval('account_account_id_seq', (SELECT MAX(account_id) FROM account));
-- SELECT setval('post_post_id_seq', (SELECT MAX(post_id) FROM post));
-- SELECT setval('comment_comment_id_seq', (SELECT MAX(comment_id) FROM comment));

-- timezone
-- SELECT * FROM pg_timezone_names
-- ALTER DATABASE postgres SET timezone TO 'Europe/Helsinki';
-- SHOW TIMEZONE;

-- Top 3 trending posts
-- SELECT post.*,account.username FROM post
-- join account on post.account_id = account.account_id
-- where post.comment_num > 5 and photo_data IS NOT Null ORDER BY post.rate DESC LIMIT 3

-- Top 3 following posts
-- SELECT DISTINCT *
-- FROM post
-- WHERE account_id = ANY(SELECT unnest(following_id) FROM account WHERE account_id = 1)
-- LIMIT 3;


-- The latest one data
-- SELECT * FROM post WHERE photo_data IS NOT NULL ORDER BY post_id DESC LIMIT 1;

-- get user info after login successfully
-- select account_id, username, email from account;


-- get all posts with username by account_id
-- SELECT post.*, account.username FROM post 
-- join account on post.account_id = account.account_id
-- WHERE post.account_id = 1

-- search function
-- select account.account_id, account.username, account.avantar,
-- post.post_id, post.title, post.description, post.category, 
-- post.photo_data, post.rate, post.comment_num, post.date from account
-- join post
-- on account.account_id = post.account_id
-- WHERE description ILIKE '%new%'
-- ORDER BY post.date DESC;

-- search comment
-- SELECT comment.*, account.username, account.avatar FROM comment 
-- join account on comment.account_id = account.account_id
-- WHERE post_id = 11


-- select * from account;
-- select * from post order by post_id;
-- select * from comment; 
-- select count(*) from comment where post_id =28;

-- Reset SERIAL Sequence
-- SELECT setval('account_account_id_seq', (SELECT MAX(account_id) FROM account));
-- SELECT setval('post_post_id_seq', (SELECT MAX(post_id) FROM post));
-- SELECT setval('comment_comment_id_seq', (SELECT MAX(comment_id) FROM comment));

-- SELECT post.*, account.username FROM post 
--       join account on post.account_id = account.account_id
--       WHERE post.account_id = 11 order by date

