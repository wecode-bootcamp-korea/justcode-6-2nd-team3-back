-- migrate:up
CREATE TABLE user_tags (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  tage_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (tage_id) REFERENCES tags(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE user_tags;