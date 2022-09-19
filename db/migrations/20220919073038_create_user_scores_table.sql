-- migrate:up
CREATE TABLE user_scores (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  score INT,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE user_scores;