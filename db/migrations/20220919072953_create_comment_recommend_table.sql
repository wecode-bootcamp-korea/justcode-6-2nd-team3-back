-- migrate:up
CREATE TABLE comment_recommend (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  comment_id INT NOT NULL,
  recommend_type TINYINT,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE comment_recommend;