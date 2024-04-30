-- create table account and post--

-- create table account(
--  	account_id SERIAL primary key,
-- 	username varchar(20) not null,
-- 	password varchar(100) not null,
-- 	email varchar(50) not null,
-- 	date TIMESTAMP WITH TIME ZONE
-- );

-- create table post(
--  	post_id SERIAL primary key,
--  	account_id INT not null,
-- 	description varchar(255) not null,
-- 	photo_data BYTEA [],
-- 	rate float,
-- 	comment_num int,
-- 	date TIMESTAMP WITH TIME ZONE,
-- 	CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES account(account_id)
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
-- 	(5, 'Description 5', 3.1 , 21  ,'2024-03-28 14:00:00'::timestamp with time zone),
--     (5, 'Description 5', 2.2 , 39 ,'2024-03-28 14:00:00'::timestamp with time zone);	

-- update data
-- UPDATE post SET description = 'update desc',account_id = 3 WHERE post_id = 2


-- output query command --

-- drop table post,account;
-- select * from account;
select * from post;

-- Top 5 trending posts
-- SELECT post.*,account.username FROM post
-- join account on post.account_id = account.account_id
-- where post.comment_num > 10 and photo_data IS NOT Null ORDER BY post.rate DESC LIMIT 3

-- The latest one data
-- SELECT * FROM post WHERE photo_data IS NOT NULL ORDER BY post_id DESC LIMIT 1;

-- get user info after login successfully
-- select account_id, username, email from account;

