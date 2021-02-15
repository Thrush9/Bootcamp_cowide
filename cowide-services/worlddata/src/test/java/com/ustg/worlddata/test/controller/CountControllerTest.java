package com.ustg.worlddata.test.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ustg.worlddata.controller.CountController;
import com.ustg.worlddata.exception.CountAlreadyExistsException;
import com.ustg.worlddata.exception.CountNotExistsException;
import com.ustg.worlddata.model.Counts;
import com.ustg.worlddata.service.CountServiceImpl;

import org.mockito.InjectMocks;
import org.mockito.Mock;
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

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class CountControllerTest {

	@LocalServerPort
	int randomServerPort;

	@Autowired
	private MockMvc mockMvc;
	private Counts countObj;
	
	@MockBean
	private CountServiceImpl countService;
	
	@InjectMocks
	private CountController countController;
	
	private List<Counts> countList = null;

	@BeforeEach
	public void setUp() throws Exception {

		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(countController).build();
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
	}

	@Test
	public void createCountsSuccess() throws Exception {
		when(countService.saveCountData(any())).thenReturn(countObj);
		mockMvc.perform(MockMvcRequestBuilders.post("/cowide/worldData/saveCounts")
				.contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(countObj))).andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void createCountsFailure() throws Exception {
		when(countService.saveCountData(any())).thenThrow(CountAlreadyExistsException.class);
		mockMvc.perform(MockMvcRequestBuilders.post("/cowide/worldData/saveCounts")
				.contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(countObj))).andExpect(MockMvcResultMatchers.status().isConflict())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void deleteByDateSuccess() throws Exception {
		when(countService.deleteByDate(11, "2021/02/01")).thenReturn(true);
		mockMvc.perform(MockMvcRequestBuilders.delete("/cowide/worldData/deleteCounts?userId=11&date=2020/02/01")
			   .contentType(MediaType.APPLICATION_JSON))
			   .andExpect(MockMvcResultMatchers.status().isOk())
			   .andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void deleteByDateFailure() throws Exception {
		when(countService.deleteByDate(12,"2021/01/29")).thenThrow(CountNotExistsException.class);
		mockMvc.perform(MockMvcRequestBuilders.delete("/cowide/worldData/deleteCounts?userId=12&date=2021/01/29")
			   .contentType(MediaType.APPLICATION_JSON))
			   .andExpect(MockMvcResultMatchers.status().isNotFound())
			   .andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void getCountsByUserIdAndDateSuccess() throws Exception {
		when(countService.getdata(countObj.getUserId(), countObj.getDate())).thenReturn(countObj);
		mockMvc.perform(MockMvcRequestBuilders.get("/cowide/worldData/getCounts?userId=11&date=2020/02/01")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void getCountsByUserIdAndDateFailure() throws Exception {
		when(countService.getdata(12,"2021/01/29")).thenThrow(CountNotExistsException.class);
		mockMvc.perform(MockMvcRequestBuilders.get("/cowide/worldData/getCounts?userId=12&date=2021/01/29")
			   .contentType(MediaType.APPLICATION_JSON))
			   .andExpect(MockMvcResultMatchers.status().isNotFound());
	}
	
	@Test
	public void getCountsByUserIdSuccess() throws Exception {
		when(countService.getAllData(countObj.getUserId())).thenReturn(countList);
		mockMvc.perform(MockMvcRequestBuilders.get("/cowide/worldData/getAllCounts?userId=11")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk());
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
