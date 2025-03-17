INSERT INTO users
(id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id)
VALUES (gen_random_uuid(),
        'Michalina', 'Adamczyk', true,
        '792676006', '2004-02-07',
        (select id
         from amermanager.user_credential
         where username = 'michalina@amer-event.pl'));
INSERT INTO users
(id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id)
VALUES (gen_random_uuid(),
        'Michał', 'Motławski', true,
        '783998546', '2004-02-07',
        (select id
         from amermanager.user_credential
         where username = 'michal@amer-event.pl'));
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id)
VALUES (gen_random_uuid(), 'Piotr',
        'Mizerski', true, '690496258',
        '2004-02-07', (select id
                       from amermanager.user_credential
                       where username = 'piotr@amer-event.pl'));
