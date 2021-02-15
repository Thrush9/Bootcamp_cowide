package com.ustg.regiondata.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ustg.regiondata.exception.CountAlreadyExistsException;
import com.ustg.regiondata.exception.CountNotExistsException;
import com.ustg.regiondata.model.DayCounts;
import com.ustg.regiondata.repository.DayCountsRepository;

@Service
public class DayCountsServiceImpl implements DayCountsService {

	@Autowired
	DayCountsRepository dayCountsRepository;

	public DayCountsServiceImpl(DayCountsRepository dayCountsRepository) {
		this.dayCountsRepository = dayCountsRepository;
	}

	@Override
	public DayCounts saveCountData(DayCounts count) throws CountAlreadyExistsException {
		DayCounts added = null;
		// for auto incrementing id
		long id = dayCountsRepository.count();
		DayCounts lastrecord = dayCountsRepository.findTopByOrderByCountIdDesc();
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
		List<DayCounts> countList = dayCountsRepository.findByUserId(count.getUserId());
		if (countList.size() > 0) {
			DayCounts search = dayCountsRepository.findByUserIdAndNameAndDate(count.getUserId(), count.getName(),
					count.getDate());
			if (search != null) {
				throw new CountAlreadyExistsException("Counts Found for this User on this date");
			} else {
				added = dayCountsRepository.insert(count);
			}
		} else {
			added = dayCountsRepository.insert(count);
		}
		return added;
	}

	@Override
	public List<DayCounts> getAllData(int userId) {
		List<DayCounts> countList = new ArrayList<>();
		countList = dayCountsRepository.findByUserId(userId);
		return countList;
	}

	@Override
	public DayCounts getdata(int userId, String date, String name) throws CountNotExistsException {
		DayCounts search = null;
		List<DayCounts> countList = dayCountsRepository.findByUserIdAndDate(userId, date);
		if (countList.size() > 0) {
			for (DayCounts counts : countList) {
				if (counts.getDate().equalsIgnoreCase(date) && counts.getName().equalsIgnoreCase(name)) {
					search = counts;
				}
			}
			if (search == null) {
				throw new CountNotExistsException("No Counts Found for this User on this date");
			}
		} else {
			throw new CountNotExistsException("No Counts Found for this User");
		}
		return search;
	}

	@Override
	public boolean deleteByDate(int userId, String date, String name) throws CountNotExistsException {
		DayCounts search = null;
		List<DayCounts> countList = dayCountsRepository.findByUserIdAndDate(userId, date);
		if (countList.size() > 0) {
			for (DayCounts counts : countList) {
				if (counts.getDate().equalsIgnoreCase(date) && counts.getName().equalsIgnoreCase(name)) {
					search = counts;
				}
			}
			if (search == null) {
				throw new CountNotExistsException("No Counts Found for this User on this date");
			} else {
				dayCountsRepository.deleteById((int) search.getCountId());
				return true;
			}
		} else {
			throw new CountNotExistsException("No Counts Found for this User");
		}
	}

}
