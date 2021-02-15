package com.ustg.cowide;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class CoWideProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoWideProjectApplication.class, args);
	}

}
