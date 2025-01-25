package pl.amerevent.amer.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;
import pl.amerevent.amer.model.User;
import pl.amerevent.amer.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class UserServiceIT {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@Test
	@Transactional
	void testAddUser_ShouldSaveUserToDatabase() {
		// Arrange
		User user = new User();
		user.setFirstName("John");
		user.setLastName("Doe");

		// Act
		userService.addUser(user);

		// Assert
		assertThat(userRepository.findAll()).hasSize(1);
		User savedUser = userRepository.findAll().getFirst();
		assertThat(savedUser.getFirstName()).isEqualTo("John");
		assertThat(savedUser.getLastName()).isEqualTo("Doe");
	}
}
