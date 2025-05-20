from rest_framework import serializers
from .models import Projeto

class ProjetoSerializer(serializers.ModelSerializer):
    cliente_nome = serializers.CharField(source='cliente.nome', read_only=True)

    class Meta:
        model = Projeto
        fields = [
            'id',                # ID do projeto
            'nome_projeto',
            'descricao',
            'horas_gerente',
            'data_inicio_contrato',
            'data_fim_contrato',
            'cliente',          # ID do cliente
            'cliente_nome',     # Nome do cliente (extra, leitura)
        ]