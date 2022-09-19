-- migrate:up
CREATE TABLE post_recommend (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  recommend_type TINYINT,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE post_recommend;