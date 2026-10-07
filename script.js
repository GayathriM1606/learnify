/* =========================================================
   LEARNIFY LMS - SCRIPT
   ========================================================= */

/* ================= SAMPLE DATA ================= */

const courses = [
  {
    id: 1,
    title: "Complete Web Development",
    category: "Development",
    level: "Beginner",
    rating: 4.7,
    price: 499,
    instructor: "Girija",
    overview:
      "Learn HTML, CSS, JavaScript and build real projects from scratch.",
    syllabus: [
      "Introduction to HTML/CSS",
      "JavaScript Fundamentals",
      "Responsive Design",
      "Final Project"
    ],
    reviews: [
      { name: "Sneha", text: "Great course for beginners!", rating: 5 },
      { name: "Amit", text: "Clear explanations.", rating: 4 }
    ]
  },
  {
    id: 2,
    title: "Python for Beginners",
    category: "Development",
    level: "Beginner",
    rating: 4.6,
    price: 699,
    instructor: "Nishanthini",
    overview: "A friendly introduction to Python programming.",
    syllabus: [
      "Python Basics",
      "Loops & Functions",
      "Data Structures",
      "Mini Projects"
    ],
    reviews: [
      { name: "Vikram", text: "Very well structured.", rating: 5 }
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    level: "Beginner",
    rating: 4.8,
    price: "free", 
    instructor: "Dharshini",
    overview:
      "Master design principles, wireframing, and prototyping with Figma.",
    syllabus: [
      "Design Thinking",
      "Wireframing",
      "Prototyping in Figma",
      "Usability Testing"
    ],
    reviews: [
      { name: "Karan", text: "Loved the practical exercises.", rating: 5 }
    ]
  },
  {
    id: 4,
    title: "Data Science Essentials",
    category: "Data",
    level: "Intermediate",
    rating: 4.5,
    price: 599,
    instructor: "Harini",
    overview:
      "Statistics, Python for data analysis, and intro to machine learning.",
    syllabus: [
      "Statistics Basics",
      "Pandas & NumPy",
      "Data Visualization",
      "Intro to ML"
    ],
    reviews: [
      { name: "Divya", text: "Challenging but rewarding.", rating: 4 }
    ]
  },
  {
    id: 5,
    title: "Digital Marketing Mastery",
    category: "Marketing",
    level: "Beginner",
    rating: 4.4,
    price: 499,
    instructor: "Sowmiya",
    overview:
      "SEO, social media marketing, and ad campaigns explained simply.",
    syllabus: [
      "SEO Basics",
      "Social Media Ads",
      "Email Marketing",
      "Analytics"
    ],
    reviews: [
      { name: "Rohit", text: "Practical and to the point.", rating: 4 }
    ]
  },
  {
    id: 6,
    title: "Mobile App Development",
    category: "Development",
    level: "Advanced",
    rating: 4.9,
    price: 899,
    instructor: "Monisha",
    overview:
      "Build cross-platform mobile apps using modern frameworks.",
    syllabus: [
      "App Architecture",
      "UI Components",
      "State Management",
      "Deployment"
    ],
    reviews: [
      { name: "Neha", text: "Best advanced course I've taken.", rating: 5 }
    ]
  }
];

const mentors = [
  { name: "Gayathri M", role: "Web Development Lead" },
  { name: "Harini S", role: "UX Design Mentor" },
  { name: "Bhuvaneshwari K", role: "Data Science Mentor" }
];

const stories = [
  {
    name: "Durgailakshmi P",
    text: "Landed my first developer job after finishing the Web Dev course!"
  },
  {
    name: "Vikram S.",
    text: "Learnify's Python course gave me confidence to switch careers."
  }
];

/* ================= STATE ================= */

function getUser() {
  return JSON.parse(localStorage.getItem("learnify_user") || "null");
}

function setUser(user) {
  localStorage.setItem("learnify_user", JSON.stringify(user));
}

function getEnrolled() {
  const user = getUser();

  if (!user) return [];

  return JSON.parse(
    localStorage.getItem(`learnify_enrolled_${user.email}`) || "[]"
  );
}

function setEnrolled(arr) {
  const user = getUser();

  if (!user) return;

  localStorage.setItem(
    `learnify_enrolled_${user.email}`,
    JSON.stringify(arr)
  );
}
function getWishlist() {
  return JSON.parse(localStorage.getItem("learnify_wishlist") || "[]");
}

function setWishlist(arr) {
  localStorage.setItem("learnify_wishlist", JSON.stringify(arr));
}

function getCerts() {
  return JSON.parse(localStorage.getItem("learnify_certs") || "[]");
}

function setCerts(arr) {
  localStorage.setItem("learnify_certs", JSON.stringify(arr));
}

let currentCourseId = null;
let pendingAuthAction = null;

/* ================= SPLASH ================= */

window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    const app = document.getElementById("app");

    if (splash) splash.classList.add("hidden");
    if (app) app.classList.remove("hidden");

    initApp();
  }, 1200);
});

