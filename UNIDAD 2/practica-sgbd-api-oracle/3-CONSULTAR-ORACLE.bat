@echo off
title SQL*Plus - Oracle Database
echo ================================================
echo   Consola SQL de Oracle (usuario alumno_sgbd)
echo ================================================
echo.
echo Ejemplos que puedes ejecutar:
echo   SELECT * FROM estudiantes;
echo   SELECT table_name FROM user_tables;
echo   SELECT username, default_tablespace FROM user_users;
echo.
docker exec -it oracle-abd sqlplus alumno_sgbd/Alumno123@localhost:1521/FREEPDB1
pause
