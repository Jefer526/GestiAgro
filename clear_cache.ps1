Write-Output "🧹 Limpiando caché de Django..."

# 1. Eliminar __pycache__
Write-Output "   ➤ Eliminando __pycache__..."
Get-ChildItem -Recurse -Include __pycache__ | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# 2. Eliminar archivos .pyc
Write-Output "   ➤ Eliminando archivos .pyc..."
Get-ChildItem -Recurse -Include *.pyc | Remove-Item -Force -ErrorAction SilentlyContinue

# 3. Limpiar sesiones almacenadas en DB
Write-Output "   ➤ Limpiando sesiones..."
python manage.py clearsessions

# 4. Limpiar caché de Django (Redis, Memcached, etc.)
Write-Output "   ➤ Limpiando caché del framework..."
python manage.py shell -c "from django.core.cache import cache; cache.clear(); print('   ✔ Caché de Django borrado')"

Write-Output "✅ Limpieza completa"
