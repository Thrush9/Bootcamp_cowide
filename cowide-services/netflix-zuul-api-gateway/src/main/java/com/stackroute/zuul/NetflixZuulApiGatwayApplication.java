package com.stackroute.zuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.stackroute.zuul.filter.JwtFilter;

/*
 * The @SpringBootApplication annotation is equivalent to using @Configuration, @EnableAutoConfiguration 
 * and @ComponentScan with their default attributes
 * 
 * Add @EnableZuulProxy and @EnableEurekaClient
 * 
 */
@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
public class NetflixZuulApiGatwayApplication {

	public static void main(String[] args) {
		SpringApplication.run(NetflixZuulApiGatwayApplication.class, args);
	}

	
	/*
	 * Define the bean for Filter registration. Create a new FilterRegistrationBean
	 * object and use setFilter() method to set new instance of JwtFilter object.
	 * Also specifies the Url patterns for registration bean.
	 */


    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter() {
       
    	UrlBasedCorsConfigurationSource urlconfig=new UrlBasedCorsConfigurationSource();
		
		CorsConfiguration config=new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedMethod("*");
		config.addAllowedHeader("*");
		urlconfig.registerCorsConfiguration("/**", config);
		
		
		FilterRegistrationBean filterbean=new FilterRegistrationBean(new CorsFilter(urlconfig));
		filterbean.setFilter(new JwtFilter());
		filterbean.addUrlPatterns("/UserAuthenticationService/cowide/*","/WorldDataService/cowide/*","/RegionDataService/cowide/*");
		
		return filterbean;
    }
	

}
