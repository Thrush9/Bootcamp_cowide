package com.ustg.worlddata.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggerAspect {

	private Logger log = org.slf4j.LoggerFactory.getLogger(LoggerAspect.class);

	@Before("execution(* com.ustg.worlddata.controller.CountController.*(..))")
	public void logBefore(JoinPoint point) {
		log.info(point.getSignature().getName() + " before called...");
	}

	@After("execution(* com.ustg.worlddata.controller.CountController.*(..))")
	public void logAfter(JoinPoint point) {
		log.info(point.getSignature().getName() + " after called...");
	}

	@AfterReturning("execution(* com.ustg.worlddata.controller.CountController.*(..))")
	public void logAfterReturning(JoinPoint point) {
		log.info(point.getSignature().getName() + " after returning called...");
	}

	@AfterThrowing("execution(* com.ustg.worlddata.controller.CountController.*(..))")
	public void afterThrowing(JoinPoint point) {
		log.info(point.getSignature().getName() + " afterThrowing called...");

	}

}
