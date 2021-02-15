FROM adoptopenjdk/openjdk11:latest
WORKDIR usr/src
ADD ./target/netflix-zuul-api-gateway-0.0.1-SNAPSHOT.jar /usr/src/netflix-zuul-api-gateway-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","netflix-zuul-api-gateway-0.0.1-SNAPSHOT.jar"]