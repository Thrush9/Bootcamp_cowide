package com.ustg.regiondata.test.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ustg.regiondata.controller.DayCountController;
import com.ustg.regiondata.exception.CountAlreadyExistsException;
import com.ustg.regiondata.exception.CountNotExistsException;
import com.ustg.regiondata.model.DayCounts;
import com.ustg.regiondata.service.DayCountsServiceImpl;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class DayCountControllerTest {

	@LocalServerPort
	int randomServerPort;

	@Autowired
	private MockMvc mockMvc;
	private DayCounts dayCountObj;
	
	@MockBean
	private DayCountsServiceImpl dayCountService;
	
	@InjectMocks
	private DayCountController countController;
	
	private List<DayCounts> countList = null;
	
	@BeforeEach
	public void setUp() throws Exception {

		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(countController).build();
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
	}

	@Test
	public void createCountsSuccess() throws Exception {
		when(dayCountService.saveCountData(any())).thenReturn(dayCountObj);
		mockMvc.perform(MockMvcRequestBuilders.post("/cowide/regionData/saveCounts")
				.contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(dayCountObj)))
		        .andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void createCountsFailure() throws Exception {
		when(dayCountService.saveCountData(any())).thenThrow(CountAlreadyExistsException.class);
		mockMvc.perform(MockMvcRequestBuilders.post("/cowide/regionData/saveCounts")
				.contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(dayCountObj)))
		        .andExpect(MockMvcResultMatchers.status().isConflict())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void deleteByDateSuccess() throws Exception {
		when(dayCountService.deleteByDate(18,"2021/01/31","India")).thenReturn(true);
		mockMvc.perform(MockMvcRequestBuilders.delete("/cowide/regionData/deleteCounts?userId=18&date=2021/01/31&name=India")
			   .contentType(MediaType.APPLICATION_JSON))
			   .andExpect(MockMvcResultMatchers.status().isOk())
			   .andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void deleteByDateFailure() throws Exception {
		//when(dayCountService.saveCountData(any())).thenReturn(dayCountObj);
		when(dayCountService.deleteByDate(12, "2021/01/31", "India")).thenThrow(CountNotExistsException.class);
		mockMvc.perform(MockMvcRequestBuilders.delete("/cowide/regionData/deleteCounts?userId=12&date=2021/01/31&name=India")
			   .contentType(MediaType.APPLICATION_JSON))
			   .andExpect(MockMvcResultMatchers.status().isNotFound())
			   .andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void getCountsByUserIdAndDateAndNameSuccess() throws Exception {
		when(dayCountService.getdata(dayCountObj.getUserId(), dayCountObj.getDate(),dayCountObj.getName())).thenReturn(dayCountObj);
		mockMvc.perform(MockMvcRequestBuilders.get("/cowide/regionData/getCounts?userId=18&date=2020/01/31&name=India")
				.contentType(MediaType.APPLICATION_JSON))
		        .andExpect(MockMvcResultMatchers.status().isOk())
		        .andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void getCountsByUserIdAndDateAndNameFailure() throws Exception {
		when(dayCountService.getdata(11,"2021/01/01", "India")).thenThrow(CountNotExistsException.class);
		mockMvc.perform(MockMvcRequestBuilders.get("/cowide/regionData/getCounts?userId=11&date=2021/01/01&name=India")
			   .contentType(MediaType.APPLICATION_JSON))
			   .andExpect(MockMvcResultMatchers.status().isNotFound())
			   .andDo(MockMvcResultHandlers.print());
	}
	
	@Test
	public void getCountsByUserIdSuccess() throws Exception {
		when(dayCountService.getAllData(dayCountObj.getUserId())).thenReturn(countList);
		mockMvc.perform(MockMvcRequestBuilders.get("/cowide/regionData/getAllCounts?userId=18")
				.contentType(MediaType.APPLICATION_JSON))
		        .andExpect(MockMvcResultMatchers.status().isOk())
		        .andDo(MockMvcResultHandlers.print());
	}

	private static String asJsonString(final Object obj) {
		try {
			ObjectMapper objmapper = new ObjectMapper();
			objmapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
			objmapper.registerModule(new JavaTimeModule());
			return objmapper.writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
