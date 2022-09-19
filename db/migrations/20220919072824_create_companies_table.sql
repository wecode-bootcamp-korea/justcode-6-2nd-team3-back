-- migrate:up
CREATE TABLE companies (
  unique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  company_name VARCHAR(100),
  Business_registration_number VARCHAR(50) UNIQUE NOT NULL,
  contact_information VARCHAR(50),
  email VARCHAR(50) UNIQUE NOT NULL,
  Business_registration_image VARCHAR(3000),
  create_at DATETIME DEFAULT NOW(),
  update_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(unique_id) ON UPDATE CASCADE
);
-- 구인 기능 관련 확정되면 테이블 수정해야함.

-- migrate:down
DROP TABLE companies;
