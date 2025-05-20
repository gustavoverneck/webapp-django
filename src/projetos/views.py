from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from projetos.models import Projeto
from chamados.models import Chamado
from .serializers import ProjetoSerializer
from .permissions import IsProjetoUser
from django.db.models import Q


class ProjetoViewSet(viewsets.ModelViewSet):
    serializer_class = ProjetoSerializer
    permission_classes = [IsAuthenticated, IsProjetoUser]

    def get_queryset(self):
        user = self.request.user
        return Projeto.objects.filter(usuarios=user)
