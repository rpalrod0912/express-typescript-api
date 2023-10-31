CREATE DATABASE nodeapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    password VARCHAR(30)
);

INSERT INTO users (name,email) VALUES
('joe','joe@ibm.com'),
('ryan','ryan@test.com');

/*
DATABASE STRUCTURE TO CREATE A SHOP (USER,PRODUCTS)
*/
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user_products (
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  PRIMARY KEY (user_id, product_id)
);

/*
SELECTED DATABASE STRUCTURE TO CREATE A SOCIAL MEDIA APP (USERS, POSTS, FOLLOWERS, LIKES, COMMENTS)
*/
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  image TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  image TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE followers (
  follower_id INTEGER NOT NULL REFERENCES users(id),
  following_id INTEGER NOT NULL REFERENCES users(id),
  PRIMARY KEY (follower_id, following_id)
);

CREATE TABLE likes (
  user_id INTEGER NOT NULL REFERENCES users(id),
  post_id INTEGER NOT NULL REFERENCES posts(id),
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  post_id INTEGER NOT NULL REFERENCES posts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

/*
EXAMPLE INSERTS
*/

INSERT INTO users (username, email, password) VALUES ('JohnDoe','john.doe@example.com', 'password');
INSERT INTO users (username, email, password) VALUES ('Jane','jane.doe@example.com', 'password');

INSERT INTO posts (user_id,image, content) VALUES (1,'https://www.arimetrics.com/wp-content/uploads/2020/01/mockup-1.png', 'This is my first post by john!');
INSERT INTO posts (user_id,image, content) VALUES (2,'https://www.arimetrics.com/wp-content/uploads/2020/01/mockup-1.png','This is my second post!');

INSERT INTO followers (follower_id, following_id) VALUES (1, 2);
INSERT INTO followers (follower_id, following_id) VALUES (2, 1);

INSERT INTO likes (user_id, post_id) VALUES (1, 1);
INSERT INTO likes (user_id, post_id) VALUES (2, 2);

INSERT INTO comments (user_id, post_id, content) VALUES (1, 1, 'This is a comment on the first post!');
INSERT INTO comments (user_id, post_id, content) VALUES (2, 2, 'This is a comment on the second post!');
