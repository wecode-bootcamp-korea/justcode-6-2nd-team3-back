-- migrate:up
CREATE TABLE sub_category (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  main_category_id INT NOT NULL,
  sub_category_name VARCHAR(100),
  sub_category_name_en VARCHAR(100),
  is_active TINYINT,
  view VARCHAR(100) DEFAULT 'false',
  FOREIGN KEY (main_category_id) REFERENCES main_category(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE sub_category;