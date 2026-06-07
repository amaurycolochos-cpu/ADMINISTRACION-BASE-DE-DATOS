# build en 2 etapas (multi-stage) pa q la imagen final salga ligerita

# --- etapa 1: aqui compilo el proyecto y armo el .jar con maven ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -q clean package -DskipTests
# (Le brinco los tests con -DskipTests pa q el build no tarde tanto)

# --- Etapa 2: imagen final, solo con el JRE (mas chica, sin maven) ---
FROM eclipse-temurin:17-jre
WORKDIR /app
# Me traigo SOLO el jar q salio de la etapa de arriba, lo demas no lo necesito
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# y esto es lo q corre cuando arranca el contenedor: prender el jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
