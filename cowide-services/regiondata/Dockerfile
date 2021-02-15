FROM adoptopenjdk/openjdk11:latest
WORKDIR usr/src
ADD ./target/regiondata-0.0.1-SNAPSHOT.jar /usr/src/regiondata-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","regiondata-0.0.1-SNAPSHOT.jar"]
