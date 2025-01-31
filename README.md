<h1 align="center">Axis</h1>

## 🔍 Summary
Axis is a platform designed to streamline the college application process for students, providing tools for organization, tracking, and preparation. It features a centralized database of colleges, an application tracker, and resources to guide students through the process. The website incorporates notifications for upcoming deadlines and allows for extended functionalities like document uploads, collaboration, and AI-driven tools.

## 🛠️ MVP Features
- **User Registration/Login:** Students can create accounts and log in securely.
- **College Database:** A centralized database of colleges with key details like application deadlines, requirements, and links.
- **Application Tracker:** Students can add colleges to their tracker and monitor the status (e.g., "Not Started," "In Progress," "Submitted").
- **Resource Hub:** Access to articles, FAQs, and links for SAT/ACT prep, essay writing tips, scholarships, etc.
- **Notification System:** Notify students of upcoming deadlines or changes in their application tracker.
- **Collaboration Features:** Allow mentors or parents to view application progress and provide feedback.
- **AI Essay Reviewer:** Use AI to provide feedback on essays.

## 🚀 Stretch Goal Features
- **Document Upload:** Students can upload required documents (e.g., transcripts, essays) and associate them with specific colleges.
- **Recommendation Letter Manager:** Enable students to request, track, and send recommendation letters.
- **Integration with College APIs:** Pull real-time data on deadlines and requirements from college APIs.
- **Custom Dashboards:** Personalized dashboards showing key stats like deadlines, tasks, and completed steps.
- **Mobile App:** Create a mobile version of the platform for ease of use.

## 📅 Timeline (10-Week Plan)

| 🏁 Week | 📌 Task |
|------|------|
| 1 | Define project scope, assign team roles, and research college application workflows. |
| 2 | Set up repositories, design wireframes, and finalize the tech stack. |
| 3 | Set up the backend with Spring Boot and database schema in MySQL. |
| 4 | Develop user authentication and integrate a basic college database. |
| 5 | Implement the application tracker with CRUD operations. |
| 6 | Develop the resource hub and link it to relevant content. |
| 7 | Integrate the notification system and refine the UI/UX design. |
| 8 | Start implementing stretch goals (begin with document upload and collaboration). |
| 9 | Conduct extensive testing and debugging. |
| 10 | Finalize the app, prepare documentation, and deploy the app on a hosting platform. |

## 💻 Tech Stack
- **Frontend:** Thymeleaf (for dynamic HTML rendering)
- **Backend:** Spring Boot with Maven (Java 21)
- **Database:** MySQL
- **APIs:** REST APIs for data retrieval and notifications
- **Version Control:** GitHub
- **Testing:** JUnit and Postman
- **Deployment:** AWS EC2 or Heroku
- **Notification Service:** Firebase Cloud Messaging or email notifications via SMTP

## 📚 Resources
<details>
  <summary><strong> Spring Boot (Backend Development)</strong></summary>
  <ul>
    <li><a href="https://spring.io/projects/spring-boot">Spring Boot Documentation</a></li>
    <li><a href="https://spring.io/guides">Spring Boot Guides</a></li>
    <li><a href="https://spring.io/guides/gs/securing-web/">Spring Security Guide</a></li>
    <li><a href="https://spring.io/guides/gs/spring-boot">Spring Boot Getting Started Guide</a></li>
  </ul>
</details>

<details>
  <summary><strong> Thymeleaf (Frontend Development)</strong></summary>
  <ul>
    <li><a href="https://www.thymeleaf.org/documentation.html">Thymeleaf Documentation</a></li>
    <li><a href="https://www.baeldung.com/thymeleaf">Thymeleaf Tutorial - Baeldung</a></li>
  </ul>
</details>

<details>
  <summary><strong> MySQL (Database)</strong></summary>
  <ul>
    <li><a href="https://dev.mysql.com/doc/">MySQL Documentation</a></li>
    <li><a href="https://www.w3schools.com/mysql/">MySQL Tutorial - W3Schools</a></li>
  </ul>
</details>

## ⚔️ Competition
- **[ Common App](https://www.commonapp.org/blog/common-app-expands-integration-partnerships)**: Centralized application submission but limited tracking.
- **[Coalition Application](https://partners.commonapp.org/)**: Includes document storage and collaboration but lacks Axis's task management.
- **ApplyTexas:** Primarily for Texas public universities, limited in broader application tracking.
- **Cappex:** College search platform with basic tracking but lacks real-time updates.
- **Naviance:** Focused on academic planning rather than full application management.

## 🚧 Roadblocks and Potential Solutions
### 1️⃣ Spring Boot Setup and Security
**⚠️ Problem:** Initial setup and authentication challenges.
**✅ Solution:** Follow the [Spring Security Guide](https://spring.io/guides/gs/securing-web/) for step-by-step implementation.

### 2️⃣ Thymeleaf Integration
**⚠️ Problem:** Handling dynamic content and forms.
**✅ Solution:** Start with static pages and gradually integrate dynamic content using [Thymeleaf Tutorials](https://www.baeldung.com/thymeleaf).

### 3️⃣ MySQL Database Connection
**⚠️ Problem:** Connection errors between Spring Boot and MySQL.
**✅ Solution:** Double-check connection properties and refer to [MySQL Spring Boot Guide](https://www.baeldung.com/spring-boot-mysql).

### 4️⃣ Deployment Issues
**⚠️ Problem:** Complications with AWS or Heroku deployment.
**✅ Solution:** Follow detailed [Heroku Deployment Tutorial](https://www.baeldung.com/spring-boot-heroku) for a step-by-step guide.
