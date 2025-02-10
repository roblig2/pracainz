delete from user_credential where username != 'a';
delete from users where first_name != 'a' ;
delete from user_credential_role where role_id != '817897a2-2f99-47b6-b084-a9798a889f73';


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

INSERT INTO user_credential (id, username, password) VALUES ('360f5642-7874-4c61-bae0-30708a741cf9', 'wera.otl@wp.pl', '$2a$10$xBHk.wXH9e.5yaf/Qch6SuRUfJ99eKD/SWrpNB4O8YPYdqPbH0AVK');
INSERT INTO user_credential (id, username, password) VALUES ('1e6fe1f6-f47c-4704-adcd-eddb580a2e4a', 'd.wilin@wp.pl', '$2a$10$9QarDrkYsoG7seZaE17fbu8MJ7tWHSTxehwUYMMEWI3SFSfvKXFxy');
INSERT INTO user_credential (id, username, password) VALUES ('4eb32aad-9835-4068-a783-9a57536e3103', 'mrozowicz.remigiusz@gmail.com', '$2a$10$JMWkdk6PK/HfI4FG1DYY8ucESwv7D4b7.lQosI/CjjpBKLEwDyYlW');
INSERT INTO user_credential (id, username, password) VALUES ('8048823f-b8c9-42e4-80bf-a24ed4b9f8e2', 'jan.rosinn@gmail.com', '$2a$10$VVEA2n16AZUUp00pCwF0kumSbLYhBQH6fhXNBWTzMLCN1QMFnqyVC');
INSERT INTO user_credential (id, username, password) VALUES ('29cc7def-9130-48a2-a202-281946cf36f8', 'martynachabecka@gmail.com', '$2a$10$Bz9WSiDbfjFrylm4OStGOOtEuzYWfw83rj/cd3nRqdIfV6euJF03K');
INSERT INTO user_credential (id, username, password) VALUES ('42ec8295-94c1-44f0-b081-d5aebb48ac03', 'sarah.ladanaj@gmail.com', '$2a$10$t6IwN53l6QIbjeEGkm/NguVxNKuXuL3ZzTIRs2ePIGKTQ3fLIcTgm');
INSERT INTO user_credential (id, username, password) VALUES ('7f69e8f6-2c4e-4eee-9ccb-2d542322c01b', 'kacpermarkiewicz04@gmail.com', '$2a$10$3H3TZ3NVdSVpqCEPiFSIg.jy..0Gzo2uDpsToP/QfIiPxr8IUY2/e');
INSERT INTO user_credential (id, username, password) VALUES ('d7e01928-fb06-4d4b-abd9-913230d4385e', 'niejedrzej6@gmail.com', '$2a$10$PGaRD3ulSpv70PfJPsyUhOd3k4L8woXVTtjE75cYqZgEMF5LkVnpG');
INSERT INTO user_credential (id, username, password) VALUES ('7879afe2-b8a4-4a86-8e9e-fe5ec7290a78', 'borkowskinorbert89@gmail.com', '$2a$10$GKS6/UcyBSCwNEVFR8Q03.9yi4Ry8u/.fde2Iw6aiaCmCgJBxMZFe');
INSERT INTO user_credential (id, username, password) VALUES ('c280ea0d-ae0d-4b6a-a2cd-1c60232832d9', 'oskiborkowski@gmail.com', '$2a$10$miWlnJElYP4LBLT4ycdlWu67xCQEtx3UvngPVtdoyMo/3JFcxtwVe');
INSERT INTO user_credential (id, username, password) VALUES ('f85ccf1f-073d-4530-bf50-ac1c7cbef5cd', 'krumrichtomek@gmail.com', '$2a$10$TSLK4Xh8wM5d8jlncVUaYekSV8jbg86xFXTZgsuNZDzvejGT8TwvG');
INSERT INTO user_credential (id, username, password) VALUES ('57c6283d-0e28-4f68-91e7-8a6bf23537ac', 'gracjankolary@gmail.com', '$2a$10$vtTJzr69BDb0KKeEhMsmYeOVzR74Wq5BayGsFd3xp3nQNCQkukEGO');
INSERT INTO user_credential (id, username, password) VALUES ('2e283a2f-21cf-49f6-84ee-52356c6af89a', '1kacper.czyzewski@gmail.com', '$2a$10$wXlWVhXr.dxrlXf/098wn.vUkid4/91Om3ebG/H5mKI0sd84.TF0K');
INSERT INTO user_credential (id, username, password) VALUES ('e490c2b3-033b-4258-a3f0-cfde1f72ac27', 'w_bryk@o2.pl', '$2a$10$ZDy7HrWz6ZUyWjEEl8/ZTu7OeeaahT30zSLhk.gw7rZO6XFkkyS.O');
INSERT INTO user_credential (id, username, password) VALUES ('7378ddbc-566d-4849-b12c-289126193762', 'mikifidro@gmail.com', '$2a$10$7qkFbj.dhfhaRpyhF31Lh.f6LPIefvhJGQlINTmhe.31dpSt5eqoW');
INSERT INTO user_credential (id, username, password) VALUES ('a4544b12-6035-4fb2-b5d4-c15b32973937', 'p.wisniewska123@gmail.com', '$2a$10$6yvSfyQC5HcFvawsYSxU6.4WrvEEeFYHmq8Xf7Ol9gSzxnq42piri');
INSERT INTO user_credential (id, username, password) VALUES ('817897a2-2f99-47b6-b084-a9798a889f73', 'eryklewanda@wp.pl', '$2a$10$4isoNU5uFyjpaAhAHVGWqulBAlzwqrg1Hzb49N4FSp7b8WMC95sAu');
INSERT INTO user_credential (id, username, password) VALUES ('2a96367b-5f39-4041-b31d-953283b649ca', 'julkazielinka1@gmail.com', '$2a$10$l913VoSwnfW3mU/wtzCXquB1W55JSekBHFSdxJZ10197ZJ0j8Jp9i');
INSERT INTO user_credential (id, username, password) VALUES ('e86e2e6a-9995-4281-8288-cf8803024636', 'wojtekzolkos@gmail.com', '$2a$10$7Cs3GL1TmZzzm0mSlBVP7eTagPaNcDcvbX9pcATgRD/tnfaJX0F8i');
INSERT INTO user_credential (id, username, password) VALUES ('8cf24fa4-d2f5-4ac4-959b-7e2783231b69', 'dzuzia1@wp.pl', '$2a$10$6PUKAARKj3vN8PUSeaE65upwmj.U2H5pEK9gotmTYezfDdGUMiQKO');
INSERT INTO user_credential (id, username, password) VALUES ('f0efeeb1-990e-4a73-ba65-5ff827c7efc9', 'kamiltomczak212@gmail.com', '$2a$10$VwkhedZB3.EkIY5JpGzudOxw7owSpoDlPbx9fkoGNrUviUeQKFM6q');
INSERT INTO user_credential (id, username, password) VALUES ('69a2e053-9e67-4f09-aa87-689fa0b100e8', 'nikola.blaszczak@o2.pl', '$2a$10$lWNG9zoxAamzY.uNJz0Q5uCNkMfCFgWUlOmuseE2Z9adKW4Vkiq0m');
INSERT INTO user_credential (id, username, password) VALUES ('11632426-44a0-41c0-acdd-8e78c47629cd', 'olka.serocka@gmail.com', '$2a$10$3E7COlE1dpocbZptx/4G/uAjDPk8sg21.ArH087ZwxYMs/5q2Bmjq');
INSERT INTO user_credential (id, username, password) VALUES ('9a698113-6719-4e4c-bcde-9f2f587ca06e', 'bartek.macioszek@wp.pl', '$2a$10$WRim1TV/DqQtJFeGG6g5keYCYnBiGGqdpZyXT4Mltv7v6lNPhAy/W');
INSERT INTO user_credential (id, username, password) VALUES ('65ed72bc-e2be-43ed-907a-afd46f57ae66', 'klaudia.baraniecka@onet.pl', '$2a$10$ViJOK8Ehk.I6dMFbzENukuAXhtFEZYNTgAu3l1V9qpi3H6s83uegW');
INSERT INTO user_credential (id, username, password) VALUES ('8baff0fb-51d5-43f5-a6e0-275d794e5799', '2000nowakmat@gmail.com', '$2a$10$65U8EcXBIXxqvx.Hw8.PZO.C.J11Gr9aAUaTcR/HPFpXU3Adb1aCC');
INSERT INTO user_credential (id, username, password) VALUES ('cbb217c3-92de-47e4-9c7c-c35a91773030', 'yookzsbusiness@gmail.com', '$2a$10$3KZKeNowSZSB3FyUycb0nufgGUFnSFyRDaEvIOjGAauvsJcRR0oG6');
INSERT INTO user_credential (id, username, password) VALUES ('6a4a4ee6-a8c0-41a9-8dba-65bb371748ae', 'przybylskimiki@gmail.com', '$2a$10$YckZNGzBx7UoZdVGXBIXWurEwGtBg34GDr7d2.cd0UQXRWbagMhb2');
INSERT INTO user_credential (id, username, password) VALUES ('2d54c438-451f-434a-9bb9-a58b136ae03b', 'marcinkowska.g@o2.pl', '$2a$10$01n3BIicG3FZxfTzsv7ES.yhmfYSl6Uh7MpWzztRvDxzKRAM5qw1S');
INSERT INTO user_credential (id, username, password) VALUES ('4a9c6c93-8f3d-4899-a61e-7b018bd93681', 'kacperwdzieczny660@gmail.com', '$2a$10$6x7LBoT4pZI/yUq5Hw1.TeS7EzsADmV9xg9lb7ZtdKekWgUuDYDJK');
INSERT INTO user_credential (id, username, password) VALUES ('d1e9cf41-8f3d-4899-a61e-7bcbeab01297', 'rob.ligman@gmail.com', '$2a$10$x3/RN8sjbaupZ/SLZxBOruk41PBrIHKCtZATnUIdruQjPyqoagJVu');
INSERT INTO user_credential (id, username, password) VALUES ('d1e9cf41-a8c0-41a9-8dba-65cbeab01297', 'piotr@amer-event.pl', '$2a$10$x3/RN8sjbaupZ/SLZxBOruk41PBrIHKCtZATnUIdruQjPyqoagJVu');
INSERT INTO user_credential (id, username, password) VALUES ('d1e9cf41-e2be-43ed-907a-afcbeab01297', 'michal@amer-event.pl', '$2a$10$x3/RN8sjbaupZ/SLZxBOruk41PBrIHKCtZATnUIdruQjPyqoagJVu');
INSERT INTO user_credential (id, username, password) VALUES ('d1e9cf41-44a0-41c0-acdd-8ecbeab01297', 'michalina@amer-event.pl', '$2a$10$x3/RN8sjbaupZ/SLZxBOruk41PBrIHKCtZATnUIdruQjPyqoagJVu');

INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('ece1ee25-de46-49a2-8344-bee62a1b7b72', 'Robert', 'Ligman', true, '783312663', '1995-02-09', 'd1e9cf41-3a23-49e4-a047-edcbeab01297');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('e66dc33a-ec2a-4890-bbc5-75d979716310', 'Weronika', 'Otlewska', true, '793853173', '2004-02-07', '360f5642-7874-4c61-bae0-30708a741cf9');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('ea6d6ebc-d90e-44e8-a9a7-649ca6e6e591', 'Daria', 'Wilińska', true, '603336704', '1999-01-08', '1e6fe1f6-f47c-4704-adcd-eddb580a2e4a');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('5c17e69b-4bad-4381-94be-67907a91efc9', 'Remigiusz', 'Mrozowicz', false, '690066334', '2006-12-16', '4eb32aad-9835-4068-a783-9a57536e3103');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('bf7e0779-73a9-4afb-af85-a0e61ca153c4', 'Jan', 'Rosin', true, '503079217', '2004-01-01', '8048823f-b8c9-42e4-80bf-a24ed4b9f8e2');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('21774049-2101-4d15-9522-88a59dfa19c6', 'Martyna', 'Chabecka', false, '790346565', '2003-12-26', '29cc7def-9130-48a2-a202-281946cf36f8');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('59d469e8-309e-445b-aa64-808fca80eb83', 'Sarah', 'ładanaj', false, '794008054', '2003-03-12', '42ec8295-94c1-44f0-b081-d5aebb48ac03');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('f6512780-e9b4-4ab1-937f-43dc27415d0c', 'Kacper', 'Markiewicz', true, '693018505', '2004-03-19', '7f69e8f6-2c4e-4eee-9ccb-2d542322c01b');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('9285812a-7c8a-46b2-9ad9-a32f56d3e478', 'Jędrzej', 'Niepokój', false, '518111812', '2005-06-07', 'd7e01928-fb06-4d4b-abd9-913230d4385e');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('34e69d1d-cd1c-42dc-a1e9-33a72a85754e', 'Norbert', 'Borkowski', true, '572245506', '2006-01-02', '7879afe2-b8a4-4a86-8e9e-fe5ec7290a78');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('28f32458-be27-4eff-a786-f1636bb28768', 'Oskar', 'Borkowski', false, '572245504', '2003-06-20', 'c280ea0d-ae0d-4b6a-a2cd-1c60232832d9');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('139d647b-56ec-4b00-92e4-214b64c2da0b', 'Tomasz', 'Krumrich', false, '514383810', '2004-07-03', 'f85ccf1f-073d-4530-bf50-ac1c7cbef5cd');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('9f704b5f-ea47-48e9-84df-4fd1f963cd2e', 'Gracjan', 'Kolary', false, '574173833', '2008-09-21', '57c6283d-0e28-4f68-91e7-8a6bf23537ac');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('e208ab5a-40ac-49df-b43c-8db18519d73b', 'Kacper', 'Czyżewski', false, '666927553', '2008-06-27', '2e283a2f-21cf-49f6-84ee-52356c6af89a');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('18ce9d4c-6365-4c6f-9892-a1f9f3c04be5', 'Weronika', 'Bryk', false, '790729702', '2004-01-01', 'e490c2b3-033b-4258-a3f0-cfde1f72ac27');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('20e11593-1c07-4397-9d82-84153ce4be31', 'Mikołaj', 'Fiedorowicz', true, '507208480', '2005-05-22', '7378ddbc-566d-4849-b12c-289126193762');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('30d1c11d-7333-4665-b7c5-8c9f9b16bd66', 'Pola', 'Wiśniewska', false, '577403666', '2009-05-11', 'a4544b12-6035-4fb2-b5d4-c15b32973937');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('4785b1af-bff3-4acd-b65e-11bd87efd159', 'Eryk', 'Lewandowski', true, '506726277', '2002-04-12', '817897a2-2f99-47b6-b084-a9798a889f73');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('92bf5f46-ce8d-44f3-9185-4d549bd99911', 'Julia', 'Zielińska', false, '530008852', '2005-08-16', '2a96367b-5f39-4041-b31d-953283b649ca');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('b76e8921-27bb-44fa-9b04-88a987d33564', 'Wojciech', 'Żółkoś', false, '576877007', '2005-04-27', 'e86e2e6a-9995-4281-8288-cf8803024636');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('54c1a308-3ed5-40d4-bd34-ca58dc80bfcd', 'Zuzanna', 'Woźniak', false, '608143464', '2003-05-22', '8cf24fa4-d2f5-4ac4-959b-7e2783231b69');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('361d36ba-a9d3-45b1-b8eb-63715fcf3554', 'Kamil', 'Tomczak', true, '535577255', '2004-03-11', 'f0efeeb1-990e-4a73-ba65-5ff827c7efc9');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('816a4392-71de-402b-a592-1ff592412a2b', 'Nikola', 'Błaszczak', false, '691227355', '2004-08-14', '69a2e053-9e67-4f09-aa87-689fa0b100e8');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('18bef224-8208-4152-8091-c14711442152', 'Aleksandra', 'Serocka', true, '782100531', '2003-12-16', '11632426-44a0-41c0-acdd-8e78c47629cd');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('a7dd1e4f-0680-4f24-af53-9cc22f0b7aaa', 'Bartek', 'Macioszek', true, '531080061', '1998-04-06', '9a698113-6719-4e4c-bcde-9f2f587ca06e');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('f300a69a-a140-4adc-8546-06bbaa3b0cb7', 'Klaudia', 'Baraniecka', true, '794719483', '1996-09-17', '65ed72bc-e2be-43ed-907a-afd46f57ae66');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('27e46afd-86db-4b7a-8e1a-66bf2255fce6', 'Mateusz', 'Nowak', false, '739021010', '2005-07-01', '8baff0fb-51d5-43f5-a6e0-275d794e5799');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('aa701d6a-60ce-4d5e-9c35-e37eb60ba6fd', 'Kacper', 'Belt', true, '534823951', '2004-08-12', 'cbb217c3-92de-47e4-9c7c-c35a91773030');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('9995c4fa-c9c4-490b-82a7-535919312d0d', 'Mikołaj', 'Przybylski', false, '571273732', '2005-12-31', '6a4a4ee6-a8c0-41a9-8dba-65bb371748ae');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('361491f3-0989-403b-9cd1-a0cd59a2c253', 'Małgorzata', 'Marcinkowska', false, '535410008', '2005-09-14', '2d54c438-451f-434a-9bb9-a58b136ae03b');
INSERT INTO users (id, first_name, last_name, is_driver, phone_number, date_of_birth, user_credential_id) VALUES ('1672b247-4338-4fb3-90ca-e5cb02f60880', 'Kacper', 'Wdzięczny', false, '530844679', '2008-07-14', '4a9c6c93-8f3d-4899-a61e-7b018bd93681');

INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'rob.ligman@gmail.com'), (select id from roles where name = 'ROLE_ADMIN'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'piotr@amer-event.pl'), (select id from roles where name = 'ROLE_ADMIN'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'michal@amer-event.pl'), (select id from roles where name = 'ROLE_ADMIN'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'michalina@amer-event.pl'), (select id from roles where name = 'ROLE_ADMIN'));

INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'wera.otl@wp.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'd.wilin@wp.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'mrozowicz.remigiusz@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'jan.rosinn@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'martynachabecka@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'sarah.ladanaj@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'kacpermarkiewicz04@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'niejedrzej6@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'borkowskinorbert89@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'oskiborkowski@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'krumrichtomek@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'gracjankolary@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = '1kacper.czyzewski@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'w_bryk@o2.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'mikifidro@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'p.wisniewska123@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'eryklewanda@wp.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'julkazielinka1@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'wojtekzolkos@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'dzuzia1@wp.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'kamiltomczak212@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'nikola.blaszczak@o2.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'olka.serocka@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'bartek.macioszek@wp.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'klaudia.baraniecka@onet.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = '2000nowakmat@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'yookzsbusiness@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'przybylskimiki@gmail.com'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'marcinkowska.g@o2.pl'), (select id from roles where name = 'ROLE_USER'));
INSERT INTO user_credential_role (user_id, role_id) VALUES ((select id from user_credential where username = 'kacperwdzieczny660@gmail.com'), (select id from roles where name = 'ROLE_USER'));

COMMIT;


