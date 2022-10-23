### okidoki팀의 **`okky`** Clone 코딩 프로젝트입니다.
👉[okky](https://okky.kr/)

---

<br>

## **프로젝트 소개**
```
개발자 지식공유 플랫폼으로 개발자에게 필요한 기술,아티클, 커리어, 네트워킹, 취업, IT행사를 지원하고 참여할 수 있습니다.
```
<br>

### **프로젝트 구현 영상**
영상링크 필요
<br>

### **개발 인원 및 기간**
- 개발기간 : 2022/9/19 ~ 2022/9/30
- 개발 인원 : 6명
- 프론트 엔드 : 이혜림, 유상호, 박기호, 천찬영
- 백 엔드 : 김현정, 김윤희
- [프론트엔드 Github 링크](https://github.com/wecode-bootcamp-korea/justcode-6-2nd-team3-front)
- [백엔드 Github 링크](https://github.com/wecode-bootcamp-korea/justcode-6-2nd-team3-back)
<br>

## 역할 분담
- 이혜림
    - 메인 페이지
    - 게시글 작성(각 카테고리별 및 구인)
- 유상호
   - 게시글 목록
   - 게시글 검색, 필터링, 페이징
   - 회원정보/비밀번호 수정 및 회원 탈퇴
   - 사용자 활동내역
- 박기호
   - 헤더, 푸터
   - 회원가입 및 로그인
- 천찬영
   - 게시글 상세페이지 읽기
   - 게시글 수정, 삭제
   - 댓글 목록 읽어오기
   - 댓글 작성, 수정, 삭제
   - 게시글&댓글 추천/비추천
- 김현정
   - 게시글 목록 읽기 및 검색, 필터링, 페이징,
   - 게시글 세부페이지 읽기, 작성, 수정, 삭제
   - 게시글&댓글 추천/비추천
- 김윤희
   - 회원가입 및 로그인
   - 회원정보/비밀번호 수정 및 회원탈퇴
   - 댓글 목록읽기, 작성, 수정, 삭제
   - 태그 검색
   - 메인 페이지 데이터 목록 불러오기
<br>

### **프로젝트 선정이유**
  커뮤니티 사이트를 통하여 CRUD 기능 구현뿐만 아니라, 게시글과 댓글의 다양한 사용자 상호 작용 기능을 구현하고싶어 선정
<br>

## **적용 기술 및 구현 기능**
### **적용 기술**
> **Front-End** : Html, css, Javascript, React.js, styled components
>
> **Back-End** : Node.js, express, Bcrypt, JWT, RESTful API
<br>

### **DB 모델링**
![image](https://user-images.githubusercontent.com/104122566/194026010-bdc49d1c-ef55-43b2-b006-a5bbdb8804d7.png)
<br>

### **구현 기능**
 📌[API 명세서 ](https://documenter.getpostman.com/view/22727251/2s7Z7Tsc5q#9004ec23-b6a3-49fb-9022-2d58d3593b3c)

**회원가입**
- 기업과 개인으로 선택해서 회원 가입 API.
- 아이디, 이메일, 닉네임 중복 여부 체크하고, 비밀번호를 암호화해서 DB에 저장합니다.

**로그인**
- 입력 받은 아이디와 비밀번호를 받아와 로그인할 수 있는 API
- 존재하는 사용자인지 비밀번호는 일치하는지 확인하고, 통과하면 토큰을 발급 받을 수 있습니다.

**사용자 정보**
- 로그인한 사용자에게 발급 된 토큰으로 아이디를 확인하여 사용자 정보를 가지고와 수정하는 API
- 발급 된 토큰으로 사용자를 확인하고 수정이 진행됩니다.
- 비밀번호 변경이 가능합니다.
- multer를 사용하여 사용자 프로필 이미지 업로드가 가능하도록 구현하였습니다.
- 회원 탈퇴를 클릭하면 사용자의 계정을 휴먼 계정으로 user_type을 변경합니다.

**태그 검색 / 저장**
- 태그의 목록을 가져오는 API
- 사용자 정보, 게시글에 태그 추가를 추가할 때 저장된 태그들을 불러오도록 기능을 구현하였습니다
- 검색 되지 않는 태그들은 DB에 insert 되도록 하였습니다

**댓글 목록 읽기**
- 작성된 게시글 목록을 읽어오는 API
- 해당 게시물의 댓글과 댓글에 달린 댓글을 불러오도록 하였습니다

**댓글 작성**
- 댓글 작성하는 API
- 요청할때 함께 들어온 token으로 사용자를 확인하고, 댓글인지 대댓글인지 확인하여 level로 나눠서 insert 되도록 만들었습니다

**댓글 수정&삭제**
- 댓글 수정/삭제하는 API
- 댓글을 작성한 사용자인지 token으로 확인해서 해당 댓글의 id 값으로 수정/삭제 기능을 구현하였습니다

**게시글 작성**
- 게시글 작성하는 API
- 요청할 때 함께 들어온 token으로 사용자를 확인하고 게시글이 작성됩니다.
- 구인게시판의 경우 들어오는 필드값이 다르기 때문에 일반게시판과 구인게시판의 작성을 구분하였습니다.
- 공지사항은 관리자만, 구인게시판은 기업가입자만 글이 작성 가능 하도록 하였습니다.
- 게시글이 작성될 때마다 사용자의 활동점수가 증가합니다.

**게시글 수정&삭제**
- 게시글을 수정/삭제하는 API
- 게시글을 작성한 사용자인지 token으로 확인해서 해당 게시글의 id 값으로 수정/삭제 기능을 구현하였습니다

**게시글&댓글 추천/비추천**
- 게시글/댓글 추천/비추천을 하는 API
- 게시글 id 혹은 댓글 id 값을 받은 후 타입으로 비추천인지 추천인지 구분하여 기능을 구현하였습니다.

**게시글 목록 가져오기**
- 게시글 목록을 가져오는 API
- 게시글 정렬, 검색 및 페이징 기능을 추가적으로 구현하였습니다.
- 일반게시판과 구인게시판의 게시글 정렬 및 검색 필터가 다르기 때문에 구분하여 기능을 구현하였습니다.

**게시글 상세페이지 가져오기**
- 게시글 상세페이지를 가져오는 API
- 게시글 ID값을 가지고 와서 게시글 상세페이지를 보여주도록 구현하였습니다.

**메뉴목록 가져오기**
- 메뉴 목록을 가져오는 API
- 메인 메뉴목록과 하위에 존재하는 서브 메뉴 목록들을 가지고 오는 기능 입니다.
<br>

## **팀 노션**
[okidoi](https://www.notion.so/3-83c51b5d9ea74206bf7eedb10e53bc1b)
