package com.ustg.worlddata.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Counts {
	
	@Id
	private long countId;
	private String type;
	private long recovered;
	private long confirmed;
	private long death;
	private String  date;
	private int userId;
	
	public Counts() {
	}
	
	public Counts(long countId, String type, long recovered, long confirmed, long death,String date,int userId) {
		super();
		this.countId = countId;
		this.type = type;
		this.recovered = recovered;
		this.confirmed = confirmed;
		this.death = death;
		this.date = date;
		this.userId = userId;
	}

	public long getCountId() {
		return countId;
	}

	public void setCountId(long countId) {
		this.countId = countId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getRecovered() {
		return recovered;
	}

	public void setRecovered(long recovered) {
		this.recovered = recovered;
	}

	public long getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(long confirmed) {
		this.confirmed = confirmed;
	}

	public long getDeath() {
		return death;
	}

	public void setDeath(long death) {
		this.death = death;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Counts [countId=" + countId + ", type=" + type + ", recovered=" + recovered + ", confirmed=" + confirmed
				+ ", death=" + death + ", date=" + date + ", userId=" + userId + "]";
	}
	
	
}
