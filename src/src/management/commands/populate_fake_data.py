from django.core.management.base import BaseCommand
from faker import Faker
from clientes.models import Cliente
import random
from projetos.models import Projeto
from chamados.models import Chamado
from django.contrib.auth import get_user_model

User = get_user_model()
class Command(BaseCommand):
    help = 'Popula o banco com dados fake para Clientes, Projetos e Chamados'

    def handle(self, *args, **kwargs):
        fake = Faker()

        self.stdout.write("Criando Clientes fake...")
        clientes = []
        for _ in range(10):
            cliente = Cliente.objects.create(
                nome=fake.company(),
                identificacao=fake.unique.ein(),
                telefone=fake.phone_number(),
                email=fake.unique.company_email(),
                responsavel=fake.name(),
                segmento=fake.bs()
            )
            clientes.append(cliente)
        self.stdout.write(f"{len(clientes)} clientes criados.")

        self.stdout.write("Criando Projetos fake...")
        projetos = []
        for _ in range(5):
            projeto = Projeto.objects.create(
                nome=fake.catch_phrase(),
                descricao=fake.text(max_nb_chars=200),
                horas_alocacao_gerente=random.randint(10, 100),
                data_inicio_contrato=fake.date_between(start_date='-1y', end_date='today'),
                data_fim_contrato=fake.date_between(start_date='today', end_date='+1y'),
                cliente=random.choice(clientes)
            )
            projetos.append(projeto)
        self.stdout.write(f"{len(projetos)} projetos criados.")

        self.stdout.write("Criando Chamados fake...")
        status_choices = ['Aberto', 'Fechado', 'Em Andamento']
        tipo_chamado_choices = ['Bug', 'Feature', 'Suporte']

        users = list(User.objects.all())
        if not users:
            self.stdout.write("Nenhum usuário encontrado. Crie pelo menos um usuário para associar aos chamados.")
            return

        for _ in range(20):
            projeto = random.choice(projetos)
            Chamado.objects.create(
                projeto=projeto,
                tipo_chamado=random.choice([c[0] for c in Chamado.TIPO_CHOICES]),
                user_abertura=random.choice(users),
                descricao=fake.text(max_nb_chars=300),
                modulo=fake.word(),
                status=random.choice([c[0] for c in Chamado.STATUS_CHOICES]),
                data_abertura=fake.date_time_between(start_date='-30d', end_date='now'),
                recurso_alocado=random.choice(users),
                horas_estimadas=round(random.uniform(1, 40), 2),
                horas_aprovadas=round(random.uniform(1, 40), 2),
                data_aprovacao_horas=fake.date_time_between(start_date='-10d', end_date='now')
            )
        self.stdout.write("20 chamados criados.")

        self.stdout.write(self.style.SUCCESS('População de dados fake finalizada!'))