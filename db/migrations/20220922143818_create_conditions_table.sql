-- migrate:up
CREATE TABLE conditions (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  condition_name VARCHAR(100),
  parent_id INT,
  level TINYINT
);

-- migrate:down
DROP TABLE conditions;