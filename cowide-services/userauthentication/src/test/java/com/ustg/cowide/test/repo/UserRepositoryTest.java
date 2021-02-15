package com.ustg.cowide.test.repo;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import java.util.Optional;

import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.ustg.cowide.exception.UserNotFoundException;
import com.ustg.cowide.model.User;
import com.ustg.cowide.repo.UserRepo;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

	@Autowired
	UserRepo userRepo;

	User user;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		user = new User();
		user.setUserId(101);
		user.setFirstName("keerthisri");
		user.setLastName("Tirumala");
		user.setEmailId("keerthisri@gmail.com");
		user.setMobileNum("8282826565");
		user.setPassword("keerthi@123");
	}

	@AfterEach
	public void tearDown() throws Exception {
		userRepo.deleteAll();
	}

	@Test
	public void testAddUserSuccess() {
		userRepo.save(user);
		Optional<User> userExists = userRepo.findById(101);
		if (userExists.isPresent()) {
			Assert.assertEquals("keerthi@123", user.getPassword());
		}
	}

	@Test
	public void testLoginUserSuccess() throws UserNotFoundException {
		userRepo.save(user);
		User userObj = userRepo.findByEmailId("keerthisri@gmail.com");
		assertThat(user.getEmailId(), is(userObj.getEmailId()));

	}

}