/* ================= INITIALIZE ================= */

function initApp() {
  refreshAuthUI();

  renderPopularCourses();
  renderAllCourses();
  renderMentorsAndStories();
  renderWishlist();

  /*
    IMPORTANT:
    Your old code used showPage("home"),
    but showPage() did not exist.
    navigateTo() is the correct function.
  */
  navigateTo("home");

  bindNav();
  bindAuth();
  bindCourseFilters();
  bindProfile();
  bindLearningTabs();
}

/* ================= NAVIGATION ================= */

function bindNav() {
  document.querySelectorAll("[data-page]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      const page = element.getAttribute("data-page");
      navigateTo(page);
    });
  });

  const menuToggle = document.getElementById("menuToggle");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.querySelector(".navbar").classList.toggle("menu-open");
    });
  }

  document.getElementById("loginBtn").addEventListener("click", () => {
    openAuth("login");
  });

  document.getElementById("signupBtn").addEventListener("click", () => {
    openAuth("signup");
  });

  document.getElementById("heroCta").addEventListener("click", () => {
    if (getUser()) {
      navigateTo("dashboard");
    } else {
      openAuth("signup");
    }
  });

  document.getElementById("ctaJoin").addEventListener("click", () => {
    if (getUser()) {
      navigateTo("courses");
    } else {
      openAuth("signup");
    }
  });
}

const protectedPages = [
  "learning",
  "dashboard",
  "profile",
  "course-learning"
];

function navigateTo(page) {
  if (protectedPages.includes(page) && !getUser()) {
    pendingAuthAction = page;
    openAuth("login");
    return;
  }

  document.querySelectorAll(".page").forEach((pageElement) => {
    pageElement.classList.remove("active");
  });

  const target = document.getElementById(`page-${page}`);

  if (!target) {
    console.warn(`Page not found: page-${page}`);
    return;
  }

  target.classList.add("active");

  document
    .querySelectorAll(".nav-links button")
    .forEach((button) => button.classList.remove("active"));

  const navButton = document.querySelector(
    `.nav-links button[data-page="${page}"]`
  );

  if (navButton) {
    navButton.classList.add("active");
  }

  if (page === "learning") {
    renderMyCourses();
  }

  if (page === "dashboard") {
    renderDashboard();
  }

  if (page === "profile") {
    renderProfile();
  }

  if (page === "extra-wishlist") {
    renderWishlist();
  }

  document.querySelector(".navbar").classList.remove("menu-open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function openAuth(tab) {
  navigateToAuthPage();
  switchAuthTab(tab);
}

function navigateToAuthPage() {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById("page-auth").classList.add("active");
}

/* ================= AUTH ================= */

function bindAuth() {
  document.querySelectorAll(".auth-tabs .tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      switchAuthTab(button.dataset.authtab);
    });
  });

  /* LOGIN */

  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    setUser({
      name: email.split("@")[0],
      email: email
    });

    afterAuthSuccess();
  });

  /* SIGN UP */

  document.getElementById("signupForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const mobile = document.getElementById("signupMobile").value.trim();

    if (!name || !email || !mobile) {
      alert("Please fill all required fields.");
      return;
    }

    /*
      Demo OTP.
      In a real application this would be sent by a backend.
    */
    const demoOtp = "123456";
    sessionStorage.setItem("learnify_demo_otp", demoOtp);

    alert("Demo OTP: 123456");

    switchAuthTab("verify");
  });

  /* VERIFY */

  document.getElementById("verifyForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const otp = document.getElementById("otpInput").value.trim();
    const correctOtp = sessionStorage.getItem("learnify_demo_otp");

    if (otp !== correctOtp) {
      alert("Invalid OTP. For this demo, use 123456.");
      return;
    }

    const name =
      document.getElementById("signupName").value.trim() || "New User";

    const email =
      document.getElementById("signupEmail").value.trim() ||
      "user@learnify.com";

    setUser({
      name,
      email
    });

    sessionStorage.removeItem("learnify_demo_otp");

    afterAuthSuccess();
  });

  /* FORGOT PASSWORD */

  document.getElementById("forgotLink").addEventListener("click", (event) => {
    event.preventDefault();
    switchAuthTab("forgot");
  });

  document.getElementById("backToLogin").addEventListener("click", (event) => {
    event.preventDefault();
    switchAuthTab("login");
  });

  document.getElementById("forgotForm").addEventListener("submit", (event) => {
    event.preventDefault();

    alert("Password reset link sent to your email. Demo mode.");

    switchAuthTab("login");
  });

  /* LOGOUT */

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("learnify_user");

    refreshAuthUI();
    navigateTo("home");
  });
}

function switchAuthTab(tab) {
  document.querySelectorAll(".auth-form").forEach((form) => {
    form.classList.add("hidden");
  });

  document.querySelectorAll(".auth-tabs .tab-btn").forEach((button) => {
    button.classList.remove("active");
  });

  if (tab === "login") {
    document.getElementById("loginForm").classList.remove("hidden");

    document
      .querySelector('[data-authtab="login"]')
      .classList.add("active");
  }

  if (tab === "signup") {
    document.getElementById("signupForm").classList.remove("hidden");

    document
      .querySelector('[data-authtab="signup"]')
      .classList.add("active");
  }

  if (tab === "forgot") {
    document.getElementById("forgotForm").classList.remove("hidden");
  }

  if (tab === "verify") {
    document.getElementById("verifyForm").classList.remove("hidden");
  }
}

function afterAuthSuccess() {
  refreshAuthUI();

  const destination = pendingAuthAction || "dashboard";

  pendingAuthAction = null;

  navigateTo(destination);
}

function refreshAuthUI() {
  const user = getUser();

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userChip = document.getElementById("userChip");

  if (user) {
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");

    userChip.classList.remove("hidden");

    document.getElementById("userInitial").textContent =
      (user.name || "U").charAt(0).toUpperCase();
  } else {
    loginBtn.classList.remove("hidden");
    signupBtn.classList.remove("hidden");

    userChip.classList.add("hidden");
  }
}

/* ================= COURSE CARDS ================= */

function courseCardHTML(course) {
  return `
    <div class="course-card" data-id="${course.id}">
      <h3>${course.title}</h3>

      <div class="meta">
        ${course.category} • ${course.level} • ⭐ ${course.rating}
      </div>

      <p class="instructor">
        By ${course.instructor}
      </p>

      <div class="price">
        ${String(course.price).toLowerCase() === "free" ? "Free" : `₹ ${course.price}`}
      </div>

      <button class="btn-outline course-view-btn">
        View Course
      </button>
    </div>
  `;
}

function renderPopularCourses() {
  const topCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  document.getElementById("popularCourses").innerHTML =
    topCourses.map(courseCardHTML).join("");

  attachCourseCardClicks("popularCourses");
}

function renderAllCourses(list = courses) {
  const container = document.getElementById("allCourses");

  if (!list.length) {
    container.innerHTML = `
      <p class="muted">
        No courses match your filters.
      </p>
    `;
    return;
  }

  container.innerHTML = list.map(courseCardHTML).join("");

  attachCourseCardClicks("allCourses");
}

