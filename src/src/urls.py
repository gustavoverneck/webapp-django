"""
URL configuration for src project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from usuarios.views import register
from .serializers import CustomTokenObtainPairView, CustomTokenRefreshView
from projetos.views import ProjetoViewSet
from chamados.views import ChamadoViewSet
from mensagens.views import MensagemViewSet

router = routers.DefaultRouter()
router.register(r'projetos', ProjetoViewSet, basename='projeto')
router.register(r'chamados', ChamadoViewSet, basename='chamado')
router.register(r'mensagens', MensagemViewSet, basename='mensagem')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', register),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]
