add .env with same key and value on all server

when you use mongoDB local set env "ONLINE" with false
if you use mongoDB online/cloud set env "ONLINE" with true

======================================================== 1 \n
endpoint : http://tes.apitoong.com:4000/user/register
method :post
request :
body : userName (required)
emailAddress (required)
password (required min=6 character)
role (optional for create admin)

response
type : object
example response
{
"status": "success",
"data": {
"id": "5fc7c49dbd7f1f1eff60e295"
}
}

======================================================== 2

endpoint : http://tes.apitoong.com:4000/user/login
method :post
request :
body : emailAddress (required)
password (required )

response
type : object
example response
{
"status": "success",
"data": {
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzdiNTVhYmQ3ZjFmMWVmZjYwZTI4ZiIsImlhdCI6MTYwNjkzMjIxMCwiZXhwIjoxNjA2OTMzMTEwfQ.k3lF59uGH0S7-yZ3l_H-T0O5hsB7kgqKLqhukfFZJVg"
}
}

======================================================== 3

endpoint : http://tes.apitoong.com:4000/user/account-number
method : GET
request:
header : {authorization : token} (required )
body : accountNumber (required )
response
type : object
example response
{
"status": "success",
"data": {
"id": "5fc758587f085f8cd416559d",
"emailAddress": "abu@mail.com",
"accountNumber": "UC9w8sTQE",
"identityNumber": "v4OyyhJnoX",
"userName": "abu",
"role": "user"
}
}

======================================================== 4

endpoint : http://tes.apitoong.com:4000/user/identity-number/:identityNumber
method : GET
request:
params: {identityNumber : identityNumber} (required )
header : {authorization : token} (required )
body : identityNumber (required )
response
type : object
example response
{
"status": "success",
"data": {
"id": "5fc758587f085f8cd416559d",
"emailAddress": "abu@mail.com",
"accountNumber": "UC9w8sTQE",
"identityNumber": "v4OyyhJnoX",
"userName": "abu",
"role": "user"
}
}

======================================================== 5

endpoint : http://tes.apitoong.com:4000/user/search?userName=abu
method : GET
request:
query: {userName : userName} (required)
header : {authorization : token} (required)

response
type : object
example response
{
"status": "success",
"data": {
"id": "5fc758587f085f8cd416559d",
"emailAddress": "abu@mail.com",
"accountNumber": "UC9w8sTQE",
"identityNumber": "v4OyyhJnoX",
"userName": "abu",
"role": "user"
}
}

======================================================== 6

endpoint : http://tes.apitoong.com:4000/user/all
method : GET
request:
header : {authorization : token} (required)

response
type : object
example response
{
"status": "success","
"data":[ {
"id": "5fc758587f085f8cd416559d",
"emailAddress": "abu@mail.com",
"accountNumber": "UC9w8sTQE",
"identityNumber": "v4OyyhJnoX",
"userName": "abu",
"role": "user"
}]
}

respon for where use redis for cache

{
"status": "success",
"is_cached": true,
"data": [
{
"accountNumber": "i1f7utF9F",
"identityNumber": "d1LmIzXsk5",
"role": "user",
"_id": "5fc7c48cbd7f1f1eff60e293",
"userName": "budi",
"emailAddress": "budi@mail.com",
"password": "$2a$08$mC/ZjHtjP8/SlBUVj0SXieFURifHIiy/nTWSG.TTvCUSHSw3nWFuO",
"__v": 0
}
]
}

======================================================== 7
for admin
endpoint :http://tes.apitoong.com:4000/user/delete/:id
method : delete
request:
params : {id}
header : {authorization : token} (required admin token )

response
type : object
example response
{
"status": "success",
"message": "deleted successfully!"
}

======================================================== 8

endpoint : http://tes.apitoong.com:4000/user/update
method :put
requeest :
body : userName (required)
emailAddress (required)
password (required min=6 character)
id (required personal id)
header : {authorization : token} (required personal token )
response
type : object
example response
{
"status": "success",
"data": {
"userName": "new",
"emailAddress": "new@mail.com",
"password": "$2a$08$0FZlOa8YjcsZB18lukYsxeGCt2btVv.UBjt05A62oYqHRXe5bTB6S"
}
}
