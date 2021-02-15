package com.ustg.regiondata.service;

import java.util.List;

import com.ustg.regiondata.exception.CountAlreadyExistsException;
import com.ustg.regiondata.exception.CountNotExistsException;
import com.ustg.regiondata.model.DayCounts;

public interface DayCountsService {

    public DayCounts saveCountData(DayCounts count) throws CountAlreadyExistsException;
	
	public List<DayCounts> getAllData(int userId);
	
	public DayCounts getdata(int userId,String date,String name) throws CountNotExistsException;
	
	public boolean deleteByDate(int userId,String date,String name) throws CountNotExistsException;
	
}

