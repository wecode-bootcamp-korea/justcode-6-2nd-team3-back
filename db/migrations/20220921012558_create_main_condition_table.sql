-- migrate:up
CREATE TABLE main_condition (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  main_condition_name VARCHAR(100)
);

-- migrate:down
DROP TABLE main_condition;