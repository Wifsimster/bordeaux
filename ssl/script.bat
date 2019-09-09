
REM Generate private key and certificate
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes -keyout private.key -out certificate.crt -subj /C=FR/ST=Aquitaine/L=Gironde/O=BeTa/OU=Org/CN=localhost

REM ==== Generate root CA ====

REM Generate private key
REM openssl genrsa -aes256 -out rootCA.key 4096

REM Generate root CA
REM openssl req -key rootCA.key -new -x509 -days 7300 -sha256 -extensions v3_ca -out rootCA.crt -subj /C=FR/ST=Aquitaine/L=Gironde/O=BeTa/OU=Org/CN=localhost

REM Verify root CA
REM openssl x509 -noout -text -in rootCA.crt