package com.ustg.cowide.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ustg.cowide.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{

	User findByEmailIdAndPassword(String emailId, String password);

	User findByEmailId(String emailId) ;

	/* User getUserDetails(); */
	
}
