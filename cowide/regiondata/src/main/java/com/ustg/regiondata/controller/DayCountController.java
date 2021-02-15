package com.ustg.regiondata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ustg.regiondata.service.DayCountsService;
import com.ustg.regiondata.exception.CountAlreadyExistsException;
import com.ustg.regiondata.exception.CountNotExistsException;
import com.ustg.regiondata.model.DayCounts;

@CrossOrigin
@RestController
@RequestMapping("cowide/regionData")
public class DayCountController {

	@Autowired
	DayCountsService dayCountsService;
	
	public DayCountController(DayCountsService dayCountsService) {
	  this.dayCountsService = dayCountsService;	
	}
	
	@PostMapping("/saveCounts")
	public ResponseEntity<?> addCounts(@RequestBody DayCounts countobj){
		try {
			DayCounts addedData = dayCountsService.saveCountData(countobj);
			return new ResponseEntity<DayCounts>(addedData, HttpStatus.CREATED);
		}
		catch(CountAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	
	@GetMapping("/getAllCounts")
	public ResponseEntity<?> getAllCountsByUserId(@RequestParam("userId") int userId){
		try {
			List<DayCounts> list = dayCountsService.getAllData(userId);
			return new ResponseEntity<List<DayCounts>>(list, HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getCounts")
	public ResponseEntity<?> getCounts(@RequestParam("userId") int userId,
			@RequestParam("date") String date,@RequestParam("name") String name){
		try {
			DayCounts searchData = dayCountsService.getdata(userId, date,name);
			return new ResponseEntity<DayCounts>(searchData, HttpStatus.OK);
		}
		catch(CountNotExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deleteCounts")
	public ResponseEntity<?> deleteCountsOnDate(@RequestParam("userId") int userId,
			@RequestParam("date") String date,@RequestParam("name") String name){
		try {
			boolean status = dayCountsService.deleteByDate(userId, date,name);
			System.out.println(status);
			
			return new ResponseEntity<Boolean>(status, HttpStatus.OK);
		}
		catch(CountNotExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
}