function attachCourseCardClicks(containerId) {
  document
    .querySelectorAll(`#${containerId} .course-card`)
    .forEach((card) => {
      card.addEventListener("click", (event) => {
        /*
          Prevent duplicate navigation if the View Course button
          is clicked.
        */
        if (event.target.closest(".course-view-btn")) {
          event.stopPropagation();
        }

        openCourseDetail(Number(card.dataset.id));
      });
    });
}

/* ================= COURSE FILTERS ================= */

function bindCourseFilters() {
  const search = document.getElementById("searchCourses");
  const category = document.getElementById("filterCategory");
  const level = document.getElementById("filterLevel");
  const rating = document.getElementById("filterRating");

  function applyFilters() {
    const searchValue = search.value.toLowerCase().trim();

    const filtered = courses.filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(searchValue) ||
        course.instructor.toLowerCase().includes(searchValue);

      const matchCategory =
        !category.value || course.category === category.value;

      const matchLevel =
        !level.value || course.level === level.value;

      const matchRating =
        !rating.value ||
        course.rating >= parseFloat(rating.value);

      return (
        matchSearch &&
        matchCategory &&
        matchLevel &&
        matchRating
      );
    });

    renderAllCourses(filtered);
  }

  search.addEventListener("input", applyFilters);
  category.addEventListener("change", applyFilters);
  level.addEventListener("change", applyFilters);
  rating.addEventListener("change", applyFilters);
}

/* ================= COURSE DETAIL ================= */

function openCourseDetail(id) {
  currentCourseId = id;

  const course = courses.find((item) => item.id === id);

  if (!course) {
    alert("Course not found.");
    return;
  }

  const enrolled = getEnrolled().includes(id);
  const wishlisted = getWishlist().includes(id);

  document.getElementById("courseDetailContent").innerHTML = `
    <div class="detail-header">

      <div class="detail-info">
        <h1>${course.title}</h1>

        <p class="meta">
          ${course.category} •
          ${course.level} •
          ⭐ ${course.rating} •
          By ${course.instructor}
        </p>

        <p class="detail-overview">
          ${course.overview}
        </p>
      </div>

      <div class="course-purchase">

        <div class="price large-price">
           ₹${course.price}
        </div>

        <button class="btn-solid" id="enrollBtn">
          ${enrolled ? "Go to Course" : "Enroll / Start Course"}
        </button>

        <button
          class="btn-outline"
          id="wishlistBtn"
        >
          ${wishlisted ? "♥ Wishlisted" : "♡ Add to Wishlist"}
        </button>

      </div>

    </div>

    <div class="detail-tabs">

      <button class="active" data-dtab="syllabus">
        Syllabus / Content
      </button>

      <button data-dtab="instructor">
        Instructor Info
      </button>

      <button data-dtab="reviews">
        Reviews & Ratings
      </button>

    </div>

    <div id="detailTabBody"></div>
  `;

  renderDetailTab("syllabus", course);

  document.querySelectorAll("[data-dtab]").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll("[data-dtab]")
        .forEach((item) => item.classList.remove("active"));

      button.classList.add("active");

      renderDetailTab(button.dataset.dtab, course);
    });
  });

  document.getElementById("enrollBtn").addEventListener("click", () => {
    if (!getUser()) {
      pendingAuthAction = "course-learning";
      openAuth("login");
      return;
    }

    const enrolledCourses = getEnrolled();

    if (!enrolledCourses.includes(id)) {
      enrolledCourses.push(id);
      setEnrolled(enrolledCourses);
    }

    openCourseLearning(id);
  });

  document.getElementById("wishlistBtn").addEventListener("click", () => {
    let wishlist = getWishlist();

    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((item) => item !== id);
    } else {
      wishlist.push(id);
    }

    setWishlist(wishlist);

    openCourseDetail(id);
  });

  navigateTo("course-detail");
}

