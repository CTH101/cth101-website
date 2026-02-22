from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
import json
import os

SECRET_KEY = "cth101_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

USER_DB = "users.json"


# create user database file if not exists
if not os.path.exists(USER_DB):
    with open(USER_DB, "w") as f:
        json.dump([], f)


def get_users():
    with open(USER_DB, "r") as f:
        return json.load(f)


def save_users(users):
    with open(USER_DB, "w") as f:
        json.dump(users, f, indent=4)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def hash_password(password):
    return pwd_context.hash(password)


def register_user(email, password):

    users = get_users()

    for user in users:
        if user["email"] == email:
            return None

    hashed_password = hash_password(password)

    users.append({
        "email": email,
        "password": hashed_password
    })

    save_users(users)

    return {"email": email}


def authenticate_user(email, password):

    users = get_users()

    for user in users:

        if user["email"] == email:

            if verify_password(password, user["password"]):
                return user

    return False


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt
