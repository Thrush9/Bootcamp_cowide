package com.ustg.cowide.controller;

import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ustg.cowide.exception.EmailAlreadyExistsException;
import com.ustg.cowide.exception.UserExistsException;
import com.ustg.cowide.exception.UserNotFoundException;
import com.ustg.cowide.model.User;
import com.ustg.cowide.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@CrossOrigin
@RestController
@RequestMapping("/cowide/user")
public class UserController {

	@Autowired
	UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/addUser")
	public ResponseEntity<String> addUser(@RequestBody User user) throws EmailAlreadyExistsException {
		try {
			userService.saveUserDetails(user);
			return new ResponseEntity<String>("user data added", HttpStatus.CREATED);
		} catch (UserExistsException e) {
			return new ResponseEntity<String>("User already exists", HttpStatus.CONFLICT);
		} catch (EmailAlreadyExistsException e) {
			return new ResponseEntity<String>("EmailId already exists", HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/updateUser")
	public ResponseEntity<String> updateUser(@RequestBody User user) throws UserNotFoundException {
		try {
			userService.updateUserDetails(user);
			return new ResponseEntity<String>("User data updated", HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("User not found", HttpStatus.UNAUTHORIZED);
		}
	}

	@GetMapping("/getUserProfileDetails/{userId}")
	public ResponseEntity<?> getUserDetails(@PathVariable("userId") int userId) throws UserNotFoundException {
		try {
			User user=userService.getUserDetails(userId);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("User not found", HttpStatus.UNAUTHORIZED);
		}

	}

	@PostMapping("/login")
	public ResponseEntity<?> checkUser(@RequestBody User user) {
		HashMap<String, String> hmap = new HashMap();
		try {
			User result = userService.validateUser(user.getEmailId(), user.getPassword());
			System.out.println("result:  " + result);
			if (result != null) {
				String token = generateToken(user);
				hmap.put("token", token);
				hmap.put("userId",String.valueOf(result.getUserId()));
				return new ResponseEntity<HashMap>(hmap, HttpStatus.ACCEPTED);
			} else
				return new ResponseEntity<String>("Invalid Credentials (user not exists)", HttpStatus.UNAUTHORIZED);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("Invalid credentials", HttpStatus.UNAUTHORIZED);
		}
	}

	private String generateToken(User user) {
		long expirytime = 10_000_000;
		return Jwts.builder().setSubject(user.getEmailId()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expirytime))
				.signWith(SignatureAlgorithm.HS256, "myjwtkey").compact();
	}
}
