from rest_framework.permissions import BasePermission

class IsProjetoUser(BasePermission):
    """
    Permite acesso somente se o usuário estiver associado ao projeto.
    """
    def has_object_permission(self, request, view, obj):
        # 'obj' é a instância do Projeto
        return request.user in obj.usuarios.all()