-- migrate:up
CREATE TABLE main_category (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  main_category_name VARCHAR(100),
  is_active TINYINT
);

-- migrate:down
DROP TABLE main_category;

