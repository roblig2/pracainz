FROM openjdk:21-jdk-slim
COPY ../../../../backend/target/robert-praca.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]