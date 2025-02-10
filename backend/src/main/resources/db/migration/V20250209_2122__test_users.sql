INSERT INTO user_credential (id, username, password)
VALUES ('d1e9cf41-3a23-49e4-a047-edcbeab01297', 'admin-test@gmail.com', '$2a$10$x3/RN8sjbaupZ/SLZxBOruk41PBrIHKCtZATnUIdruQjPyqoagJVu')
    ON CONFLICT (username) DO NOTHING;
INSERT INTO user_credential (id, username, password)
VALUES ('888780be-b034-4b0a-83ae-061b874cd213', 'user@gmail.com', '$2a$10$x3/RN8sjbaupZ/SLZxBOruk41PBrIHKCtZATnUIdruQjPyqoagJVu')
    ON CONFLICT (username) DO NOTHING;
INSERT INTO users (id, first_name, last_name, is_driver, phone_number,
                            date_of_birth, user_credential_id)
VALUES ('520dbd47-da9e-4ec8-b09d-1a0807afe776', 'Uzytkownik', 'Testowy', true,
        '123456789', '2025-01-16',  (select id from user_credential where username = 'user@gmail.com'))
    ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, first_name, last_name, is_driver,
                            phone_number, date_of_birth, user_credential_id)
VALUES ('f6d0ba41-3f63-44ee-9f0d-7c04ea8d8619', 'Administrator', 'Testowy', true,
        '123456789', '2025-01-16', (select id from user_credential where username = 'admin-test@gmail.com') )
    ON CONFLICT (id) DO NOTHING;
INSERT INTO user_credential_role (user_id, role_id)
VALUES ((select id from user_credential where username = 'user@gmail.com'), (select id from roles where name = 'ROLE_USER'))
    ON CONFLICT (user_id,role_id) DO NOTHING;
INSERT INTO user_credential_role (user_id, role_id)
VALUES ((select id from user_credential where username = 'admin-test@gmail.com'), (select id from roles where name = 'ROLE_ADMIN'))
    ON CONFLICT (user_id,role_id) DO NOTHING;
INSERT INTO user_credential_role (user_id, role_id)
VALUES ((select id from user_credential where username = 'admin-test@gmail.com'), (select id from roles where name = 'ROLE_USER'))
    ON CONFLICT (user_id,role_id) DO NOTHING;
COMMIT;


