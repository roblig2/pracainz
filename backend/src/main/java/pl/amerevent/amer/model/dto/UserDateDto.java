package pl.amerevent.amer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDateDto {
	private LocalDate date;
	private String remark;

//	public UserDateDto(LocalDate date, String remark) {
//		this.date = date;
//		this.remark = remark;
//	}

}