function renderDetailTab(tab, course) {
  const body = document.getElementById("detailTabBody");

  if (tab === "syllabus") {
    body.innerHTML = `
      <div class="syllabus-list">
        ${course.syllabus
          .map(
            (item, index) => `
              <div class="syllabus-item">
                <strong>Lesson ${index + 1}</strong>
                <span>${item}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  if (tab === "instructor") {
    body.innerHTML = `
      <div class="review-card">
        <h3>${course.instructor}</h3>
        <p class="muted">
          Expert instructor with years of industry
          experience in ${course.category}.
        </p>
      </div>
    `;
  }

  if (tab === "reviews") {
    body.innerHTML = course.reviews
      .map(
        (review) => `
          <div class="review-card">
            <strong>${review.name}</strong>
            <span> — ⭐${review.rating}</span>
            <p>${review.text}</p>
          </div>
        `
      )
      .join("");
  }
}

/* ================= MY LEARNING ================= */

function renderMyCourses() {
  const enrolledCourses = getEnrolled()
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);

  const container = document.getElementById("myCoursesList");

  if (!enrolledCourses.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No courses yet</h3>
        <p>
          You haven't enrolled in any course yet.
        </p>

        <button
          class="btn-solid"
          onclick="navigateTo('courses')"
        >
          Explore Courses
        </button>
      </div>
    `;

    return;
  }

  container.innerHTML = enrolledCourses
    .map(
      (course) => `
        <div class="course-card" data-id="${course.id}">
          <h3>${course.title}</h3>

          <div class="meta">
            ${course.category} • ${course.level}
          </div>

          <p class="instructor">
            By ${course.instructor}
          </p>

          <div class="mini-progress">
            <div class="mini-progress-fill"></div>
          </div>

          <p class="progress-label">
            5% completed
          </p>

          <button class="btn-solid">
            Continue Learning
          </button>
        </div>
      `
    )
    .join("");

  /*
    Only one click handler here.
    The old version attached the normal course-detail
    handler and then another learning handler.
  */
  document
    .querySelectorAll("#myCoursesList .course-card")
    .forEach((card) => {
      card.addEventListener("click", () => {
        openCourseLearning(Number(card.dataset.id));
      });
    });
}

/* ================= COURSE LEARNING ================= */

function openCourseLearning(id) {
  if (!getUser()) {
    pendingAuthAction = "course-learning";
    openAuth("login");
    return;
  }

  currentCourseId = id;

  const course = courses.find((item) => item.id === id);

  if (!course) return;

  document.getElementById("courseLearningHeader").innerHTML = `
    <div class="learning-course-header">
      <h2>${course.title}</h2>
      <p class="meta">
        ${course.category} •
        ${course.level} •
        ⭐ ${course.rating}
      </p>
    </div>
  `;

  document
    .querySelectorAll(".learning-tabs .tab-btn")
    .forEach((button) => button.classList.remove("active"));

  const homeTab = document.querySelector(
    '.learning-tabs .tab-btn[data-ltab="home"]'
  );

  if (homeTab) {
    homeTab.classList.add("active");
  }

  renderLearningTab("home", course);

  navigateTo("course-learning");
}

function bindLearningTabs() {
  document
    .querySelectorAll(".learning-tabs .tab-btn")
    .forEach((button) => {
      button.addEventListener("click", () => {
        document
          .querySelectorAll(".learning-tabs .tab-btn")
          .forEach((item) => item.classList.remove("active"));

        button.classList.add("active");

        const course = courses.find(
          (item) => item.id === currentCourseId
        );

        renderLearningTab(button.dataset.ltab, course);
      });
    });
}

function renderLearningTab(tab, course) {
  const body = document.getElementById("learningTabContent");

  if (!course) {
    body.innerHTML = `
      <p class="muted">
        Select a course first.
      </p>
    `;
    return;
  }

  if (tab === "home") {

  const totalLessons = course.syllabus.length;

  let completedLessons =
    JSON.parse(
      localStorage.getItem(`learnify_completed_${course.id}`) || "[]"
    );

  const progress = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  body.innerHTML = `
    <div class="learning-home">

      <h3>Welcome to ${course.title}</h3>

      <p>${course.overview}</p>

      <div class="course-progress-box">

        <div class="progress-header">
          <strong>Your Progress</strong>
          <span>${progress}%</span>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width:${progress}%"
          ></div>
        </div>

      </div>

      <h3>Course Content</h3>

      <div class="lesson-list">

        ${course.syllabus
          .map(
            (lesson, index) => {

              const completed =
                completedLessons.includes(index);

              return `
                <div class="lesson-row">

                  <span>
                    Lesson ${index + 1}
                  </span>

                  <strong>
                    ${lesson}
                  </strong>

                  <button
                    class="btn-solid lesson-complete-btn"
                    data-lesson="${index}"
                  >
                    ${completed ? "✓ Completed" : "Complete"}
                  </button>

                </div>
              `;
            }
          )
          .join("")}

      </div>

    </div>
  `;

  document
    .querySelectorAll(".lesson-complete-btn")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const lessonIndex =
          Number(button.dataset.lesson);

        if (!completedLessons.includes(lessonIndex)) {

          completedLessons.push(lessonIndex);

          localStorage.setItem(
            `learnify_completed_${course.id}`,
            JSON.stringify(completedLessons)
          );

        }

        renderLearningTab("home", course);

      });

    });
}          
  if (tab === "videos") {
    body.innerHTML = `
      <h3>Video Lessons</h3>

      ${course.syllabus
        .map(
          (lesson, index) => `
            <div class="video-lesson-item">
              <span class="play-icon">▶</span>

              <div>
                <strong>
                  Lesson ${index + 1}
                </strong>

                <p>${lesson}</p>
              </div>

              <button
                class="btn-outline"
                onclick="alert('Playing: ${lesson}')"
              >
                Watch
              </button>
            </div>
          `
        )
        .join("")}
    `;
  }

  if (tab === "reading") {
    body.innerHTML = `
      <h3>Reading Materials</h3>

      ${course.syllabus
        .map(
          (lesson, index) => `
            <div class="reading-item">
              <strong>
                📄 Reading ${index + 1}
              </strong>

              <p>
                ${lesson} — Notes & Summary
              </p>
            </div>
          `
        )
        .join("")}
    `;
  }

  if (tab === "quiz") {
    body.innerHTML = `
      <h3>Module 1 Quiz</h3>

      <div class="quiz-question">
        <p>
          <strong>
            1. What is the main focus of this course?
          </strong>
        </p>

        <label>
          <input type="radio" name="q1" value="a">
          to build a app
        </label>

        <label>
          <input type="radio" name="q1" value="b">
          to get good marks
        </label>

        <label>
          <input type="radio" name="q1" value="c">
          to gain knowledge
        </label>
      </div>

      <button
        class="btn-solid"
        id="submitQuizBtn"
      >
        Submit Quiz
      </button>
    `;

    document
      .getElementById("submitQuizBtn")
      .addEventListener("click", () => {
        alert("Quiz submitted! Score: 8/10 (demo)");
      });
  }

  if (tab === "forum") {
    body.innerHTML = `
      <h3>Course Discussion</h3>

      <div class="forum-post">
        <strong>Student1:</strong>
        Great explanation in lesson 2!
      </div>

      <div class="forum-post">
        <strong>Student2:</strong>
        Can we get more examples on this topic?
      </div>

      <textarea
        id="forumComment"
        placeholder="Write a comment..."
        rows="3"
      ></textarea>

      <button
        class="btn-solid"
        id="postCommentBtn"
      >
        Post Comment
      </button>

      <div id="newComments"></div>
    `;

    document
      .getElementById("postCommentBtn")
      .addEventListener("click", () => {
        const textarea = document.getElementById("forumComment");
        const comment = textarea.value.trim();

        if (!comment) {
          alert("Please write a comment first.");
          return;
        }

        document.getElementById("newComments").innerHTML += `
          <div class="forum-post">
            <strong>You:</strong>
            ${comment}
          </div>
        `;

        textarea.value = "";
      });
  }

  if (tab === "resources") {
    body.innerHTML = `
      <h3>Course Resources</h3>

      <div class="resource-item">
        📎 Course Slides.pdf
      </div>

      <div class="resource-item">
        📎 Practice Files.zip
      </div>

      <div class="resource-item">
        📎 Reference Guide.pdf
      </div>
    `;
  }

  if (tab === "certificate") {
    const completed = getCerts().includes(course.id);

    body.innerHTML = `
      <div class="certificate-box">
        <h3>🎓 Course Certificate</h3>

        <p>
          Complete the course to unlock your certificate.
        </p>

        <button
          class="btn-solid"
          id="genCertBtn"
        >
          ${completed ? "View Certificate" : "Generate Certificate"}
        </button>
      </div>
    `;

    document
      .getElementById("genCertBtn")
      .addEventListener("click", () => {
        let certificates = getCerts();

        if (!certificates.includes(course.id)) {
          certificates.push(course.id);
          setCerts(certificates);
        }

        alert(
          `🎓 Certificate of Completion\n\n` +
          `${course.title}\n\n` +
          `Awarded to: ${getUser()?.name || "Student"}`
        );
      });
  }
}

/* ================= DASHBOARD ================= */

function renderDashboard() {

  const enrolledCourses = getEnrolled()
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);

  document.getElementById("enrolledCount").textContent =
    enrolledCourses.length;

  document.getElementById("certCount").textContent =
    getCerts().length;

  let overallProgress = 0;

  if (enrolledCourses.length > 0) {

    let totalProgress = 0;

    enrolledCourses.forEach((course) => {

      const completedLessons = JSON.parse(
        localStorage.getItem(
          `learnify_completed_${course.id}`
        ) || "[]"
      );

      const totalLessons = course.syllabus.length;

      const courseProgress =
        totalLessons > 0
          ? (completedLessons.length / totalLessons) * 100
          : 0;

      totalProgress += courseProgress;

    });

    overallProgress =
      Math.round(totalProgress / enrolledCourses.length);
  }

  document.getElementById("overallProgressText").textContent =
    `${overallProgress}% completed overall`;

  document.getElementById("overallProgressFill").style.width =
    `${overallProgress}%`;
}
/* ================= ABOUT ================= */

function renderMentorsAndStories() {
  document.getElementById("mentorsGrid").innerHTML = mentors
    .map(
      (mentor) => `
        <div class="course-card mentor-card">
          <div class="mentor-avatar">
          
          </div>

          <h3>${mentor.name}</h3>

          <p class="meta">
            ${mentor.role}
          </p>
        </div>
      `
    )
    .join("");

  document.getElementById("storiesGrid").innerHTML = stories
    .map(
      (story) => `
        <div class="course-card">
          <div class="quote-icon">
            
          </div>

          <h3>${story.name}</h3>

          <p>${story.text}</p>
        </div>
      `
    )
    .join("");
}

/* ================= PROFILE ================= */

function bindProfile() {
  document
    .getElementById("editProfileForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const name =
        document.getElementById("profileName").value.trim();

      const email =
        document.getElementById("profileEmail").value.trim();

      const user = getUser() || {};

      setUser({
        name: name || user.name || "User",
        email: email || user.email || ""
      });

      refreshAuthUI();

      alert("Profile updated successfully!");
    });

  document
    .getElementById("changePasswordForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      alert("Password updated successfully! Demo mode.");

      event.target.reset();
    });

  document
    .getElementById("contactForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      alert(
        "Message sent! We'll get back to you soon."
      );

      event.target.reset();
    });
}

function renderProfile() {
  const user = getUser();

  if (user) {
    document.getElementById("profileName").value =
      user.name || "";

    document.getElementById("profileEmail").value =
      user.email || "";
  }

  const certificates = getCerts()
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);

  document.getElementById("profileCertList").innerHTML =
    certificates.length
      ? certificates
          .map(
            (course) =>
              `<li>🎓 ${course.title}</li>`
          )
          .join("")
      : `<li class="muted">No certificates yet.</li>`;
}

/* ================= WISHLIST ================= */

function renderWishlist() {
  const list = getWishlist()
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);

  const grid = document.getElementById("wishlistGrid");

  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `r
      <div class="empty-state">
        <h3>Your wishlist is empty</h3>

        <p>
          Add courses you want to learn later.
        </p>

        <button
          class="btn-solid"
          onclick="navigateTo('courses')"
        >
          Browse Courses
        </button>
      </div>
    `;

    return;
  }

  grid.innerHTML = list.map(courseCardHTML).join("");

  attachCourseCardClicks("wishlistGrid");
}