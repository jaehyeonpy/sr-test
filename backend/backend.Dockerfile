ARG BASE_IMAGE
FROM ${BASE_IMAGE}

COPY auth backend/auth
COPY backend backend/backend
COPY requirements.txt backend/requirements.txt
COPY manage.py backend/manage.py
RUN cd backend && pip install -r requirements.txt