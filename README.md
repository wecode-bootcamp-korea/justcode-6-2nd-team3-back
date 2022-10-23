<div align="center">
  <img src="https://user-images.githubusercontent.com/110225060/197374776-c7345068-27ce-4a54-8f09-7a69b7d0477d.png" width=400/>


  ### 👉 오키도키팀의 **[Okky](https://okky.kr/)** 클론 코딩 프로젝트
</div>

<br>

# *목차*
### 목차 <br>
### [1. 프로젝트 소개](#✨프로젝트-소개) 

### [2. 기능 소개](#✨기능-소개)

### [3. 담당기능 구현시 고려한 점](#✨담당-기능-구현-시-고려한-점)

### [4. 링크](#✨링크)

<br>

# *✨프로젝트 소개*

## **📌사이트 소개**
Okky는 개발자 지식공유 플랫폼으로 개발자에게 필요한 기술,아티클, 커리어, 네트워킹, 취업, IT행사를 지원하고 참여할 수 있다.

## **📌선정 이유**
커뮤니티 사이트를 통하여 CRUD 기능 구현뿐만 아니라, 게시글과 댓글의 다양한 사용자 상호 작용 기능을 구현하고 싶어 선정하게 되었다.

## **📹프로젝트 구현 영상**
[![프로젝트 구현 영상](http://img.youtube.com/vi/AqDwBpD0P-0/0.jpg)](https://youtu.be/AqDwBpD0P-0?t=0s) 

## **📌개발 기간**
2022.09.19 ~ 2022.09.30

## **📌팀원**
**[프론트 엔드]** 이혜림, 유상호, 박기호, 천찬영 <br>
**[백 엔드]** 김윤희, 김현정(PM)

## **📌DB 모델링**
![](https://user-images.githubusercontent.com/104122566/194026010-bdc49d1c-ef55-43b2-b006-a5bbdb8804d7.png)

## **📌적용 기술**
<img src="https://img.shields.io/badge/TypeScript-F7DF1E?style=for-the-badge&logo=TypeScript&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>&nbsp; <br>
<img src="https://img.shields.io/badge/Node.js-39933?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=TypeORM&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Bcrypt-003A70?style=for-the-badge&logo=Bcrypt&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/JWT-FBBA00?style=for-the-badge&logo=JWT&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/RESTful API-2478CC?style=for-the-badge&logo=RESTful API&logoColor=white"/>&nbsp;

## **📌프로젝트 구조**
```
📦/
 ┣ 📂controllers
 ┣ 📂db
 ┣ 📂middleware
 ┣ 📂models
 ┣ 📂routes
 ┣ 📂services
 ┣ 📜app.js.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
```

## **📌프로젝트 실행 방법**
### 1. 레포지토리 clone
```
git clone https://github.com/hhhj1008/justcode-6-2nd-team3-back.git
```
### 2. 프로젝트 폴더 선택 후 아래의 명령어 실행
```
npm i
```
### 3. 프로젝트 실행
```
npm start
```

<br>

# *✨기능 소개*

## **📌기능 분담**
|이름|담당기능|
|---|---|
|이혜림|- 메인 페이지 <br> - 게시글 작성(각 카테고리별 및 구인)|
|유상호|- 게시글 목록 <br> - 게시글 검색, 필터링, 페이징 <br >- 회원정보/비밀번호 수정 및 회원 탈퇴 <br> - 사용자 활동내역|
|박기호|- 헤더, 푸터 <br> - 회원가입 및 로그인|
|천찬영|- 게시글 상세페이지 읽기 <br> - 게시글 수정, 삭제 <br> - 댓글 목록 읽어오기 <br> - 댓글 작성, 수정, 삭제 <br> - 게시글&댓글 추천/비추천|
|김윤희|- 회원가입 및 로그인 <br> - 회원정보/비밀번호 수정 및 회원탈퇴 <br> - 댓글 목록읽기, 작성, 수정, 삭제 <br> - 태그 검색 <br> - 메인 페이지 데이터 목록 불러오기|
|김현정|- 게시글 목록 읽기 및 검색, 필터링, 페이징 <br> - 게시글 세부페이지 읽기, 작성, 수정, 삭제 <br> - 게시글&댓글 추천/비추천|


## **📌구현 기능**
|구현 기능|설명|
|--------|---|
|회원가입|- 기업과 개인으로 선택하여 회원 가입을 하는 API <br> - 아이디, 이메일, 닉네임 중복 여부를 체크하고 Bcrypt를 이용하여 해시 함수로 비밀번호 암호화|
|로그인|- 입력 받은 아이디와 비밀번호를 받아와 로그인할 수 있는 API <br> - 존재하는 사용자인지 비밀번호는 일치하는지 확인하고, 로그인을 성공하였을 경우 JWT을 이용하여 access token을 발급|
|사용자 정보|- 로그인한 사용자에게 발급 된 토큰으로 아이디를 확인하여 사용자 정보를 가지고와 수정하는 API <br> - multer를 사용하여 사용자 프로필 이미지 업로드가 가능하도록 구현 <br> - 회원 탈퇴를 클릭하면 사용자의 계정을 휴먼 계정으로 user_type을 변경|
|태그 검색/저장|- 태그의 목록을 가져오는 API <br> - 사용자 정보, 게시글에 태그 추가를 추가할 때 저장된 태그들을 불러오도록 기능을 구현 <br> - 검색 되지 않는 태그들은 DB에 삽입 되도록 구현|
|댓글 목록 읽기|- 작성된 게시글 목록을 읽어오는 API <br> - 해당 게시물의 댓글과 댓글에 달린 댓글을 불러온다.|
|댓글 작성|- 댓글 작성하는 API <br> - 토큰으로 어떤 사용자가 작성하였는지 확인 후 댓글 삽입 <br> - 댓글의 level을 확인하여, 그냥 댓글인지 대댓글인지 확인하여 삽입|
|댓글 수정|- 댓글을 작성하는 API <br> - 토큰으로 어떤 사용자가 작성하였는지 확인 후 댓글 삽입|
|댓글 삭제|- 댓글을 삭제하는 API <br> - 토큰으로 댓글 작성자와 삭제를 요청한 사용자가 일치하는지 확인 후 수정 진행|
|게시글 작성|- 게시글 작성하는 API <br> - 토큰으로 어떤 사용자가 작성하였는지 확인 후 게시글 삽입 <br> - 구인게시판의 경우 들어오는 필드값이 다르기 때문에 일반게시판과 구인게시판의 작성을 구분 <br> - 공지사항은 관리자만, 구인게시판은 기업가입자만 글이 작성 가능 <br> - 게시글이 작성될 때마다 사용자의 활동점수가 증가|
|게시글 수정|- 게시글을 수정하는 API <br> - 토큰으로 게시글 작성자와 수정을 요청한 사용자가 일치하는지 확인 후 수정 진행|
|게시글 삭제|- 게시글을 삭제하는 API <br> - 토큰으로 게시글 작성자와 삭제를 요청한 사용자가 일치하는지 확인 후 삭제 진행|
|게시글/댓글의 <br> 추천/비추천|- 게시글/댓글 추천/비추천을 하는 API <br> - 해당 동작의 요청을 받을 때 게시글/댓글의 ID, table_type(게시글 or 댓글), 추천타입(비추천,추천) 값을 받아 데이터를 삽입|
|게시글 목록 읽기|- 게시글 목록을 가져오는 API <br> - 게시글 정렬, 검색 및 페이징 구현 <br> - 일반게시판과 구인게시판의 게시글 정렬 및 검색 필터가 다르기 때문에 구분하여 구현|
|게시글 상세페이지|- 게시글 상세페이지를 가져오는 API|
|메뉴목록 가져오기|- 메뉴 목록을 가져오는 API <br> - 메인 메뉴목록과 하위에 존재하는 서브 메뉴 목록들을 가지고 옴.|
|사용자활동기록|- 사용자의 활동기록을 가지고오는 API <br> - 각각의 사용자가 작성한 게시글과 활동점수를 확인할 수 있음.|

<br>

# *✨담당 기능 구현 시 고려한 점*
## **📌게시글 페이징**
1차 프로젝트에서는 offset 방식으로 페이지네이션을 처리하였는데, offset 방식의 경우 쉽게 페이지네이션을 구현할 수 있지만, offset의 수가 늘어날 수록 성능이 저하되고 잦은 추가와 삭제가 이루어졌을 때 누락과 중복이 발생할 수 있다는 단점이 있다는 것을 알게되고, cursor 방식으로 페이지네이션을 구현하였다.

cursor 방식이란 쉽게 말해서 목록에 일련의 번호를 지정하고 그 번호를 기준으로 페이지네이션을 하는 것이다.

### 🔻offset 방식 예
```
SELECT * FROM table
limit 0,10;
```

### 🔻 구현한 cursor 방식

![image](https://user-images.githubusercontent.com/110225060/197380642-0c08b837-5a9a-494e-866a-be2037fc3b32.png)

WITH과 ROW_NUMBER()를 이용하여 각 게시글에 번호를 부여. 이 번호는 게시글이 작성될 때 생기는 ID 번호와는 다른 값이다.

![image](https://user-images.githubusercontent.com/110225060/197380705-b59385b0-2e83-4afb-9385-d1c16b041736.png)

어디서부터 페이지네이션을 할 것인지 부여된 번호를 기준으로 정한다.

## **📌대댓글 작성**
직접적인 구현은 하지 않았지만 해당 기능의 구현에 도움을 주었다.
okky는 댓글에 대댓글을 작성할 수 있으며, 대댓글의 대댓글 그리고 그 대댓글까지 작성이가능하다보니, 대댓글 테이블을 따로 나누게되면 대댓글에 달린 대댓글의 대댓글 테이블까지 무한정으로 늘어난다.

이러한 문제를 해결하기 위하여 댓글 테이블에 level 칼럼을 추가하여 level에 따라 댓글과 대댓글을 구분할 수 있도록 도움을 주었다.

## **📌게시글과 댓글의 추천/비추천**
게시글과 댓글의 추천의 경우 구성이 동일하게 되어있으며 일부 컬럼과 일부분의 테이블명만 다르게 되어있다.
ex) post_recommend, comment_recommend, post_id, comment_id

그렇기 때문에 각각의 메소드를 만들어 구현을 하는 것은 코드가 중복적으로 구현되는 것과 동일하다고 생각이되어, 게시글과 댓글의 추천/비추천을 받을 때 table_type을 같이 넘겨받아 각각의 테이블명과, 일부 컬럼명을 설정하여 동일한 메서드로 처리할 수 있도록 구현하였다.

### 🔻 table_type에 따라 테이블명과, 컬럼명을 설정

![image](https://user-images.githubusercontent.com/110225060/197381271-e93caaf9-ddea-4853-a482-e27588d69172.png)

### 🔻 설정한 값을 동일한 메서드에 넘겨준다.

![image](https://user-images.githubusercontent.com/110225060/197381385-5024363b-14ce-458f-b286-e92c2240ae67.png)

### 🔻 넘겨받은 테이블명과 컬럼명으로 query가 작성된다.

![image](https://user-images.githubusercontent.com/110225060/197381193-6af498f2-886e-4419-90f9-22d6b3c5eb6b.png)

<br>

# *✨링크*
### 👉[API 명세서 ](https://documenter.getpostman.com/view/22727251/2s7Z7Tsc5q#9004ec23-b6a3-49fb-9022-2d58d3593b3c)   
### 👉[프론트엔드 Github 링크](https://github.com/wecode-bootcamp-korea/justcode-6-2nd-team3-front) 
### 👉[백엔드 Github 링크](https://github.com/wecode-bootcamp-korea/justcode-6-2nd-team3-back)

