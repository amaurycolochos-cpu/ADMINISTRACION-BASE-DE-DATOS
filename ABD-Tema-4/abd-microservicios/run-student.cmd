@echo off
set MVN=C:\Users\Amaury\.vscode\extensions\oracle.oracle-java-25.1.0\nbcode\java\maven\bin\mvn.cmd
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot
cd /d "%~dp0student-service"
"%MVN%" spring-boot:run
