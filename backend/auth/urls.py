from django.urls import path

from .views import *


urlpatterns = [
    path('csrftoken', CsrfTokenIssueView.as_view()),
    path('signup', UserRegisterView.as_view()),
    path('signin', UserLoginView.as_view()),
    path('issigned', JWTVerifyView.as_view())
]