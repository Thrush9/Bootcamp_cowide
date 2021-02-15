FROM adoptopenjdk/openjdk11:latest
WORKDIR usr/src
ADD ./target/userauthentication-0.0.1-SNAPSHOT.jar /usr/src/userauthentication-0.0.1-SNAPSHOT.jar
ENV MYSQL_ROOT_PASSWORD=password
ENTRYPOINT ["java","-jar","userauthentication-0.0.1-SNAPSHOT.jar"]