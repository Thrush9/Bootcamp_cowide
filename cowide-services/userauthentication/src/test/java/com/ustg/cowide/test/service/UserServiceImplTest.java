package com.ustg.cowide.test.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.junit.*;
import com.ustg.cowide.exception.EmailAlreadyExistsException;
import com.ustg.cowide.exception.UserExistsException;
import com.ustg.cowide.exception.UserNotFoundException;
import com.ustg.cowide.model.User;
import com.ustg.cowide.repo.UserRepo;
import com.ustg.cowide.service.UserServiceImpl;

public class UserServiceImplTest {
	@Mock
	UserRepo userRepo;

	User user;

	@InjectMocks
	private UserServiceImpl userServiceImpl;

	@BeforeEach
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		user = new User();
		user.setUserId(101);
		user.setFirstName("keerthisri");
		user.setLastName("Tirumala");
		user.setEmailId("keerthisri@gmail.com");
		user.setMobileNum("8282826565");
		user.setPassword("keerthi@123");
	}

	@Test
	public void saveUserSuccessTest() throws UserExistsException, EmailAlreadyExistsException, UserNotFoundException {

		when(userRepo.findById(101)).thenReturn(Optional.empty());
		when(userRepo.save(Mockito.any(User.class))).thenReturn(new User());
		Mockito.when(userRepo.save(user)).thenReturn(user);
		User status = userServiceImpl.saveUserDetails(user);
		// assertThat(status).isNotNull();
		assertEquals(user, status);
	}

	@Test
	public void saveUserFailureTest() throws UserExistsException, EmailAlreadyExistsException {
		when(userRepo.save(user)).thenReturn(user);
		User newUser= new User();
		newUser.setUserId(101);
		newUser.setFirstName("keerthisri");
		Mockito.when(userRepo.findById(101)).thenThrow(UserExistsException.class);
		assertThrows(UserExistsException.class, () -> userServiceImpl.saveUserDetails(user));
	}

	@Test
	public void testValidateUser() throws UserNotFoundException {
		Mockito.when(userRepo.findByEmailIdAndPassword("keerthisri@gmail.com", "keerthi@123")).thenReturn(user);
		User existUser = userRepo.findByEmailIdAndPassword("keerthisri@gmail.com", "keerthi@123");
		assertEquals("keerthisri@gmail.com", existUser.getEmailId());
	}

	@Test
	public void testValidateUserFailure() throws UserNotFoundException {
		Mockito.when(userRepo.findByEmailIdAndPassword("keerthisri@gmail.com", "keerthi")).thenThrow(UserNotFoundException.class);
	}
	
	@Test
	public void testUpdateUserSuccess() throws UserNotFoundException {
		User newUser = new User();
		newUser.setEmailId("keerthisri@gmail.com");
		Mockito.when(userRepo.findByEmailId(newUser.getEmailId())).thenReturn(newUser);
		newUser.setMobileNum("8282829696");
		Mockito.when(userServiceImpl.updateUserDetails(newUser)).thenReturn(newUser);
	}
	
}
