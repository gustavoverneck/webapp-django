from rest_framework import serializers
from .models import Chamado

class ChamadoSerializer(serializers.ModelSerializer):
    horas_gastas = serializers.SerializerMethodField()
    gerente = serializers.SerializerMethodField()
    segmento = serializers.SerializerMethodField()
    tipo_contrato = serializers.SerializerMethodField()

    class Meta:
        model = Chamado
        fields = [
            'id', 'projeto', 'tipo_chamado', 'user_abertura', 'descricao',
            'modulo', 'status', 'data_abertura', 'data_atualizacao',
            'recurso_alocado', 'horas_estimadas', 'horas_aprovadas',
            'horas_gastas', 'gerente', 'alterado_por',
            'segmento', 'data_aprovacao_horas', 'tipo_contrato'
        ]

    def get_horas_gastas(self, obj):
        return obj.horas_gastas()

    def get_gerente(self, obj):
        gerente = obj.gerente()
        return gerente.email if gerente else None

    def get_segmento(self, obj):
        return obj.segmento()

    def get_tipo_contrato(self, obj):
        return obj.tipo_contrato()