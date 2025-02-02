package pl.amerevent.amer.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import pl.amerevent.amer.model.Event;
import pl.amerevent.amer.model.User;
import pl.amerevent.amer.model.dto.EventDto;
import pl.amerevent.amer.model.dto.UserDto;

@Mapper
public interface EventMapper {
	EventMapper INSTANCE = Mappers.getMapper(EventMapper.class);

	EventDto toDto(Event eventEntity);

	Event toEntity(EventDto eventDto);

	void updateEntityFromDto(EventDto dto, @MappingTarget Event entity);



}
