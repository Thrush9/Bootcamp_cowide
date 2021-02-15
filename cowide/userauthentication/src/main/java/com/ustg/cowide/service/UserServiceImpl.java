package com.ustg.cowide.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ustg.cowide.exception.EmailAlreadyExistsException;
import com.ustg.cowide.exception.UserExistsException;
import com.ustg.cowide.exception.UserNotFoundException;
import com.ustg.cowide.model.User;
import com.ustg.cowide.repo.UserRepo;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepo userRepo;

	@Override
	public User saveUserDetails(User user) throws UserExistsException, EmailAlreadyExistsException {
		System.out.println("USER ID:::::" + user.getUserId());
		Optional<User> userExists = userRepo.findById(user.getUserId());

		if (userExists.isPresent()) {
			throw new UserExistsException();
		}
		boolean emailExists = checkEmailExistence(user.getEmailId());
		if (emailExists) {
			throw new EmailAlreadyExistsException("Email Id already exists");
		}
		return userRepo.save(user);
	}

	public boolean checkEmailExistence(String emailId) {
		User user = userRepo.findByEmailId(emailId);
		boolean result = false;
		if (user == null) {
			result = false;
		} else {
			result = true;
		}
		return result;
	}

	@Override
	public User validateUser(String emailId, String password) throws UserNotFoundException {
		User result = userRepo.findByEmailIdAndPassword(emailId, password);
		if (result == null) {
			throw new UserNotFoundException("User not found");
		}
		return result;
	}

	@Override
	public User updateUserDetails(User user) throws UserNotFoundException {
		//Optional<User> userFound = userRepo.findById(user.getUserId());
		User userFound= userRepo.findByEmailId(user.getEmailId());
		if (userFound!=null) {
			userFound.setFirstName(user.getFirstName());
			userFound.setLastName(user.getLastName());
			userFound.setEmailId(user.getEmailId());
			userFound.setMobileNum(user.getMobileNum());
			userFound.setPassword(user.getPassword());
		} else {
			throw new UserNotFoundException("User not found");
		}
		return userRepo.save(userFound);
	}

	@Override
	public User getUserDetails(int userId) throws UserNotFoundException {
		User user=null;
		Optional<User> userFound = userRepo.findById(userId);
		if (userFound.isPresent()) {
			user = userFound.get();
		} else {
			throw new UserNotFoundException("User not found");
		}
		return user;
	}

}
