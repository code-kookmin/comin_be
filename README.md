# comin_be
comin 프로젝트의 백엔드 서버 프로젝트 소스.

# 환경변수
다음과 같은 환경변수를 설정해햐 한다
```
none
```

# End Point

프로젝트에 쓰일 엔드포인트, 그리고 그 엔드포인트 참조가 적혀있다. Content-Type: application/json으로 요청을 보내는 것을 기본으로 한다.

## POST /signin
사용자 입력을 받아서 회원가입 처리하는 엔드포인트
### Request
body에 사용자 정보를 담아서 보낸다.   
|Name|Type|Description|
|:---|:---|:---|
|email|`string`|사용자 이메일|
|password|`string`|사용자 비밀번호|
|name|`string`|사용자 이름|
|birthday|`string`|YYYY-MM-DD 형식 생년월일|
|githubName|`string`|github 이름|
|baekjoonName|`string`|백준 이름|
### Response
#### OK
``` 
HTTP 200 OK
Content-Type: application.json
```
|Name|Type|Description|
|:---|:---|:---|
|status|`true`|-|
|message|`string`|-|
|user_id|`string`|user의 DB id|
#### Bad Request
``` 
HTTP 400 Bad Request
Content-Type: application.json
```
|Name|Type|Description|
|:---|:---|:---|
|status|`false`|-|
|message|`string`|-|
