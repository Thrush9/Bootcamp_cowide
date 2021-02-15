package com.ustg.regiondata.test.repository;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.ustg.regiondata.model.DayCounts;
import com.ustg.regiondata.repository.DayCountsRepository;


@ExtendWith(SpringExtension.class)
@DataMongoTest
public class DayCountsRepositoryTest {

	@Autowired
	private DayCountsRepository dayCountRepo;
	private DayCounts dayCountObj;
	
	@BeforeEach
	public void setUp() throws Exception{
		dayCountObj = new DayCounts();
		dayCountObj.setCountId(11);
		dayCountObj.setUserId(11);
		dayCountObj.setName("India");
		dayCountObj.setBelongsTo("Asia");
		dayCountObj.setType("World");
		dayCountObj.setDate("2021/01/01");
		dayCountObj.setConfirmed(1000);
		dayCountObj.setRecovered(900);
		dayCountObj.setDeath(300);	
	}
	
	@AfterEach
	public void tearDown() throws Exception{
		dayCountRepo.deleteById(11);	
	}

	@Test
    public void createCountTest() {
		dayCountRepo.insert(dayCountObj);
		DayCounts fetched = dayCountRepo.findById((int) dayCountObj.getCountId()).get();
        assertThat("World", is(fetched.getType()));
    }

    @Test
    public void deleteCounttest() {
    	dayCountRepo.insert(dayCountObj);
    	DayCounts fetched = dayCountRepo.findById((int) dayCountObj.getCountId()).get();
        assertThat(11, is(fetched.getUserId()));
        dayCountRepo.delete(fetched);
    }
    

    @Test
    public void getCountsByUserIdTest() {
    	dayCountRepo.insert(dayCountObj);
    	DayCounts fetched  = dayCountRepo.findByUserId(dayCountObj.getUserId()).get(0);
        assertThat(11, is(fetched.getUserId()));
    }

    @Test
    public void getAllCountsByUserIdTest() {
    	dayCountRepo.insert(dayCountObj);
        List<DayCounts> newssources = dayCountRepo.findByUserId(11);
        assertThat(newssources.size(), is(1));
    }
    
    @Test
    public void getCountsByUserIdAndDateAndNameTest() {
    	dayCountRepo.insert(dayCountObj);
    	DayCounts search = dayCountRepo.findByUserIdAndNameAndDate(dayCountObj.getUserId(),dayCountObj.getName(), dayCountObj.getDate());
    	assertThat(dayCountObj.getCountId(), is(search.getCountId()));
    }
    
    @Test
    public void getLastRecordTest() {
    	dayCountRepo.insert(dayCountObj);
    	DayCounts search = dayCountRepo.findTopByOrderByCountIdDesc();
    	assertThat(dayCountObj.getConfirmed(), is(search.getConfirmed()));
    }
}
