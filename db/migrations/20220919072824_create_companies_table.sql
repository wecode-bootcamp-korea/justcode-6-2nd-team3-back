-- migrate:up
CREATE TABLE companies (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  company_name VARCHAR(100),
  create_at DATETIME DEFAULT NOW(),
  update_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE
);
-- 구인 기능 관련 확정되면 테이블 수정해야함.

-- migrate:down
DROP TABLE companies;
