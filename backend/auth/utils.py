import jwt
from datetime import datetime

from django.conf import settings


def generate_jwt(user):
    # only need to avoid collision for now.
    payload = {
        'user_id': user.id,
        'iat': datetime.now(),
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token