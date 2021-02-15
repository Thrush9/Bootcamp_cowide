package com.ustg.regiondata.test.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.ustg.regiondata.exception.CountAlreadyExistsException;
import com.ustg.regiondata.exception.CountNotExistsException;
import com.ustg.regiondata.model.DayCounts;
import com.ustg.regiondata.repository.DayCountsRepository;
import com.ustg.regiondata.service.DayCountsServiceImpl;



public class DayCountsServiceImplTest {
	@MockBean
    private DayCounts dayCountObj;
	
    @Mock
    private DayCountsRepository dayCountrepo;
    
    @InjectMocks
    private DayCountsServiceImpl dayCountService;
    
    private List<DayCounts> countList = null;
    Optional<DayCounts> options;
    
    @BeforeEach
    public void setUp() throws Exception {

        MockitoAnnotations.initMocks(this); 
        dayCountObj = new DayCounts();
        dayCountObj.setCountId(7);
		dayCountObj.setUserId(18);
		dayCountObj.setName("India");
		dayCountObj.setBelongsTo("Asia");
		dayCountObj.setType("World");
		dayCountObj.setDate("2021/01/31");
		dayCountObj.setConfirmed(1000);
		dayCountObj.setRecovered(900);
		dayCountObj.setDeath(300);	
		
        countList = new ArrayList<>();
        countList.add(dayCountObj);
        options = Optional.of(dayCountObj);
    }

    @Test
    public void createCountsTestSuccess() throws Exception {
        when(dayCountrepo.insert(dayCountObj)).thenReturn(dayCountObj);
        DayCounts saved = dayCountService.saveCountData(dayCountObj);
        assertThat(saved.getCountId(),is(dayCountObj.getCountId()));
    }
    
    @Test
    public void createCountsTest1Failure() throws Exception {
    	when(dayCountrepo.insert(dayCountObj)).thenReturn(null);
    	DayCounts saved = dayCountService.saveCountData(dayCountObj);
        assertNull(saved);
    }
    
    @Test
    public void getAllCountsByUserIdTestSuccess() throws CountAlreadyExistsException {
    	when(dayCountrepo.findByUserId(18)).thenReturn(countList);
        List<DayCounts> fetched = dayCountService.getAllData(18);
        assertThat(fetched, is(countList));
    }
    
    
    @Test
    public void getCountByUserIdAndDateAndNameTestSuccess() throws CountNotExistsException {
    	when(dayCountrepo.findByUserIdAndDate(18,"2021/01/31")).thenReturn(countList);
    	//when(dayCountrepo.findByUserIdAndNameAndDate(18,"2021/01/01","India")).thenReturn(dayCountObj);
    	DayCounts fetched = dayCountService.getdata(18,"2021/01/31","India");
        assertNotNull(fetched); 
        assertThat(fetched.getDate(), is(dayCountObj.getDate()));
    }

    @Test
    public void getCountByUserIdAndDateAndName1TestFailure() throws CountNotExistsException {
    	when(dayCountrepo.findByUserIdAndDate(12,"2021/01/31")).thenThrow(NoSuchElementException.class);
        assertThrows(CountNotExistsException.class,() -> { dayCountService.getdata(18,"2021/01/31","India"); });
    }

    @Test
    public void getCountByUserIdAndDateAndName2TestFailure() throws CountNotExistsException {
    	when(dayCountrepo.findByUserIdAndDate(18,"2021/01/31")).thenReturn(countList);
        assertThrows(CountNotExistsException.class,() -> { dayCountService.getdata(18,"2021/02/31","India"); });
    }

    @Test
    public void deleteCountByUserIdAndDateAndNameTestSuccess() throws CountNotExistsException {
    	when(dayCountrepo.findByUserIdAndDate(18,"2021/01/31")).thenReturn(countList);
    	when(dayCountrepo.insert(dayCountObj)).thenReturn(dayCountObj);
        when(dayCountrepo.findByUserIdAndNameAndDate(18,"2021/01/31","India")).thenReturn(dayCountObj);
        boolean flag = dayCountService.deleteByDate(18,"2021/01/31","India");
        assertEquals(true, flag);
    }

    @Test
    public void deleteCountByUserIdAndDateAndName1TestFailure() throws CountNotExistsException {
    	when(dayCountrepo.findByUserIdAndDate(12,"2021/02/01")).thenThrow(NoSuchElementException.class);
        assertThrows(CountNotExistsException.class,() -> { dayCountService.deleteByDate(18,"2021/01/31","India"); });      
    }
    
    @Test
    public void deleteCountByUserIdAndDateAndName2TestFailure() throws CountNotExistsException {
    	when(dayCountrepo.findByUserIdAndDate(18,"2021/01/31")).thenReturn(countList);
        assertThrows(CountNotExistsException.class,() -> { dayCountService.deleteByDate(18,"2021/02/01","India"); });      
    }
}
