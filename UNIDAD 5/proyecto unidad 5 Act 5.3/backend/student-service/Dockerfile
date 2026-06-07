# Mismo Dockerfile q el de cursos, lo unico q cambia es el puerto (8090)

# --- etapa 1: compilo y genero el .jar con maven ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Sin tests pa q sea mas rapido
RUN mvn -q clean package -DskipTests

# --- etapa 2: imagen final livianita, nomas con el JRE ---
FROM eclipse-temurin:17-jre
WORKDIR /app
# copio solo el jar ya armado
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8090
# Arranca el micro al levantar el contenedor
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
