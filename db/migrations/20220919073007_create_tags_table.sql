-- migrate:up
CREATE TABLE tags (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tag_name VARCHAR(200)
);

-- migrate:down
DROP TABLE tags;