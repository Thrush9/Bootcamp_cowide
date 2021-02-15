package com.ustg.worlddata.service;

import java.util.List;

import com.ustg.worlddata.exception.CountAlreadyExistsException;
import com.ustg.worlddata.exception.CountNotExistsException;
import com.ustg.worlddata.model.Counts;

public interface CountService {
	
	public Counts saveCountData(Counts count) throws CountAlreadyExistsException;
	
	public List<Counts> getAllData(int userId);
	
	public Counts getdata(int userId,String date) throws CountNotExistsException;
	
	public boolean deleteByDate(int userId,String date) throws CountNotExistsException;
	
	
}
