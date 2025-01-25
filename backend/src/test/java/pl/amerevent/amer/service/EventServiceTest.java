package pl.amerevent.amer.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import pl.amerevent.amer.model.Event;
import pl.amerevent.amer.model.User;
import pl.amerevent.amer.model.dto.EventSearchRequest;
import pl.amerevent.amer.repository.EventRepository;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class EventServiceTest {

	@Mock
	private EventUserService eventUserService;

	@Mock
	private EventRepository eventRepository;

	@InjectMocks
	private EventService eventService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testGetUserEvents_UserExists_ReturnsEvents() {
		// Arrange
		User mockUser = new User();
		mockUser.setId(new UUID(1L,2L));
		when(eventUserService.findDataBaseUser()).thenReturn(Optional.of(mockUser));

		EventSearchRequest eventSearchRequest = new EventSearchRequest();
		eventSearchRequest.setPage(0);
		eventSearchRequest.setSize(10);
		eventSearchRequest.setSortBy("name");
		eventSearchRequest.setSortOrder(Sort.Direction.ASC);

		Event mockEvent = new Event();
		Page<Event> mockPage = new PageImpl<>(Collections.singletonList(mockEvent));
		when(eventRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(mockPage);

		// Act
		Page<Event> result = eventService.getUserEvents(eventSearchRequest);

		// Assert
		assertNotNull(result);
		assertEquals(1, result.getContent().size());
		verify(eventUserService, times(1)).findDataBaseUser();
		verify(eventRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
	}

	@Test
	void testGetUserEvents_UserNotExists_ReturnsEmptyPage() {
		// Arrange
		when(eventUserService.findDataBaseUser()).thenReturn(Optional.empty());

		EventSearchRequest eventSearchRequest = new EventSearchRequest();
		eventSearchRequest.setPage(0);
		eventSearchRequest.setSize(10);
		eventSearchRequest.setSortBy("name");
		eventSearchRequest.setSortOrder(Sort.Direction.ASC);

		// Act
		Page<Event> result = eventService.getUserEvents(eventSearchRequest);

		// Assert
		assertNotNull(result);
		assertTrue(result.isEmpty());
		verify(eventUserService, times(1)).findDataBaseUser();
		verify(eventRepository, never()).findAll(any(Specification.class), any(Pageable.class));
	}
}
