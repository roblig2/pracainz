package pl.amerevent.amer.model.dto;

import lombok.Data;

@Data
public class PasswordDto {
	private String currentPassword;
	private String newPassword;
	private String confirmPassword;
}
