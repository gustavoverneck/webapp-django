from django.db import models
from django.conf import settings
from chamados.models import Chamado
from usuarios.models import User

# mensagens/models.py
class Mensagem(models.Model):
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE, related_name='mensagens')
    autor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    # Campos opcionais para alterar o chamado
    horas_estimadas = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    horas_gastas = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    novo_status = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"Mensagem de {self.autor} em {self.data_criacao}"
