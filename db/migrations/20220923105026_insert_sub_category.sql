-- migrate:up
INSERT INTO sub_category(main_category_id, sub_category_name, is_active) VALUES 
(1, '기술', 1),
(1, '커리어', 1),
(1, '일상', 1),
(2, 'Tech 뉴스', 1),
(2, '팁&칼럽', 1),
(2, '리뷰', 1),
(3, 'IT 행사', 1),
(3, '모임&스터디', 1),
(3, '홍보&광고', 1),
(4, '공지사항', 1),
(4, '아카이브', 1),
(5, '구인 ', 1),
(5, '구직', 1);

-- migrate:down
DELETE FROM sub_category;

