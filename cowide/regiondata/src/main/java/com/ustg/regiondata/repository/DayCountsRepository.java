package com.ustg.regiondata.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.ustg.regiondata.model.DayCounts;

@Repository
public interface DayCountsRepository extends MongoRepository<DayCounts, Integer>{

	public List<DayCounts> findByUserId(int userId);
	
	public List<DayCounts> findByUserIdAndDate(int userId,String date);
	
	public DayCounts findByUserIdAndNameAndDate(int userId,String name,String date);
	
	public DayCounts findTopByOrderByCountIdDesc();
}
