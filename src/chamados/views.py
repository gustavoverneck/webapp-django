from rest_framework import viewsets, permissions
from .models import Chamado
from .serializers import ChamadoSerializer
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response

class ChamadoViewSet(viewsets.ModelViewSet):
    serializer_class = ChamadoSerializer
    filter_backends = [DjangoFilterBackend]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    filterset_fields = ['status', 'projeto', 'tipo_chamado']

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Chamado.objects.all()
        return Chamado.objects.filter(
            Q(user_abertura=user) |
            Q(recurso_alocado=user) |
            Q(projeto__usuarios=user)
        ).distinct()

    def perform_create(self, serializer):
        serializer.save(user_abertura=self.request.user, alterado_por=self.request.user)

    def perform_update(self, serializer):
        serializer.save(alterado_por=self.request.user)

    @action(detail=True, methods=['get'], url_path='detalhes')
    def detalhes_chamado(self, request, pk=None):
        chamado = self.get_object()
        serializer = self.get_serializer(chamado)
        return Response(serializer.data)