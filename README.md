<p align="center">
  <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fsearch%2Fcollege-gifs&psig=AOvVaw0sCcNjmzUP1U8JvJsQRzhZ&ust=1738432045598000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKijyZfCoIsDFQAAAAAdAAAAABAR" alt="gif">
</p>

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
  <summary><strong> Spring Boot (Backend Development) </strong></summary>
  <ul>
    <li><a href="https://spring.io/projects/spring-boot">Spring Boot Documentation</a></li>
    <li><a href="https://spring.io/guides">Spring Boot Guides</a></li>
    <li><a href="https://spring.io/guides/gs/securing-web/">Spring Security Guide</a></li>
  </ul>
</details>

<details>
  <summary><strong> Thymeleaf (Frontend Development) </strong></summary>
  <ul>
    <li><a href="https://www.thymeleaf.org/documentation.html">Thymeleaf Documentation</a></li>
    <li><a href="https://www.baeldung.com/thymeleaf">Thymeleaf Tutorial - Baeldung</a></li>
  </ul>
</details>

<details>
  <summary><strong> MySQL (Database) </strong></summary>
  <ul>
    <li><a href="https://dev.mysql.com/doc/">MySQL Documentation</a></li>
    <li><a href="https://www.w3schools.com/mysql/">MySQL Tutorial - W3Schools</a></li>
  </ul>
</details>

<details>
  <summary><strong> REST APIs </strong></summary>
  <ul>
    <li><a href="https://www.baeldung.com/spring-boot-rest-api">Baeldung Spring Boot REST API</a></li>
    <li><a href="https://learning.postman.com/docs/getting-started/introduction/">Postman Documentation</a></li>
  </ul>
</details>

<details>
  <summary><strong> Firebase Cloud Messaging (Notifications) </strong></summary>
  <ul>
    <li><a href="https://firebase.google.com/docs/cloud-messaging">Firebase Cloud Messaging Docs</a></li>
    <li><a href="https://www.freecodecamp.org/news/how-to-send-web-push-notifications-from-your-web-app-with-firebase/">Firebase Push Notification Tutorial</a></li>
  </ul>
</details>

<details>
  <summary><strong> JUnit (Testing) </strong></summary>
  <ul>
    <li><a href="https://junit.org/junit5/docs/current/user-guide/">JUnit 5 Documentation</a></li>
    <li><a href="https://www.baeldung.com/junit-5">JUnit 5 Tutorial - Baeldung</a></li>
  </ul>
</details>

<details>
  <summary><strong> Hosting and Deployment </strong></summary>
  <ul>
    <li><a href="https://docs.aws.amazon.com/ec2/">Amazon EC2 Documentation</a></li>
    <li><a href="https://aws.amazon.com/ec2/getting-started/">EC2 Launch Guide</a></li>
    <li><a href="https://devcenter.heroku.com/">Heroku Documentation</a></li>
    <li><a href="https://www.baeldung.com/spring-boot-heroku">Deploy Spring Boot to Heroku - Baeldung</a></li>
  </ul>
</details>

<details>
  <summary><strong> Version Control (GitHub) </strong></summary>
  <ul>
    <li><a href="https://docs.github.com/en">GitHub Docs</a></li>
    <li><a href="https://git-scm.com/book/en/v2">Git Basics - Git SCM</a></li>
    ### Git Commands

| Command                        | What it does                                |
|--------------------------------|---------------------------------------------|
| `git branch`                   | Lists all the branches                      |
| `git branch "branch name"`     | Creates a new branch                        |
| `git checkout "branch name"`   | Switches to the specified branch            |
| `git checkout -b "branch name"`| Combines branch creation and checkout       |
| `git add .`                    | Stages all changed files                    |
| `git commit -m "Testing123"`   | Commits with a message                      |
| `git push origin "branch"`     | Pushes to the specified branch              |
| `git pull origin "branch"`     | Pulls updates from the specified branch     |

  </ul>
</details>

<details>
  <summary><strong> UI/UX Design (Figma) </strong></summary>
  <ul>
    <li><a href="https://help.figma.com/hc/en-us">Figma Documentation</a></li>
    <li><a href="https://www.youtube.com/c/Figma">Figma Tutorials - YouTube</a></li>
  </ul>
</details>

<details>
  <summary><strong> Build Automation (Maven) </strong></summary>
  <ul>
    <li><a href="https://maven.apache.org/guides/">Maven Documentation</a></li>
    <li><a href="https://www.baeldung.com/maven">Maven Tutorial - Baeldung</a></li>
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

## 📈 The Graph

- **X-Axis** (Project Manager): Shreya S Ramani
- **Y-Axis** (Industry Mentor): 
- **Quadrant 1**:  (Frontend)
- **Quadrant 2**:  (Backend)
- **Quadrant 3**:  (Frontend)
- **Quadrant 4**:  (Backend)

