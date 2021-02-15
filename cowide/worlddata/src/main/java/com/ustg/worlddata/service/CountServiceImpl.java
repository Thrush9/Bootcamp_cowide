package com.ustg.worlddata.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ustg.worlddata.exception.CountAlreadyExistsException;
import com.ustg.worlddata.exception.CountNotExistsException;
import com.ustg.worlddata.model.Counts;
import com.ustg.worlddata.repo.CountRepo;

@Service
public class CountServiceImpl implements CountService {

	@Autowired
	CountRepo countrepo;

	public CountServiceImpl(CountRepo countrepo) {
		this.countrepo = countrepo;
	}

	@Override
	public Counts saveCountData(Counts count) throws CountAlreadyExistsException {
		Counts added = null;
		// for auto incrementing id
		long id = countrepo.count();
		Counts lastrecord = countrepo.findTopByOrderByCountIdDesc();
		if (lastrecord != null) {
			count.setCountId(lastrecord.getCountId() + 1);
		} else {
			count.setCountId(id + 1);
		}
		// for storing date in yyyt/MM/dd
		Date today = new Date();
		DateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
		String date = formatter.format(today);
		count.setDate(date);
		List<Counts> countList = countrepo.findByUserId(count.getUserId());
		if (countList.size() > 0) {
			Counts search = countrepo.findByUserIdAndDate(count.getUserId(), count.getDate());
			if (search != null) {
				throw new CountAlreadyExistsException("Counts Found for this User on this date");
			} else {
				added = countrepo.insert(count);
			}
		} else {
			added = countrepo.insert(count);
		}
		return added;
	}

	@Override
	public Counts getdata(int userId, String date) throws CountNotExistsException {
		Counts search = null;
		List<Counts> countList = countrepo.findByUserId(userId);
		if (countList.size() > 0) {
			search = countrepo.findByUserIdAndDate(userId, date);
			if (search == null) {
				throw new CountNotExistsException("No Counts Found for this User on this date");
			}
		} else {
			throw new CountNotExistsException("No Counts Found for this User");
		}
		return search;
	}

	@Override
	public boolean deleteByDate(int userId, String date) throws CountNotExistsException {
		Counts search = null;
		List<Counts> countList = countrepo.findByUserId(userId);
		if (countList.size() > 0) {
			for (Counts counts : countList) {
				if (counts.getDate().equalsIgnoreCase(date)) {
					search = counts;
				}
			}
			if (search != null) {
				countrepo.deleteById((int) search.getCountId());
				return true;
			} else {
				throw new CountNotExistsException("No Counts Found for this User on this date");
			}
		} else {
			throw new CountNotExistsException("No Counts Found for this User");
		}
	}

	@Override
	public List<Counts> getAllData(int userId) {
		List<Counts> countList = new ArrayList<>();
		countList = countrepo.findByUserId(userId);
		return countList;
	}

}
