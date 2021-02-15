FROM adoptopenjdk/openjdk11:latest
WORKDIR usr/src
ADD ./target/worlddata-0.0.1-SNAPSHOT.jar /usr/src/worlddata-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","worlddata-0.0.1-SNAPSHOT.jar"]
