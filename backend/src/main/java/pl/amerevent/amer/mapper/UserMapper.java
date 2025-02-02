package pl.amerevent.amer.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import pl.amerevent.amer.model.User;
import pl.amerevent.amer.model.UserDate;
import pl.amerevent.amer.model.dto.UserDateDto;
import pl.amerevent.amer.model.dto.UserDto;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface UserMapper {
	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);


	@Mapping(target = "userCredential", ignore = true)
	UserDto toDto(User userEntity);


	User toEntity(UserDto userDTO);
	// Mapowanie pojedynczego UserDate na UserDateDTO
	UserDateDto toDto(UserDate userDate);

	// Mapowanie pojedynczego UserDateDTO na UserDate
	@Mapping(target = "id", ignore = true) // Ignorujemy ID, bo Hibernate sam nada ID nowym encjom
	@Mapping(target = "user", ignore = true) // Unikamy cyklicznych zależności
	UserDate toEntity(UserDateDto userDateDTO);

	// Mapowanie kolekcji (opcjonalne, ale MapStruct powinien to obsłużyć automatycznie)
	default Set<UserDateDto> mapUserDatesToDTOs(Set<UserDate> dates) {
		return dates.stream().map(this::toDto).collect(Collectors.toSet());
	}

	default Set<UserDate> mapUserDatesToEntities(Set<UserDateDto> dateDTOs) {
		return dateDTOs.stream().map(this::toEntity).collect(Collectors.toSet());
	}

}
