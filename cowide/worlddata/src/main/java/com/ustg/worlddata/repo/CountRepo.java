package com.ustg.worlddata.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ustg.worlddata.model.Counts;

@Repository
public interface CountRepo extends MongoRepository<Counts,Integer> {
	
	public List<Counts> findByUserId(int userId);
	
	public Counts findByUserIdAndDate(int userId,String date);

	public Counts findTopByOrderByCountIdDesc();
}
