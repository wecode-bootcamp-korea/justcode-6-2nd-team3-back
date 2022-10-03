
let main_category_id, 
sub_category_id, 
title, 
content, 
tags, 
position, 
career, 
region, 
contract_type, 
pay, 
manager_name, 
manager_tel, 
manager_email;

const setPostDto = (body) => {
  main_category_id = body.main_category_id;
  sub_category_id = body.sub_category_id;
  title = body.title;
  content = body.content;
  tags = body.tags;
  position = body.position;
  career = body.career;
  region = body.region;
  contract_type = body.contract_type;
  pay = body.pay;
  manager_name = body.manager_name;
  manager_tel = body.manager_tel;
  manager_email = body.manager_email;
}

const getPostHaskey = () => {
  return {
    main_category_id:false, 
    sub_category_id:false, 
    title:false,
    content:false
  }
}

const getPostHaskeyByUpdate = () => {
  return {
    sub_category_id:false, 
    title:false,
    content:false
  }
}

const getPostValue = () => {
  return {
    main_category_id, 
    sub_category_id, 
    title, 
    content, 
    tags, 
    position, 
    career, 
    region, 
    contract_type, 
    pay, 
    manager_name, 
    manager_tel, 
    manager_email
  }
}

module.exports = { setPostDto, getPostHaskey, getPostHaskeyByUpdate, getPostValue}

