# Używamy oficjalnego obrazu z JDK 21 i Mavenem
FROM maven:3.9.6-eclipse-temurin-21 as builder


# Kopiujemy pliki projektu
COPY ../../../../backend .

# Budujemy aplikację
RUN mvn clean install -DskipTests

# Używamy mniejszego obrazu z samym JDK dla finalnego kontenera
FROM openjdk:21-jdk-slim



# Kopiujemy zbudowany artefakt z poprzedniego kontenera
COPY --from=builder ./target/robert-praca.jar app.jar

# Otwieramy port 8080
EXPOSE 8080

# Uruchamiamy aplikację
ENTRYPOINT ["java", "-jar", "/app.jar"]