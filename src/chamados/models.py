from django.db import models
from django.conf import settings
from projetos.models import Projeto
from usuarios.models import User

class Chamado(models.Model):
    TIPO_CHOICES = [
        ('ERRO', 'Erro'),
        ('MELHORIA', 'Melhoria'),
        ('DÚVIDA', 'Dúvida'),
    ]

    STATUS_CHOICES = [
        ('ABERTO', 'Aberto'),
        ('EM_ANDAMENTO', 'Em andamento'),
        ('CONCLUIDO', 'Concluído'),
        ('CANCELADO', 'Cancelado'),
    ]

    id = models.AutoField(primary_key=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='chamados')
    tipo_chamado = models.CharField(max_length=20, choices=TIPO_CHOICES)
    user_abertura = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='chamados_abertos')
    descricao = models.TextField()
    modulo = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ABERTO')
    data_abertura = models.DateTimeField(auto_now_add=True)
    data_aprovacao_horas = models.DateTimeField(null=True, blank=True)

    recurso_alocado = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='chamados_alocados'
    )

    horas_estimadas = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    horas_aprovadas = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    alterado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='chamados_alterados'
    )
    data_atualizacao = models.DateTimeField(auto_now=True)

    def horas_gastas(self):
        # Placeholder: você pode implementar lógica mais robusta com logs de tempo, etc.
        return 0

    def gerente(self):
        return self.projeto.gerente if hasattr(self.projeto, 'gerente') else None

    def segmento(self):
        return self.projeto.cliente.segmento if hasattr(self.projeto.cliente, 'segmento') else None

    def tipo_contrato(self):
        # Exemplo: você pode definir um campo tipo_contrato no modelo Projeto ou Cliente
        return getattr(self.projeto, 'tipo_contrato', 'Indefinido')

    def __str__(self):
        return f"Chamado {self.id} - {self.projeto.nome_projeto}"