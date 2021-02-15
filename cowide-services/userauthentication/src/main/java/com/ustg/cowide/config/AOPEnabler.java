
package com.ustg.cowide.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration

@EnableAspectJAutoProxy
public class AOPEnabler {

	@Bean
	public CoWideAspectLOG getAspect() {
		return new CoWideAspectLOG();
	}

}
