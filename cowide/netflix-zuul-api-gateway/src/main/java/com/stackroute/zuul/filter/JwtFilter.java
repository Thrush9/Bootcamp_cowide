package com.stackroute.zuul.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpMethod;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;

/* This class implements the custom filter by extending org.springframework.web.filter.GenericFilterBean.  
 * Override the doFilter method with ServletRequest, ServletResponse and FilterChain.
 * This is used to authorize the API access for the application.
 */

public class JwtFilter extends GenericFilterBean {

	/*
	 * Override the doFilter method of GenericFilterBean. Retrieve the
	 * "authorization" header from the HttpServletRequest object. Retrieve the
	 * "Bearer" token from "authorization" header. If authorization header is
	 * invalid, throw Exception with message. Parse the JWT token and get claims
	 * from the token using the secret key Set the request attribute with the
	 * retrieved claims Call FilterChain object's doFilter() method
	 */

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httprequest = (HttpServletRequest) request;
		HttpServletResponse httpresponse = (HttpServletResponse) response;

		httpresponse.setHeader("Access-Control-Allow-Origin", httprequest.getHeader("origin"));
		httpresponse.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
		httpresponse.setHeader("Access-Control-Allow-Credential", "true");
		httpresponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe");
		
		System.out.println("Inside JWT filter " + httprequest.getHeader("Authorization"));

		if (httprequest.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.name())) {
			chain.doFilter(httprequest, httpresponse);
		}

		else {
			String authheader = httprequest.getHeader("Authorization");
			if ((authheader == null) || (!authheader.startsWith("Bearer"))) {
				throw new ServletException("JWT Token is missing in authorization");
			}

			String mytoken = authheader.substring(7);

			try {
				JwtParser jparser = Jwts.parser().setSigningKey("myjwtkey");

				Jwt jwtobj = jparser.parse(mytoken);

				Claims claim = (Claims) jwtobj.getBody();
				String usrid = claim.getSubject();

				HttpSession session = httprequest.getSession();
				session.setAttribute("userid", usrid);

			} catch (SignatureException sig) {
				throw new ServletException("Signature mis match / token expried");
			} catch (MalformedJwtException excep) {
				throw new ServletException("Token is modified by unauthorized");
			}

			chain.doFilter(httprequest, httpresponse);

		}
	} // else

}
