package pl.amerevent.amer.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import pl.amerevent.amer.model.User;
import pl.amerevent.amer.model.dto.UserDto;

import java.util.HashSet;
import java.util.Set;

@Mapper
public interface UserCollectionMapper {
	UserCollectionMapper INSTANCE = Mappers.getMapper(UserCollectionMapper.class);

	Set<UserDto> toDtoCollection(Set<User> userEntity);

	default Set<User> toEntityCollection(Set<UserDto> userDTO){
		Set<User> users = new HashSet<>();
		if(userDTO != null){
			userDTO.forEach(user -> users.add(UserMapper.INSTANCE.toEntity(user)));
		}
		return users;
	};

}
