package com.ustg.worlddata.test.repo;

import java.util.List;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.ustg.worlddata.model.Counts;
import com.ustg.worlddata.repo.CountRepo;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class CountRepoTest {
	
	@Autowired
	private CountRepo countrepo;
	private Counts countObj;
	
	@BeforeEach
	public void setUp() throws Exception{
		countObj = new Counts();
		countObj.setCountId(11);
		countObj.setUserId(11);
		countObj.setType("World");
		countObj.setDate("2021/01/01");
		countObj.setConfirmed(1000);
		countObj.setRecovered(900);
		countObj.setDeath(300);	
	}
	
	@AfterEach
	public void tearDown() throws Exception{
	  countrepo.deleteById(11);	
	}

	@Test
    public void createCountTest() {
		countrepo.insert(countObj);
    	Counts fetched = countrepo.findById((int) countObj.getCountId()).get();
        assertThat("World", is(fetched.getType()));
    }

    @Test
    public void deleteCounttest() {
    	countrepo.insert(countObj);
    	Counts fetched = countrepo.findById((int) countObj.getCountId()).get();
        assertThat(11, is(fetched.getUserId()));
        countrepo.delete(fetched);
    }
    

    @Test
    public void getCountsByUserIdTest() {
    	countrepo.insert(countObj);
    	Counts fetched  = countrepo.findByUserId(countObj.getUserId()).get(0);
        assertThat(11, is(fetched.getUserId()));
    }

    @Test
    public void getAllCountsByUserIdTest() {
    	countrepo.insert(countObj);
        List<Counts> newssources = countrepo.findByUserId(11);
        assertThat(newssources.size(), is(1));
    }
    
    @Test
    public void getCountsByUserIdAndDateTest() {
    	countrepo.insert(countObj);
    	Counts search = countrepo.findByUserIdAndDate(countObj.getUserId(), countObj.getDate());
    	assertThat(countObj.getCountId(), is(search.getCountId()));
    }
    
    @Test
    public void getLastRecordTest() {
    	countrepo.insert(countObj);
    	Counts search = countrepo.findTopByOrderByCountIdDesc();
    	assertThat(countObj.getConfirmed(), is(search.getConfirmed()));
    }

}
