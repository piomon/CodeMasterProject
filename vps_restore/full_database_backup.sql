--
-- PostgreSQL database dump
--

\restrict PP8J0VlJDKm5rkKtigtfUdMcA40VfsYFYSohRDjfwVrmvayvs3UnB9v9dcx6dHo

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ai_chats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ai_chats (
    id character varying DEFAULT 'gen_random_uuid()'::character varying NOT NULL,
    session_id character varying,
    user_id character varying,
    role character varying NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audit_logs (
    id character varying DEFAULT 'gen_random_uuid()'::character varying NOT NULL,
    actor_id character varying,
    action character varying NOT NULL,
    target_type character varying,
    target_id character varying,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.favorites (
    user_id character varying NOT NULL,
    project_id character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leads (
    id character varying DEFAULT 'gen_random_uuid()'::character varying NOT NULL,
    name text NOT NULL,
    email character varying NOT NULL,
    phone character varying,
    company character varying,
    project_type character varying NOT NULL,
    budget character varying,
    deadline character varying,
    description text NOT NULL,
    status character varying DEFAULT 'new'::character varying NOT NULL,
    notes text,
    priority character varying,
    user_id character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id character varying DEFAULT 'gen_random_uuid()'::character varying NOT NULL,
    name text NOT NULL,
    category character varying NOT NULL,
    industry character varying NOT NULL,
    description text NOT NULL,
    features jsonb NOT NULL,
    status character varying DEFAULT 'demo'::character varying NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    thumbnail_url text,
    demo_url text,
    technologies jsonb DEFAULT '[]'::jsonb NOT NULL,
    sort_order character varying DEFAULT '0'::character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp without time zone NOT NULL
);


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id character varying DEFAULT 'gen_random_uuid()'::character varying NOT NULL,
    key character varying NOT NULL,
    value text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    profile_image_url character varying,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Data for Name: ai_chats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ai_chats (id, session_id, user_id, role, content, created_at) FROM stdin;
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.audit_logs (id, actor_id, action, target_type, target_id, metadata, created_at) FROM stdin;
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.favorites (user_id, project_id, created_at) FROM stdin;
\.


--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.leads (id, name, email, phone, company, project_type, budget, deadline, description, status, notes, priority, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, name, category, industry, description, features, status, featured, thumbnail_url, demo_url, technologies, sort_order, created_at, updated_at) FROM stdin;
a2b809e3-d244-4de6-a924-65f6de55a8fe	Salon Kosmetyczny — Rezerwacje Online	Booking	Beauty	Kompleksowy system rezerwacji online dla salonu kosmetycznego. Klient może samodzielnie rezerwować wizyty, wybierać usługi i stylizacje, a właściciel zarządza kalendarzem i personelem.	["Kalendarz rezerwacji online", "Zarządzanie usługami i cenami", "Panel klienta z historią wizyt", "Powiadomienia SMS/email", "Moduł lojalnościowy"]	demo	t	\N	\N	["React", "Node.js", "PostgreSQL", "SMS API"]	01	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
ea2db976-106c-4bce-8478-cf7065d843b5	Barber/Fryzjer — Kalendarz Wizyt	Booking	Beauty	Aplikacja do zarządzania wizytami w barberze. Stylowy interfejs z możliwością wyboru barbera, rodzaju usługi oraz preferowanego terminu.	["Wybór barbera i usługi", "Kalendarz interaktywny", "Historia wizyt", "Galeria prac", "Oceny i recenzje"]	demo	f	\N	\N	["React", "Express", "Calendar API"]	02	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
66f28b46-dc42-47d5-af7c-056848ddd057	Restauracja — Menu i Zamówienia Online	E-commerce	Food	Cyfrowe menu restauracji z możliwością składania zamówień online. System obsługuje zamówienia na miejscu, na wynos i z dostawą.	["Cyfrowe menu z kategoriami", "Koszyk zakupów", "Zamówienia na wynos / dostawa", "Panel kuchni", "Moduł recenzji"]	demo	f	\N	\N	["React", "Node.js", "Stripe", "Socket.io"]	03	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
6a47b8fd-73a5-475a-a6d8-b418d04b41e7	Hotel/Apartamenty — System Rezerwacji	Booking	Hospitality	Profesjonalny system rezerwacji dla hoteli i apartamentów. Pełne zarządzanie dostępnością pokoi, cenami sezonowymi i obsługą gości.	["Wyszukiwarka pokoi z filtrami", "Rezerwacja z płatnością online", "Panel gościa", "Zarządzanie dostępnością", "Channel manager"]	demo	f	\N	\N	["React", "Node.js", "Stripe", "PostgreSQL"]	04	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
41d53d1c-e008-4c3d-b32f-ec272e91b587	Klinika Medyczna — Panel Pacjenta	Healthcare	Medical	Nowoczesny panel pacjenta dla kliniki medycznej. Rejestracja wizyt online, dostęp do wyników badań i historia leczenia w jednym miejscu.	["Rejestracja wizyt online", "Wyniki badań online", "Historia wizyt i recept", "Teleporada wideo", "Przypomnienia o wizytach"]	demo	t	\N	\N	["React", "Node.js", "PostgreSQL", "WebRTC"]	05	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
36a6b2c9-ff93-422b-bebf-8f8bd577ab34	Siłownia/Fitness — Membership i Grafik	Booking	Fitness	Platforma dla siłowni i klubów fitness. Zarządzanie karnetami, rezerwacja zajęć grupowych i śledzenie postępów treningowych.	["Zarządzanie karnetami", "Rezerwacja zajęć grupowych", "Grafik zajęć", "Dziennik treningów", "Panel instruktora"]	demo	f	\N	\N	["React", "Node.js", "PostgreSQL", "Stripe"]	06	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
f74fdfbd-af4f-4fb7-98c3-a3fccdb50d0f	Sklep Meblowy — Konfigurator Szafy	Configurator	Furniture	Interaktywny konfigurator szafy dla sklepu meblowego. Klient projektuje szafę w 3D, wybierając wymiary, front, kolorystykę i wyposażenie wnętrza.	["Konfigurator 3D w czasie rzeczywistym", "Wybór materiałów i kolorów", "Kalkulator ceny", "Eksport do PDF", "Zamówienie z poziomu konfiguratora"]	demo	t	\N	\N	["React", "Three.js", "Node.js", "PostgreSQL"]	07	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
cf9fd01e-671e-4539-a177-e8be8ec78fb1	Kuchnie na Wymiar — Konfigurator Projektu	Configurator	Kitchen	Konfigurator mebli kuchennych na wymiar. Projektuj kuchnię marzeń dobierając layout, fronty, blaty, sprzęt AGD i kolorystykę.	["Wizard konfiguracji krok po kroku", "Podgląd wizualizacji", "Dobór sprzętu AGD", "Wycena automatyczna", "Formularz zapytania"]	demo	f	\N	\N	["React", "Canvas API", "Node.js"]	08	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
1a4eb102-3c72-415d-b8bb-dfdf06c1a6ba	Deweloper Nieruchomości — Katalog Inwestycji	Real Estate	Construction	Interaktywny katalog inwestycji deweloperskich. Przeglądaj dostępne lokale, filtruj po parametrach i umów się na prezentację.	["Interaktywna mapa inwestycji", "Filtrowanie lokali wg parametrów", "Wizualizacje 3D", "Formularz zapytania", "Panel klienta"]	demo	f	\N	\N	["React", "Mapbox", "Node.js", "PostgreSQL"]	09	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
f3306b63-05d8-4f5d-a0b0-57ac595ebbee	Biuro Rachunkowe — Panel Klienta	Client Portal	Finance	Bezpieczny panel klienta dla biura rachunkowego. Bezproblemowa wymiana dokumentów, komunikacja i dostęp do raportów finansowych.	["Wymiana dokumentów online", "Statusy rozliczeń", "Komunikator z księgowym", "Archiwum dokumentów", "Eksport raportów"]	demo	f	\N	\N	["React", "Node.js", "PostgreSQL", "AWS S3"]	10	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
dbf85476-ea9f-4264-bb0a-be94906a8579	Kancelaria Prawna — Leady i Konsultacje	Lead Management	Legal	System zarządzania leadami i konsultacjami dla kancelarii prawnej. Przyjmuj zgłoszenia, kwalifikuj klientów i zarządzaj sprawami.	["Formularz zgłoszenia sprawy", "Kwalifikacja leadów", "Panel spraw i dokumentów", "Komunikacja z klientem", "Fakturowanie"]	demo	f	\N	\N	["React", "Node.js", "PostgreSQL"]	11	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
cf1aeafc-0a2e-451f-aa4b-916ee10ca939	Agencja Marketingowa — Panel Raportów	Dashboard	Marketing	Dashboard raportów marketingowych dla agencji. Wizualizuj wyniki kampanii, śledź KPIs i przygotowuj raporty dla klientów automatycznie.	["Dashboard KPIs w czasie rzeczywistym", "Integracje z Google/Meta Ads", "Automatyczne raporty", "Porównanie kampanii", "Alerty i powiadomienia"]	demo	f	\N	\N	["React", "Recharts", "Node.js", "Google API"]	12	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
32b2a37f-d7ed-4d16-af93-2d064e27daf3	Szkoła Online — Kursy i Konto	E-learning	Education	Platforma e-learningowa dla szkół i kursów online. Sprzedawaj kursy, prowadź lekcje wideo i śledź postępy uczniów.	["Kursy wideo z quizami", "Certyfikaty ukończenia", "Forum dyskusyjne", "Panel postępów", "Płatności Stripe"]	demo	f	\N	\N	["React", "Node.js", "PostgreSQL", "Stripe", "AWS S3"]	13	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
c62357e1-d4ed-4a18-95b4-a5f03401afe7	E-learning/Mentoring — Strefa Premium	E-learning	Education	Platforma mentoringowa ze strefą premium. Rezerwuj sesje 1:1 z mentorem, korzystaj z ekskluzywnych materiałów i społeczności.	["Rezerwacja sesji mentoringowych", "Strefa premium z materiałami", "Społeczność zamknięta", "Śledzenie postępów", "Integracja z Calendly"]	demo	f	\N	\N	["React", "Node.js", "PostgreSQL", "Stripe"]	14	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
e747069d-fa70-4fba-a984-8755b15bcdfe	Portal Eventowy — Bilety i Harmonogram	Events	Entertainment	Platforma sprzedaży biletów i zarządzania harmonogramem wydarzeń. Organizuj konferencje, koncerty i warsztaty z pełną obsługą uczestników.	["Sprzedaż biletów online", "Kody QR do wejścia", "Harmonogram prelegentów", "Mapa miejsca", "Aplikacja mobilna dla uczestników"]	demo	f	\N	\N	["React", "Node.js", "Stripe", "QR Code API"]	15	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
a005da37-66da-4034-8bb1-c75d3c1ba14a	Wypożyczalnia Aut — Rezerwacje i Flota	Booking	Automotive	System zarządzania flotą i rezerwacjami dla wypożyczalni samochodów. Pełna obsługa klienta od rezerwacji po zwrot pojazdu.	["Katalog pojazdów z filtrowaniem", "Rezerwacja online z płatnością", "Zarządzanie flotą", "Umowy online", "Panel kierowcy"]	demo	f	\N	\N	["React", "Node.js", "PostgreSQL", "Stripe"]	16	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
7944a3d3-c352-4747-a7f1-b07819634cd0	Serwis Komputerowy — Zgłoszenia Napraw	Service Management	IT	System obsługi zgłoszeń serwisowych dla serwisu komputerowego. Klient śledzi status naprawy online, a technik zarządza zleceniami.	["Formularz zgłoszenia usterki", "Śledzenie statusu naprawy", "Wycena online", "Historia napraw", "Panel technika"]	demo	f	\N	\N	["React", "Node.js", "PostgreSQL", "SMS API"]	17	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
029711d7-bb83-4473-8da1-ff92581f8855	Firma Budowlana — Kalkulator Wyceny	Calculator	Construction	Interaktywny kalkulator wyceny prac budowlanych. Klient sam konfiguruje zakres prac i otrzymuje szacunkową wycenę natychmiast.	["Kalkulator robocizny i materiałów", "Konfigurator zakresu prac", "Wycena w czasie rzeczywistym", "Eksport do PDF", "Formularz zapytania"]	demo	f	\N	\N	["React", "Node.js", "PDF Generator"]	18	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
adc57be0-16dd-4024-b5e8-e332d243b5b4	E-commerce Premium — Landing i Checkout	E-commerce	Retail	Premium sklep e-commerce z dopracowanym landing page i procesem zakupowym. Maksymalna konwersja dzięki UX opartemu na danych.	["Landing page sprzedażowy", "Koszyk z upsell", "Checkout jednoetapowy", "Program lojalnościowy", "Dashboard sprzedaży"]	demo	t	\N	\N	["React", "Node.js", "Stripe", "PostgreSQL"]	19	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
7ada54d4-fffb-48b1-945c-b6eadb189d1f	AI Business Assistant — Chatbot + Lead Scoring	AI	Business	Inteligentny asystent biznesowy z AI. Chatbot kwalifikuje leady, odpowiada na pytania klientów 24/7 i automatyzuje procesy sprzedażowe.	["Chatbot AI sprzedażowy", "Automatyczny lead scoring", "Integracja z CRM", "Analityka rozmów", "Wielojęzyczność"]	demo	t	\N	\N	["React", "Node.js", "OpenAI API", "PostgreSQL"]	20	2026-03-31 08:54:02.070258+00	2026-03-31 08:54:02.070258+00
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (sid, sess, expire) FROM stdin;
6167fb9ba572d5b6a0b8e418e024eb6bbcdc2077f4a971e16e89877130e45112	{"user": {"id": "56748329", "email": "MPULUUAA@filmyhunt.xyz", "lastName": "safds", "firstName": "petr", "profileImageUrl": null}, "expires_at": 1778594351, "access_token": "1CqCM9ozHFpBBNKRvbCAIq9HXiV7eiBeTCPVKsgEXZG", "refresh_token": "YOR698seflhIr89lJQshxqi4d78K8PYk4qKjEuDtNCR"}	2026-05-19 12:59:11.221
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.site_settings (id, key, value, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, first_name, last_name, profile_image_url, role, created_at, updated_at) FROM stdin;
56748329	MPULUUAA@filmyhunt.xyz	petr	safds	\N	user	2026-05-12 10:07:31.948243+00	2026-05-12 10:07:31.948243+00
\.


--
-- Name: ai_chats ai_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ai_chats
    ADD CONSTRAINT ai_chats_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_user_id_project_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_project_id_pk PRIMARY KEY (user_id, project_id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: site_settings site_settings_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_unique UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- PostgreSQL database dump complete
--

\unrestrict PP8J0VlJDKm5rkKtigtfUdMcA40VfsYFYSohRDjfwVrmvayvs3UnB9v9dcx6dHo

