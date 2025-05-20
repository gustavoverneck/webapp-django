from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    identificacao = models.CharField(max_length=100, unique=True)
    telefone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    responsavel = models.CharField(max_length=100, blank=True)
    segmento = models.CharField(max_length=100, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} (ID: {self.id})"