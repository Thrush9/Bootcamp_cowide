package com.ustg.cowide.test.controller;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ustg.cowide.controller.UserController;
import com.ustg.cowide.exception.UserExistsException;
import com.ustg.cowide.exception.UserNotFoundException;
import com.ustg.cowide.model.User;
import com.ustg.cowide.repo.UserRepo;
import com.ustg.cowide.service.UserService;

//@RunWith(SpringRunner.class)
//@WebMvcTest
@SpringBootTest
public class UserControllerTests {

	MockMvc mvc;

	@Mock
	private UserService userService;

	@InjectMocks
	UserController userController;
	
	@Autowired
	UserRepo userRepo;

	User user;

	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		mvc = MockMvcBuilders.standaloneSetup(userController).build();
		user = new User();
		user.setUserId(101);
		user.setFirstName("keerthisri");
		user.setLastName("Tirumala");
		user.setEmailId("keerthisri@gmail.com");
		user.setMobileNum("8282826565");
		user.setPassword("keerthi@123");
	}

	@Test
	public void addUserDataSuccess() throws Exception {
		when(userService.saveUserDetails(user)).thenReturn(user);
		mvc.perform(MockMvcRequestBuilders.post("/cowide/user/addUser").contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(user))).andExpect(MockMvcResultMatchers.status().isCreated());
	}

	@Test
	public void addUserDataFailure() throws Exception {
		when(userService.saveUserDetails(any())).thenThrow(UserExistsException.class);
		mvc.perform(MockMvcRequestBuilders.post("/cowide/user/addUser").contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(user))).andExpect(MockMvcResultMatchers.status().isConflict())
				.andDo(MockMvcResultHandlers.print());

	}
	
	@Test 
	public void updateUserDataSuccess() throws Exception {
		Mockito.when(userService.validateUser("keerthisri@gmail.com", "keerthi@123")).thenReturn(user);
		user.setFirstName("ABC");
		when(userService.updateUserDetails(user)).thenReturn(user);
		mvc.perform(MockMvcRequestBuilders.post("/cowide/user/updateUser")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
	}
	
	@Test
	public void updateUserDataFailure() throws Exception {
		Mockito.when(userService.validateUser("keer1234@gmail.com", "keerthi@123")).thenReturn(user);
		when(userService.updateUserDetails(any())).thenThrow(UserNotFoundException.class);
		mvc.perform(MockMvcRequestBuilders.post("/cowide/user/updateUser").contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(user))).andExpect(MockMvcResultMatchers.status().isUnauthorized())
				.andDo(MockMvcResultHandlers.print());
	}
	

	@Test
	public void testUserLoginSuccess() throws Exception {
		User user = new User();
		user.setUserId(101);
		user.setEmailId("keerthisri@gmail.com");
		user.setPassword("keerthi@123");
		// Mockito.when(userService.saveUserDetails(user)).thenReturn(user);
		Mockito.when(userService.validateUser("keerthisri@gmail.com", "keerthi@123")).thenReturn(user);
		mvc.perform(MockMvcRequestBuilders.post("/cowide/user/login").contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(user))).andExpect(MockMvcResultMatchers.status().isAccepted())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void testLoginUserFailure() throws Exception {
		Mockito.when(userService.validateUser("keer1234@gmail.com", "keerthi@123"))
				.thenThrow(UserNotFoundException.class);
		mvc.perform(MockMvcRequestBuilders.post("/cowide/user/login").contentType(MediaType.APPLICATION_JSON)
				.content(jsonToString(user))).andExpect(MockMvcResultMatchers.status().isUnauthorized())
				.andDo(MockMvcResultHandlers.print());
	}

	private String jsonToString(final Object obj) {
		String result;
		try {
			final ObjectMapper mapper = new ObjectMapper();
			final String jsonContent = mapper.writeValueAsString(obj);
			result = jsonContent;
		} catch (JsonProcessingException e) {
			result = "Json processing error";
		}
		return result;
	}

}
