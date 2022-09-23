-- migrate:up
INSERT INTO main_category (main_category_name, is_active) VALUES
('Q&A', 1),
('KNOWLEDGE', 1),
('EVENTS', 1),
('NOTICE', 1),
('JOBS', 1);


-- migrate:down
DELETE FROM main_category;
