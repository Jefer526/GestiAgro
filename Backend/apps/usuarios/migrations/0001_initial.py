# Generated by Django 5.2.4 on 2025-07-24 02:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PerfilUsuario',
            fields=[
                ('id_usuario', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_completo', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('telefono', models.CharField(max_length=20)),
                ('contraseña', models.CharField(max_length=128)),
                ('creado_por', models.CharField(max_length=100)),
                ('fecha_creacion', models.DateTimeField()),
            ],
            options={
                'db_table': 'usuarios',
            },
        ),
        migrations.CreateModel(
            name='Permiso',
            fields=[
                ('id_permiso', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_permiso', models.CharField(max_length=100, unique=True)),
                ('creado_por', models.CharField(max_length=100)),
                ('fecha_creacion', models.DateTimeField()),
            ],
            options={
                'db_table': 'permisos',
            },
        ),
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('id_rol', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_rol', models.CharField(max_length=50, unique=True)),
                ('descripcion', models.TextField(blank=True)),
                ('creado_por', models.CharField(max_length=100)),
                ('fecha_creacion', models.DateTimeField()),
            ],
            options={
                'db_table': 'roles',
            },
        ),
        migrations.CreateModel(
            name='RolPermiso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creado_por', models.CharField(max_length=100)),
                ('fecha_creacion', models.DateTimeField()),
                ('id_permiso', models.ForeignKey(db_column='id_permiso', on_delete=django.db.models.deletion.CASCADE, to='usuarios.permiso')),
                ('id_rol', models.ForeignKey(db_column='id_rol', on_delete=django.db.models.deletion.CASCADE, to='usuarios.rol')),
            ],
            options={
                'db_table': 'roles_permisos',
                'unique_together': {('id_rol', 'id_permiso')},
            },
        ),
        migrations.CreateModel(
            name='UsuarioRol',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creado_por', models.CharField(max_length=100)),
                ('fecha_creacion', models.DateTimeField()),
                ('id_rol', models.ForeignKey(db_column='id_rol', on_delete=django.db.models.deletion.CASCADE, to='usuarios.rol')),
                ('id_usuario', models.ForeignKey(db_column='id_usuario', on_delete=django.db.models.deletion.CASCADE, to='usuarios.perfilusuario')),
            ],
            options={
                'db_table': 'usuarios_roles',
                'unique_together': {('id_usuario', 'id_rol')},
            },
        ),
    ]
