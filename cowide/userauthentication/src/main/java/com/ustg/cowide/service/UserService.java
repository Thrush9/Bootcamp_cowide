package com.ustg.cowide.service;

import com.ustg.cowide.exception.EmailAlreadyExistsException;
import com.ustg.cowide.exception.UserExistsException;
import com.ustg.cowide.exception.UserNotFoundException;
import com.ustg.cowide.model.User;

public interface UserService {
	public User saveUserDetails(User user) throws UserExistsException, EmailAlreadyExistsException;


	public User validateUser(String emailId, String password) throws UserNotFoundException;


	public User updateUserDetails(User user) throws UserNotFoundException;


	 public User getUserDetails(int userId) throws UserNotFoundException; 
}
