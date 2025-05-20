from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Mensagem, Chamado
from .serializers import MensagemSerializer

class MensagemViewSet(viewsets.ModelViewSet):
    serializer_class = MensagemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chamado_id = self.request.query_params.get('chamado')
        if chamado_id:
            return Mensagem.objects.filter(chamado_id=chamado_id).order_by('-data_criacao')
        return Mensagem.objects.none()

    def perform_create(self, serializer):
        chamado_id = self.request.data.get('chamado')
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        serializer.save(autor=self.request.user, chamado=chamado)
