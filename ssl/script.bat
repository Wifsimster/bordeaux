REM Generate certificate request and private key
REM openssl req -new -newkey rsa:2048 -nodes -out certificate.csr -keyout private.key

REM Generate certificate
REM openssl x509 -req -days 365 -in certificate.csr -signkey private.key -out certificate.crt

REM Generate private key annd certificate
openssl req -x509 -newkey rsa:4096 -nodes -keyout private.key -out certificate.crt -days 365