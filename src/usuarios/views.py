from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Usuário já existe'}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'Usuário criado com sucesso'}, status=201)
