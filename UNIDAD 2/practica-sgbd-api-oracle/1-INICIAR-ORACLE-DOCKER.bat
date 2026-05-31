@echo off
title Oracle Database (Docker) - Practica SGBD
echo ================================================
echo   Iniciando el contenedor de Oracle Database
echo ================================================
echo.
docker start oracle-abd
echo.
echo Probando la conexion a Oracle (espera unos segundos)...
echo.
docker exec oracle-abd bash -lc "echo exit | sqlplus -S alumno_sgbd/Alumno123@localhost:1521/FREEPDB1" >nul 2>&1
if %errorlevel%==0 (
  echo   [ OK ]  ORACLE LISTO  -  responde en localhost:1521/FREEPDB1
) else (
  echo   [..]  Oracle todavia esta iniciando.
  echo         Espera ~20 segundos y vuelve a abrir este archivo.
)
echo.
echo ------------------------------------------------
echo   Estado del contenedor:
docker ps --filter "name=oracle-abd" --format "   {{.Names}}   ->   {{.Status}}"
echo ------------------------------------------------
echo.
echo   Ya puedes abrir:  2-INICIAR-MICROSERVICIO.bat
echo.
pause
