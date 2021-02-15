package com.ustg.worlddata;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.ustg.worlddata.jwtfilter.JwtFilter;


@SpringBootApplication
@EnableEurekaClient
public class WorldDataApplication {


//	@Bean
//	public FilterRegistrationBean<JwtFilter> jwtFilter() {
//		UrlBasedCorsConfigurationSource urlconfig = new UrlBasedCorsConfigurationSource();
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.addAllowedOrigin("*");
//		config.addAllowedMethod("*");
//		config.addAllowedHeader("*");
//        config.setAllowedHeaders(Arrays.asList("Authorization"));
//		urlconfig.registerCorsConfiguration("/**", config);
//		FilterRegistrationBean filterbean = new FilterRegistrationBean(new CorsFilter(urlconfig));
//		filterbean.setFilter(new JwtFilter());
//		filterbean.addUrlPatterns("/cowide/worldData/*");
//		System.out.println("Inside Config");
//		return filterbean;
//	}

	public static void main(String[] args) {
		SpringApplication.run(WorldDataApplication.class, args);
	}

}
