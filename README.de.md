# Prestige Cuts baber shop booking app

## Projektübersicht

**Beschreibung**: Dies ist eine Terminbuchungsanwendung, die ich für einen Barber Shop erstellt habe. Die Anwendung ermöglicht es den Kunden, online einen Termin zu buchen und dem Barber Shop eine Nachricht zu senden. Die Besucher können individuell auswählen, wann, bei wem und welche Dienstleistung sie in Anspruch nehmen möchten. Das Projekt enthält auch einen globalen Fehler-Handler auf der Back-End-Seite, der bei serverseitigen Fehlern automatisch eine E-Mail an den Entwickler sendet. Darüber hinaus gibt es ein tägliches Buchungslimit, das die Buchungen zählt, sowie eine Funktion, die Buchungen 5 Tage nach dem gebuchten Datum automatisch löscht. Die Eingabedaten sind gegen XSS-Angriffe geschützt.

## Ziel

Ziel des Projekts ist es, ein Online-Terminbuchungssystem zu schaffen, das den Kunden des Barber Shops die Buchung erleichtert und die Kommunikation zwischen dem Geschäft und den Kunden vereinfacht. Das Projekt verbessert außerdem das Kundenerlebnis durch eine moderne, einfach zu bedienende Online-Oberfläche und sorgt für effizientes Fehlermanagement sowie eine sichere Datenverarbeitung.

## Hauptfunktionen

- **Terminbuchung**: Benutzerfreundlicher Kalender, über den Kunden leicht einen Termin buchen können.
- **Dienstleistungsauswahl**: Kunden können aus verschiedenen Dienstleistungen wählen, wie z.B. Haarschnitt, Bartpflege usw.
- **Datenverwaltung**: Die Namen, E-Mail-Adressen, Telefonnummern und Buchungsdaten der Nutzer werden gespeichert.
- **Kontaktaufnahme**: Besucher können über das Kontaktformular auf der Website eine Nachricht an den Barber Shop senden.
- **Globales Fehlermanagement**: Bei serverseitigen Fehlern sendet das System automatisch eine E-Mail an den Entwickler.
- **Tägliches Buchungslimit**: Zählt die Buchungen, um die tägliche Aktivität zu verfolgen.
- **Automatisches Löschen**: Buchungen werden 5 Tage nach dem gebuchten Datum automatisch gelöscht.
- **XSS-Schutz**: Die Buchungsdaten sind gegen XSS-Angriffe geschützt.

## Technologien

- **Google-Recaptcha**: Zum Schutz vor Spam und automatisierten Anfragen.
- **ZOD**: Für die Validierung der Benutzereingaben.
- **React Query**: Für die Datenverwaltung und das Caching.
- **React Router V6**: Für die Navigation innerhalb der Anwendung.
- **VITE**: Zum schnellen Aufbau und Entwicklung der Anwendung.
- **nodemon**: Für die automatische Neustarts des Servers während der Entwicklung.
- **nodemailer**: Für das Versenden von E-Mails aus der Anwendung heraus.
- **node-schedule**: Für die Planung und Ausführung von zeitgesteuerten Aufgaben.

- **React**: Für den Aufbau der Benutzeroberfläche der Anwendung.
- **Typescript**: Für Typsicherheit und bessere Wartbarkeit.
- **TailwindCSS, SCSS, Material UI**: Zur Vereinfachung des Stylings und schnellen Gestaltung.
- **Node.js und Express**: Für die Backend-Kommunikation.
- **Firebase**: Firestore zur Datenbankverwaltung, Storage für Dateispeicherung, App Check für die Sicherheit, Cloud Functions für Backend-Funktionen sowie Hosting für die Bereitstellung der Demo.

## Nutzung

In der Anwendung können die Nutzer einen Termin buchen, die erforderlichen Daten angeben (Name, E-Mail, Telefonnummer) und nach dem Absenden eine Bestätigung erhalten. Darüber hinaus können die Besucher über das Kontaktformular auf der Website mit dem Barber Shop in Kontakt treten.

## Geplante Entwicklungen

- **Authentifizierung und Admin-Oberfläche**: Entwicklung einer Admin-Oberfläche mit Authentifizierung zur sicheren Verwaltung der Anwendung.
- **Webshop-Integration**: Einführung eines Webshop-Moduls innerhalb der Anwendung, um zusätzliche Produkte und Dienstleistungen anzubieten.

## Beitrag

Wenn du interessiert bist, das Projekt weiterzuentwickeln oder Fehler zu beheben, freue ich mich über Pull Requests oder das Öffnen von Issues.

## Demo

Die Demo-Version der Anwendung ist unter folgendem Link verfügbar: [Barber Shop Booking App Demo](https://barber-shop-fc206.web.app)


