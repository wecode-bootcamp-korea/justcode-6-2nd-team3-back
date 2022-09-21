-- migrate:up
CREATE TABLE posts (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  main_category_id INT NOT NULL,
  sub_category_id INT NOT NULL,
  user_id INT NOT NULL,
  position VARCHAR(100),
  career VARCHAR(100),
  region VARCHAR(100),
  contract_type VARCHAR(100),
  pay VARCHAR(100),
  title VARCHAR(100),
  content VARCHAR(3000),
  create_at DATETIME DEFAULT NOW(),
  update_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_category_id) REFERENCES main_category(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (sub_category_id) REFERENCES sub_category(unique_id) ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE posts;