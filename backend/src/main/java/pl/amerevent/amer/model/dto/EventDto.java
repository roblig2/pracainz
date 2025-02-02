package pl.amerevent.amer.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EventDto {
	private UUID id;
	private String name;
	private String location;
	private LocalDate date;
	private LocalDate datePacking;
	private int requiredUsers;
	private int requiredDrivers;
	private Set<UserDto> availableUsers = new HashSet<>();
	private Set<UserDto> availablePackingUsers = new HashSet<>();
	private Set<UserDto> blackListedUsers = new HashSet<>();
	private Set<UserDto> confirmedUsers = new HashSet<>();
	private String eventTime;
	private String packingTime;
}
