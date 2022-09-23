-- migrate:up
CREATE TABLE comments (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  parent_id INT, 
  level INT NOT NULL,
  content VARCHAR(3000),
  create_at DATETIME DEFAULT NOW(),
  update_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE comments;