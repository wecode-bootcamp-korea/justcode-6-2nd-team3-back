-- migrate:up
CREATE TABLE scraps (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  create_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE scraps;