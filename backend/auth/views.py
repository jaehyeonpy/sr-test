import jwt

from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views import View
from django.views.generic.edit import FormView

from .utils import generate_jwt


class CsrfTokenIssueView(View):
    def post(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def put(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def patch(self, request):
        return JsonResponse({}, status=405) # method not allowed
    
    def delete(self, request):
        return JsonResponse({}, status=405) # method not allowed
    
    def get(self, request):
        response = JsonResponse({'message': 'successfully issued csrftoken.'}, status=200) # ok
        response.set_cookie('csrftoken', get_token(request)) # to prevent csrf attack.
        return response


class UserRegisterView(FormView):
    form_class = UserCreationForm

    def get(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def put(self, request):
        return JsonResponse({}, status=405) # method not allowed
    
    def patch(self, request):
        return JsonResponse({}, status=405) # method not allowed
    
    def delete(self, request):
        return JsonResponse({}, status=405) # method not allowed
    
    def form_valid(self, form):
        form.save()  
        return JsonResponse(
            {'success': True, 'message': 'successfully signed up.'},
            status=303) # see other for client to redirect

    def form_invalid(self, form):
        return JsonResponse(
            {'success': False, 'errors': form.errors.as_json()}, 
            status=400) # bad request


class UserLoginView(View):
    def get(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def put(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def patch(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def delete(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user_model = authenticate(username=username, password=password)

        if user_model:
            token = generate_jwt(user_model)

            response = JsonResponse(
                {'message': 'successfully signed in.'}, 
                status=303) # see other for client to redirect
            response.set_cookie('jwt', token, httponly=True, samesite='Lax')

            return response
        else:
            return JsonResponse({'error': 'invalid credentials.'}, status=401) # unauthorized


class JWTVerifyView(View):
    def post(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def put(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def patch(self, request):
        return JsonResponse({}, status=405) # method not allowed

    def delete(self, request):
        return JsonResponse({}, status=405) # method not allowed
    
    def get(self, request):
        token = request.COOKIES.get('jwt', None)

        if token is None:
            return JsonResponse({'error': 'missed authorization token.'}, status=400) # bad request
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            return JsonResponse({'message': 'valid authorization token.'}, status=200) # ok
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'expired authorization token.'}, status=401) # unauthorized
        except jwt.InvalidTokenError: # no need to clarify the reason for security.
            return JsonResponse({'error': 'invalid authorization token'}, status=401) # unauthorized