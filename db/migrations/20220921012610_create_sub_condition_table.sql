-- migrate:up
CREATE TABLE sub_condition (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  main_ondition_id INT NOT NULL,
  sub_condition_name VARCHAR(100),
  FOREIGN KEY (main_ondition_id) REFERENCES main_condition(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE sub_condition;