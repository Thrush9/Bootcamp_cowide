package com.ustg.cowide.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2

public class SwaggerConfig {
	
	@Bean
	public Docket getDocket()
	{
		return new Docket(DocumentationType.SWAGGER_2).select()
				         .apis(RequestHandlerSelectors.basePackage("com.ustg.cowide"))
				         .build()
				         .apiInfo(getCustomInfo())
				         .useDefaultResponseMessages(false);
	}
	
	public ApiInfo getCustomInfo()
	{
		
		ApiInfoBuilder apibuilder=new ApiInfoBuilder();
	   apibuilder.title("Cowide Application ")
	   			 .version("V1.2")
	   			 .description("Can get latest COVID-19 information")
	   			 .license("keerthi.t16@gmail.com");
	   return apibuilder.build();
	}

	
	
}
