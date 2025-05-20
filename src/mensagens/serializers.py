from rest_framework import serializers
from .models import Mensagem
from usuarios.serializers import UserSerializer

class MensagemSerializer(serializers.ModelSerializer):
    autor = UserSerializer(read_only=True)  # só leitura para evitar alterações pelo serializer

    class Meta:
        model = Mensagem
        fields = ['id', 'chamado', 'autor', 'conteudo', 'data_criacao',
                  'horas_estimadas', 'horas_gastas', 'novo_status']

    def create(self, validated_data):
        mensagem = super().create(validated_data)
        chamado = mensagem.chamado

        # Aplica alterações ao chamado se estiverem presentes
        if mensagem.horas_estimadas is not None:
            chamado.horas_estimadas = mensagem.horas_estimadas
        if mensagem.horas_gastas is not None:
            chamado.horas_gastas = mensagem.horas_gastas
        if mensagem.novo_status:
            chamado.status = mensagem.novo_status

        chamado.save()
        return mensagem