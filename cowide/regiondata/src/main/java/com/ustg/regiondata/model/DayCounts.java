package com.ustg.regiondata.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class DayCounts {
	
	@Id
	private long countId;
	private String type;
	private String name;
	private String belongsTo;
	private long recovered;
	private long confirmed;
	private long death;
	private String  date;
	private int userId;
	
	public DayCounts() {
		
	}
	
	public DayCounts(long countId, String type,String name, String belongs, 
			long recovered, long confirmed, long death,String date,int userId) {
		this.countId = countId;
		this.type = type;
		this.name = name;
		this.belongsTo = belongs;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBelongsTo() {
		return belongsTo;
	}

	public void setBelongsTo(String belongsTo) {
		this.belongsTo = belongsTo;
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
		return "DayCounts [countId=" + countId + ", type=" + type + ", name=" + name + ", belongsTo=" + belongsTo
				+ ", recovered=" + recovered + ", confirmed=" + confirmed + ", death=" + death + ", date=" + date
				+ ", userId=" + userId + "]";
	}
	
	
}
