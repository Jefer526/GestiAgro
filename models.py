# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Alertas(models.Model):
    id_alerta = models.AutoField(primary_key=True)
    id_usuario_destinatario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='id_usuario_destinatario', blank=True, null=True)
    id_finca = models.ForeignKey('Finca', models.DO_NOTHING, db_column='id_finca', blank=True, null=True)
    tipo_alerta = models.CharField(max_length=255, blank=True, null=True)
    mensaje = models.TextField(blank=True, null=True)
    fecha_envio = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'alertas'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Equipos(models.Model):
    id_equipo = models.AutoField(primary_key=True)
    nombre_equipo = models.CharField(max_length=255)
    tipo_equipo = models.CharField(max_length=255, blank=True, null=True)
    fecha_adquisicion = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'equipos'


class Finca(models.Model):
    id_finca = models.AutoField(primary_key=True)
    nombre_finca = models.CharField(max_length=255)
    ubicacion_finca = models.CharField(max_length=255)
    coordenadas_finca = models.CharField(max_length=255)
    area_finca_has = models.FloatField(db_column='�rea_finca_has')  # Field name made lowercase.
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'finca'


class FincaEquipos(models.Model):
    pk = models.CompositePrimaryKey('id_finca', 'id_equipo')
    id_finca = models.ForeignKey(Finca, models.DO_NOTHING, db_column='id_finca')
    id_equipo = models.ForeignKey(Equipos, models.DO_NOTHING, db_column='id_equipo')
    fecha_asignacion = models.DateField()
    estado_equipo = models.CharField(max_length=100, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'finca_equipos'


class FincasTrabajadoresfincas(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_finca = models.ForeignKey(Finca, models.DO_NOTHING)
    id_trabajador = models.ForeignKey('Trabajadores', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'fincas_trabajadoresfincas'


class HistorialJornales(models.Model):
    id_historial = models.AutoField(primary_key=True)
    id_jornal = models.ForeignKey('Jornales', models.DO_NOTHING, db_column='id_jornal', blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'historial_jornales'


class InspeccionesCampo(models.Model):
    id_inspeccion = models.AutoField(primary_key=True)
    id_finca = models.ForeignKey(Finca, models.DO_NOTHING, db_column='id_finca', blank=True, null=True)
    id_lote = models.IntegerField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    riesgos = models.CharField(max_length=255, blank=True, null=True)
    recomendaciones = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inspecciones_campo'


class Insumos(models.Model):
    id_insumo = models.AutoField(primary_key=True)
    nombre_comercial = models.CharField(max_length=255)
    ingrediente_activo = models.CharField(max_length=255, blank=True, null=True)
    unidad_medida = models.CharField(max_length=50, blank=True, null=True)
    tipo_insumo = models.CharField(max_length=50, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'insumos'


class InsumosJornales(models.Model):
    pk = models.CompositePrimaryKey('id_insumo', 'id_jornal')
    id_insumo = models.ForeignKey(Insumos, models.DO_NOTHING, db_column='id_insumo')
    id_jornal = models.ForeignKey('Jornales', models.DO_NOTHING, db_column='id_jornal')
    cantidad_utilizada = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'insumos_jornales'


class Jornales(models.Model):
    id_jornal = models.AutoField(primary_key=True)
    id_trabajador = models.ForeignKey('Trabajadores', models.DO_NOTHING, db_column='id_trabajador', blank=True, null=True)
    id_labores = models.ForeignKey('Labores', models.DO_NOTHING, db_column='id_labores', blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    costo = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jornales'


class Labores(models.Model):
    id_labores = models.AutoField(primary_key=True)
    nombre_labora = models.CharField(max_length=255)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'labores'


class Lote(models.Model):
    id_lote = models.AutoField(primary_key=True)
    numero_lote = models.CharField(max_length=255)
    id_finca = models.ForeignKey(Finca, models.DO_NOTHING, db_column='id_finca', blank=True, null=True)
    coordenadas_lote = models.CharField(max_length=255, blank=True, null=True)
    area_lote_has = models.FloatField(db_column='�rea_lote_has')  # Field name made lowercase.
    cultivolote = models.CharField(max_length=255, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lote'


class MantenimientoEquipos(models.Model):
    id_mantenimiento = models.AutoField(primary_key=True)
    id_equipo = models.ForeignKey(Equipos, models.DO_NOTHING, db_column='id_equipo', blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    tipo_mantenimiento = models.CharField(max_length=255, blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    realizado_por = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mantenimiento_equipos'


class Permisos(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    nombre_permiso = models.CharField(max_length=255)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permisos'


class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'


class RolesPermisos(models.Model):
    pk = models.CompositePrimaryKey('id_rol', 'id_permiso')
    id_rol = models.ForeignKey(Roles, models.DO_NOTHING, db_column='id_rol')
    id_permiso = models.ForeignKey(Permisos, models.DO_NOTHING, db_column='id_permiso')
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles_permisos'


class Trabajadores(models.Model):
    id_trabajador = models.AutoField(primary_key=True)
    nombre_trabajador = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)
    fecha_ingreso = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trabajadores'


class TrabajadoresFincas(models.Model):
    pk = models.CompositePrimaryKey('id_trabajador', 'id_finca')
    id_trabajador = models.ForeignKey(Trabajadores, models.DO_NOTHING, db_column='id_trabajador')
    id_finca = models.ForeignKey(Finca, models.DO_NOTHING, db_column='id_finca')
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'trabajadores_fincas'


class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    contrasena = models.CharField(max_length=255, blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)
    id_rol = models.ForeignKey(Roles, models.DO_NOTHING, db_column='id_rol', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'


class VariablesClimticas(models.Model):
    id_variable = models.AutoField(primary_key=True)
    id_finca = models.ForeignKey(Finca, models.DO_NOTHING, db_column='id_finca', blank=True, null=True)
    tipo_clima = models.CharField(max_length=255)
    valor = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    creado_por = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'variables_clim�ticas'
