package com.ustg.worlddata.test.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;

import com.ustg.worlddata.exception.CountAlreadyExistsException;
import com.ustg.worlddata.exception.CountNotExistsException;
import com.ustg.worlddata.model.Counts;
import com.ustg.worlddata.repo.CountRepo;
import com.ustg.worlddata.service.CountServiceImpl;

public class CountServiceImplTest {

	@MockBean
    private Counts countObj;
	
    @Mock
    private CountRepo countrepo;
    
    @InjectMocks
    private CountServiceImpl countService;
    
    private List<Counts> countList = null;
    Optional<Counts> options;

    @BeforeEach
    public void setUp() throws Exception {

        MockitoAnnotations.initMocks(this); 
        countObj = new Counts();
        countObj.setCountId(11);
		countObj.setUserId(11);
		countObj.setType("World");
		countObj.setDate("2021/02/01");
		countObj.setConfirmed(1000);
		countObj.setRecovered(900);
		countObj.setDeath(300);	
		
        countList = new ArrayList<>();
        countList.add(countObj);
        options = Optional.of(countObj);
    }

    
    @Test
    public void createCountsTestSuccess() throws Exception {
        when(countrepo.insert(countObj)).thenReturn(countObj);
        Counts saved = countService.saveCountData(countObj);
        assertThat(saved.getCountId(),is(countObj.getCountId()));
    }
    
    @Test
    public void createCountsTest1Failure() throws Exception {
    	when(countrepo.insert(countObj)).thenReturn(null);
    	Counts saved = countService.saveCountData(countObj);
        assertNull(saved);
    }
    
//    @Test
//    public void createCountsTest2Failure() throws CountAlreadyExistsException {
//    	when(countrepo.findByUserId(11)).thenReturn(countList);
//    	when(countrepo.insert(countObj)).thenReturn(countObj);
//    	when(countrepo.findByUserIdAndDate(11,"2021/02/01")).thenReturn(countObj);
//    	Counts test = new Counts();
//    	test.setCountId(11);
//    	test.setUserId(11);
//    	test.setType("World");
//    	test.setDate("2021/02/01");
//		test.setConfirmed(1000);
//		test.setRecovered(900);
//		test.setDeath(300);
//    	assertThrows(CountAlreadyExistsException.class,() -> { countService.saveCountData(test); });
//    }

    @Test
    public void getAllCountsByUserIdTestSuccess() throws CountAlreadyExistsException {
    	when(countrepo.findByUserId(11)).thenReturn(countList);
        List<Counts> fetched = countService.getAllData(11);
        assertThat(fetched, is(countList));
    }
    
    
    @Test
    public void getCountByUserIdAndDateTestSuccess() throws CountNotExistsException {
    	when(countrepo.findByUserId(11)).thenReturn(countList);
    	when(countrepo.findByUserIdAndDate(11,"2021/02/01")).thenReturn(countObj);
        Counts fetched = countService.getdata(11,"2021/02/01");
        assertNotNull(fetched); 
        assertThat(fetched.getDate(), is(countObj.getDate()));
    }

    @Test
    public void getCountByUserIdAndDate1TestFailure() throws CountNotExistsException {
    	when(countrepo.findByUserId(12)).thenThrow(NoSuchElementException.class);
        assertThrows(CountNotExistsException.class,() -> { countService.getdata(11,"2021/02/01"); });
    }

    @Test
    public void getCountByUserIdAndDate2TestFailure() throws CountNotExistsException {
    	when(countrepo.findByUserId(11)).thenReturn(countList);
        assertThrows(CountNotExistsException.class,() -> { countService.getdata(11,"2021/01/01"); });
    }

    @Test
    public void deleteCountByUserIdAndDateTestSuccess() throws CountNotExistsException {
    	when(countrepo.findByUserId(11)).thenReturn(countList);
        when(countrepo.save(countObj)).thenReturn(countObj);
        boolean flag = countService.deleteByDate(11,"2021/02/01");
        assertEquals(true, flag);
    }

    @Test
    public void deleteCountByUserIdAndDate1TestFailure() throws CountNotExistsException {
    	when(countrepo.findByUserId(12)).thenThrow(NoSuchElementException.class);
        assertThrows(CountNotExistsException.class,() -> { countService.deleteByDate(11,"2021/02/01"); });      
    }
    
    @Test
    public void deleteCountByUserIdAndDate2TestFailure() throws CountNotExistsException {
    	when(countrepo.findByUserId(11)).thenReturn(countList);
        assertThrows(CountNotExistsException.class,() -> { countService.deleteByDate(11,"2021/01/01"); });      
    }
	
}
