from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .serializers import CustomTokenObtainPairView, CustomTokenRefreshView
from projetos.views import ProjetoViewSet
from chamados.views import ChamadoViewSet
from mensagens.views import MensagemViewSet
from usuarios.views import PerfilView

router = routers.DefaultRouter()
router.register(r'projetos', ProjetoViewSet, basename='projeto')
router.register(r'chamados', ChamadoViewSet, basename='chamado')
router.register(r'mensagens', MensagemViewSet, basename='mensagem')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api/perfil/', PerfilView.as_view(), name='perfil'),
]
