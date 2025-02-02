package pl.amerevent.amer.security.login;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LoginController {

	private final AuthenticationManager authenticationManager;
	private final long expirationTime;
	@Value("${jwt.secret}")
	private String secret;
	private final LoginAttemptService loginAttemptService;


	public LoginController(AuthenticationManager authenticationManager,@Value("${jwt.expirationTime}") long expirationTime, LoginAttemptService loginAttemptService) {
		this.authenticationManager = authenticationManager;
		this.expirationTime = expirationTime;
		this.loginAttemptService = loginAttemptService;

	}

	@PostMapping("/login")
	public ResponseEntity<Token> login(@RequestBody LoginCredentials loginCredentials) {
		try {
			if (loginAttemptService.isBlocked(loginCredentials.getUsername())) {
				return new ResponseEntity<>(null, HttpStatus.LOCKED);
			}
			Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginCredentials.getUsername(), loginCredentials.getPassword()));
			// Sprawdzenie, czy użytkownik nie jest zablokowany
			loginAttemptService.loginSucceeded(loginCredentials.getUsername());
			UserDetails principal = (UserDetails) authenticate.getPrincipal();
			List<String> authorities = principal.getAuthorities().stream()
					.map(GrantedAuthority::getAuthority)
					.toList();
			String token = JWT.create()
					.withSubject(principal.getUsername())
					.withClaim("autorities",authorities)
					.withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
					.sign(Algorithm.HMAC256(secret));

			return new ResponseEntity<>(new Token(token), HttpStatus.OK);
		} catch (AuthenticationException e) {
			loginAttemptService.loginFailed(loginCredentials.getUsername());
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class LoginCredentials {
		private String username;
		private String password;
	}
	@Getter
	@AllArgsConstructor
	public static class Token {
		private String token;
	}
}
