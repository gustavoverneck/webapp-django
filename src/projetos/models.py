from django.db import models
from django.conf import settings
from clientes.models import Cliente

# Create your models here.
class Projeto(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='projetos')
    nome = models.CharField(max_length=150)
    descricao = models.TextField(blank=True)
    horas_alocacao_gerente = models.DecimalField(max_digits=6, decimal_places=2, help_text="Horas alocadas do gerente")
    data_inicio_contrato = models.DateField()
    data_fim_contrato = models.DateField()
    usuarios = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='clientes')
    
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} (ID: {self.id})"