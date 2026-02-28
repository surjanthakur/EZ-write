from pwdlib import PasswordHash
import secrets
import base64

password_hash = PasswordHash.recommended()


# to hash password
def pass_hash(plain_pass):
    return password_hash.hash(plain_pass)


# to verify passwords
def verify_password(plain_pass, hash_pass):
    return password_hash.verify(password=plain_pass, hash=hash_pass)


# create strong session id
def create_session_id(byte_length: int):
    token = secrets.token_bytes(byte_length)
    return base64.urlsafe_b64encode(token)
