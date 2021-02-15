
package com.ustg.cowide.config;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.ustg.cowide.model.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect

@Component
public class CoWideAspectLOG {

	Logger mylog = LoggerFactory.getLogger(CoWideAspectLOG.class);

	@Before("addUserHandler()")
	public void logUserViews(JoinPoint jp) {
		mylog.info("User details . kind of call is " + jp.getKind());
	}
	
	//@After("")
	
	@AfterThrowing (pointcut="addUserHandler()"  , throwing="excep")
	public void handleExcept(Exception excep)
	{
		mylog.info("Exception raised while adding user " + excep.getMessage());
	}
	
	@Around("addUserHandler()")
	public Object aroundUserSave(ProceedingJoinPoint proceedobj) throws Throwable
	{
		Object obj=proceedobj.proceed();
		try
		{
				ResponseEntity response= (ResponseEntity)obj;
				User user=(User)response.getBody();
				mylog.info("New user is getting Added:Username:" + user.getEmailId()+ " User contact number:" +user.getMobileNum());
		}
			catch(Exception e) { }
			return obj;
	}
	
		
	@Pointcut("execution (* com.ustg.cowide.controller.UserController.addUser(..))")
	public void addUserHandler()
	{} 
	
	
}
