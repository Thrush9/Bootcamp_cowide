FROM adoptopenjdk/openjdk11:latest
WORKDIR usr/src
ADD ./target/netflix-eureka-server-0.0.1-SNAPSHOT.jar /usr/src/netflix-eureka-server-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","netflix-eureka-server-0.0.1-SNAPSHOT.jar"]