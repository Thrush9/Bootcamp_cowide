package com.ustg.worlddata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ustg.worlddata.exception.CountAlreadyExistsException;
import com.ustg.worlddata.exception.CountNotExistsException;
import com.ustg.worlddata.model.Counts;
import com.ustg.worlddata.service.CountService;

@CrossOrigin
@RestController
@RequestMapping("cowide/worldData")
public class CountController {	

	@Autowired
	CountService countService;
	
	public CountController(CountService countService) {
		this.countService = countService;
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/saveCounts")
	public ResponseEntity<?> addCounts(@RequestBody Counts countobj){
		try {
			Counts addedData = countService.saveCountData(countobj);
			return new ResponseEntity<Counts>(addedData, HttpStatus.CREATED);
		}
		catch(CountAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	
	@GetMapping("/getAllCounts")
	public ResponseEntity<?> getAllCountsByUserId(@RequestParam("userId") int userId){
		try {
			List<Counts> list = countService.getAllData(userId);
			return new ResponseEntity<List<Counts>>(list, HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getCounts")
	public ResponseEntity<?> getCounts(@RequestParam("userId") int userId,
			@RequestParam("date") String date){
		try {
			Counts searchData = countService.getdata(userId, date);
			return new ResponseEntity<Counts>(searchData, HttpStatus.OK);
		}
		catch(CountNotExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deleteCounts")
	public ResponseEntity<?> deleteCountsOnDate(@RequestParam("userId") int userId,
			@RequestParam("date") String date){
		try {
			boolean status = countService.deleteByDate(userId, date);
			return new ResponseEntity<Boolean>(status, HttpStatus.OK);
		}
		catch(CountNotExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
}
