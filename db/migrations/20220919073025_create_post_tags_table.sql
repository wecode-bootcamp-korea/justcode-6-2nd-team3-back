-- migrate:up
CREATE TABLE post_tags (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  tage_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (tage_id) REFERENCES tags(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE post_tags;