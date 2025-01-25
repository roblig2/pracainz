package pl.amerevent.amer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.amerevent.amer.model.User;
import pl.amerevent.amer.model.UserDate;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface UserDateRepository extends JpaRepository<UserDate, UUID> {

	Optional<UserDate> findByDateAndUser(LocalDate date, User user);
}
