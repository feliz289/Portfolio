import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "./services/api";

export default function Portfolio() {

  const [projects, setProjects] = useState([]);
  const [dark, setDark] = useState(true);

  // ACTIVE PAGE
  const [activeSection, setActiveSection] = useState("home");
  const [currentImage, setCurrentImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
});

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  // prevent multiple clicks
  if (loading) return;

  // validation
  if (!form.name || !form.email || !form.message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    setLoading(true);

    await api.post("/contact", form);

    alert("Message sent successfully!");

    // clear form
    setForm({
      name: "",
      email: "",
      message: "",
    });

  } catch (error) {
    console.log(error);

    alert("Failed to send message.");
  } finally {

    // wait 3 seconds before enabling button again
    setTimeout(() => {
      setLoading(false);
    }, 3000);

  }
};

  useEffect(() => {
    api.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // LOAD THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setDark(saved === "dark");
    }
  }, []);

  // SAVE THEME
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  // AUTO SLIDE IMAGES
useEffect(() => {

  const interval = setInterval(() => {

    setCurrentImage((prev) => prev + 1);

  }, 3000);

  return () => clearInterval(interval);

}, []);

  return (
    <div className={dark ? "dark" : ""}>

      {/* BACKGROUND */}
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-blue-100 via-white to-blue-200
          dark:from-[#020617]
          dark:via-[#0f172a]
          dark:to-[#1e293b]
          text-black dark:text-white
        "
      >

        {/* NAVBAR */}
    {/* NAVBAR */}
<nav
  className="
    fixed top-0 left-0 w-full z-50
    px-4 lg:px-8 py-4
    bg-white/70 dark:bg-[#1e293b]/70
    backdrop-blur-xl
    border-b border-white/20 dark:border-slate-700
    shadow-lg
  "
>

  <div className="max-w-7xl mx-auto flex items-center justify-between">

    {/* LOGO */}
    <div className="flex items-center gap-3">

      <h1 className="text-blue-500 text-2xl font-black">
        ⚡
      </h1>

      <span className="font-bold text-sm lg:text-base">
        Felipa
      </span>

    </div>

    {/* DESKTOP NAVIGATION */}
    <div className="hidden lg:flex items-center gap-4 text-sm">

      <button
        onClick={() => setActiveSection("home")}
        className={`px-4 py-2 rounded-lg transition ${
          activeSection === "home"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-slate-800"
        }`}
      >
        Home
      </button>

      <button
        onClick={() => setActiveSection("about")}
        className={`px-4 py-2 rounded-lg transition ${
          activeSection === "about"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-slate-800"
        }`}
      >
        About
      </button>

      <button
        onClick={() => setActiveSection("skills")}
        className={`px-4 py-2 rounded-lg transition ${
          activeSection === "skills"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-slate-800"
        }`}
      >
        Skills
      </button>

      <button
        onClick={() => setActiveSection("projects")}
        className={`px-4 py-2 rounded-lg transition ${
          activeSection === "projects"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-slate-800"
        }`}
      >
        Projects
      </button>

      <button
        onClick={() => setActiveSection("contact")}
        className={`px-4 py-2 rounded-lg transition ${
          activeSection === "contact"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-slate-800"
        }`}
      >
        Contact
      </button>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3">

      {/* DARK MODE */}
      <button
        onClick={() => setDark(!dark)}
        className="
          bg-gray-200 dark:bg-slate-700
          px-3 py-2 rounded-lg
        "
      >
        {dark ? "☀️" : "🌙"}
      </button>

      <img
  src="/images/felipa.png"
  alt="Felipa"
  className="
    w-10 h-10
    rounded-full
    object-cover
    border-2 border-blue-500
    shadow-lg
    hidden lg:block
  "
/>
      {/* HAMBURGER */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="
          lg:hidden
          text-2xl
          px-2
        "
      >
        {menuOpen ? "✕" : "☰"}
      </button>

    </div>

  </div>

  {/* MOBILE MENU */}
  {menuOpen && (

    <div
      className="
        lg:hidden
        mt-4
        rounded-2xl
        bg-white dark:bg-[#0f172a]
        border border-gray-200 dark:border-slate-700
        shadow-xl
        p-4
        flex flex-col gap-3
      "
    >

      <button
        onClick={() => {
          setActiveSection("home");
          setMenuOpen(false);
        }}
        className={`px-4 py-3 rounded-xl text-left ${
          activeSection === "home"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }`}
      >
        Home
      </button>

      <button
        onClick={() => {
          setActiveSection("about");
          setMenuOpen(false);
        }}
        className={`px-4 py-3 rounded-xl text-left ${
          activeSection === "about"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }`}
      >
        About
      </button>

      <button
        onClick={() => {
          setActiveSection("skills");
          setMenuOpen(false);
        }}
        className={`px-4 py-3 rounded-xl text-left ${
          activeSection === "skills"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }`}
      >
        Skills
      </button>

      <button
        onClick={() => {
          setActiveSection("projects");
          setMenuOpen(false);
        }}
        className={`px-4 py-3 rounded-xl text-left ${
          activeSection === "projects"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }`}
      >
        Projects
      </button>

      <button
        onClick={() => {
          setActiveSection("contact");
          setMenuOpen(false);
        }}
        className={`px-4 py-3 rounded-xl text-left ${
          activeSection === "contact"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }`}
      >
        Contact
      </button>

    </div>

  )}

</nav>

        {/* CONTAINER */}
        <div className="pt-28 md:pt-32 max-w-7xl mx-auto px-4 md:px-6">

          {/* HOME */}
          {activeSection === "home" && (

            <section className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-5 md:p-5 md:p-10 lg:gap-16">

              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex-1"
              >

                <p className="text-blue-500 font-medium mb-4">
                  👋 Hello, I'm
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
                  Felipa <br />

                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Full-Stack Developer
                  </span>
                </h1>

                <p className="text-base md:text-lg opacity-70 max-w-xl mb-8 leading-relaxed">
                  I build scalable web systems, REST APIs,
                  and modern user interfaces using Laravel,
                  React.js, and MySQL.
                </p>

               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

  {/* HIRE ME */}
  <button
    onClick={() => setActiveSection("contact")}
    className="
      px-7 py-3 rounded-xl
      bg-blue-500 hover:bg-blue-600
      text-white shadow-lg
      transition
    "
  >
    Hire Me
  </button>

  {/* DOWNLOAD CV */}
  <a
    href="/resume/Felipa-Resume.pdf"
    download
    className="
      px-7 py-3 rounded-xl
      border border-gray-300 dark:border-slate-700
      hover:bg-gray-100 dark:hover:bg-slate-800
      transition
      text-center
    "
  >
    Download CV
  </a>

</div>

              </motion.div>

              {/* RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex justify-center"
              >

                <div className="relative w-full max-w-md lg:max-w-lg">

                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 blur-3xl opacity-20 rounded-full"></div>

                  <div className="
                    relative
                    rounded-3xl
                    bg-white/70 dark:bg-[#0f172a]/70
                    backdrop-blur-xl
                    border border-white/20 dark:border-slate-700
                    shadow-2xl
                    overflow-hidden
                  ">

                    <div className="p-5 md:p-8">

                      <div className="rounded-2xl bg-slate-900 text-green-400 p-5 font-mono text-sm mb-6">
{`const developer = {
  name: "Felipa",
  stack: ["Laravel", "React"],
  passion: "Backend Systems"
}`}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="rounded-2xl p-5 bg-blue-500 text-white">
                          <h3 className="text-xl font-bold">
                            Laravel
                          </h3>
                          <p className="text-sm opacity-80">
                            Backend APIs
                          </p>
                        </div>

                        <div className="rounded-2xl p-5 bg-indigo-500 text-white">
                          <h3 className="text-xl font-bold">
                            React
                          </h3>
                          <p className="text-sm opacity-80">
                            Modern UI
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

              </motion.div>

            </section>
          )}

        {/* ABOUT */}
{activeSection === "about" && (

<section className="pt-4 pb-10 md:pt-6 md:pb-14">

    <div className="grid lg:grid-cols-2 gap-5 md:p-5 md:p-10 lg:gap-16 items-center">

      {/* LEFT SIDE */}
      <div>

        <p className="text-blue-500 font-semibold mb-3 tracking-[0.3em]">
          ABOUT ME
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight mb-6">
          I build
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            {" "}modern full-stack systems
          </span>
          {" "}for real users.
        </h2>

        <p className="text-lg opacity-70 leading-relaxed mb-10 max-w-2xl">
          I develop scalable web applications using Laravel,
          React.js, MySQL, REST APIs, and modern UI/UX design.
   .
        </p>

        {/* MINI INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="
            p-5 rounded-3xl
            bg-white/60 dark:bg-[#1e293b]/60
            backdrop-blur-xl
            border border-white/20 dark:border-slate-700
            shadow-xl
          ">
            <h3 className="text-xl font-bold text-blue-500 mb-2">
              Backend Systems
            </h3>

            <p className="opacity-70 text-sm leading-relaxed">
              Laravel APIs, authentication,
              database architecture, and scalable logic.
            </p>
          </div>

          <div className="
            p-5 rounded-3xl
            bg-white/60 dark:bg-[#1e293b]/60
            backdrop-blur-xl
            border border-white/20 dark:border-slate-700
            shadow-xl
          ">
            <h3 className="text-xl font-bold text-indigo-500 mb-2">
              Modern UI/UX
            </h3>

            <p className="opacity-70 text-sm leading-relaxed">
              Responsive interfaces using React.js,
              Tailwind CSS, and interactive animations.
            </p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
    <div className="relative w-full lg:w-[120%]">

        {/* GLOW EFFECT */}
        <div className="
          absolute inset-0
          bg-gradient-to-r from-blue-500 to-indigo-500
          opacity-20 blur-3xl rounded-[40px]
        "></div>

        {/* IMAGE */}
        <img
          src="/images/about-photo.png"
          alt="Project Preview"
         className="
  relative
  w-full
  h-auto
  max-h-[500px]
  object-contain
  rounded-[30px]
  shadow-2xl
  border border-white/20 dark:border-slate-700
  hover:scale-[1.02]
  transition duration-500
"
        />

      </div>

    </div>

  </section>
)}
          {/* SKILLS */}
          {activeSection === "skills" && (

            <section className="py-14 md:py-20">

              <h2 className="text-3xl sm:text-5xl font-black mb-10">
                Skills
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

                {[
                  "Laravel",
                  "React",
                  "MySQL",
                  "REST API",
                  "Tailwind",
                  "JavaScript",
                  "Git",
                  "System Design",
                ].map((skill) => (

                  <div
                    key={skill}
                    className="
                      p-6 rounded-2xl
                      bg-white/60 dark:bg-[#1e293b]/60
                      backdrop-blur-md
                      shadow-lg
                    "
                  >
                    {skill}
                  </div>
                ))}

              </div>

            </section>
          )}

      {/* PROJECTS */}
{activeSection === "projects" && (

<section className="pt-2 pb-10 md:pt-4 md:pb-14">

    {/* TITLE */}
    <div className="mb-16">

      <p className="text-blue-500 font-semibold tracking-[0.3em] mb-3">
        MY PROJECTS
      </p>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
        Full-Stack
        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          {" "}Web Systems
        </span>
      </h2>

    </div>

    {/* PROJECT 1 */}
    <div
      className="
        grid lg:grid-cols-2
        gap-8 lg:gap-16
        items-center
        mb-20
        rounded-[35px]
        p-5 sm:p-8 md:p-10
        bg-white/60 dark:bg-[#1e293b]/60
        backdrop-blur-xl
        border border-white/20 dark:border-slate-700
        shadow-2xl
      "
    >

      {/* LEFT */}
      <div>

        <p className="text-blue-500 font-semibold mb-3">
          FULL-STACK SYSTEM
        </p>

        <h3 className="text-3xl sm:text-4xl font-black mb-6">
          SK Management System
        </h3>

        <p className="text-base md:text-lg opacity-70 leading-relaxed mb-8">
          A modern web-based platform for managing youth records,
          projects, announcements, financial reports, and
          organizational activities for the Sangguniang Kabataan.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">

          {["Laravel", "Tailwind CSS", "JavaScript", "MySQL", "REST API"].map((tech) => (

            <div
              key={tech}
              className="
                px-5 py-2 rounded-full
                bg-blue-100 dark:bg-slate-800
                text-sm font-medium
              "
            >
              {tech}
            </div>

          ))}

        </div>

        {/* GITHUB BUTTON */}
        <a
          href="https://github.com/feliz289/jagna-bohol-web-based"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-3
            px-6 py-3
            rounded-2xl
            bg-blue-500 hover:bg-blue-600
            text-white
            font-semibold
            transition
            shadow-lg
          "
        >
          <span>View Source Code</span>
          <span>↗</span>
        </a>

      </div>

      {/* RIGHT */}
      <div className="relative">

        <div
          className="
            rounded-[35px]
            overflow-hidden
            border border-white/20 dark:border-slate-700
            shadow-2xl
            bg-black
          "
        >

          <motion.img
            key={currentImage}
            src={[
              "/images/sk1.png",
              "/images/sk2.png",
              "/images/sk3.png",
              "/images/sk4.png",
              "/images/sk5.png",
              "/images/sk6.png",
              "/images/sk7.png",
              "/images/sk8.png",
              "/images/sk9.png",
              "/images/sk10.png",
            ][currentImage % 10]}
            alt="SK Management System"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              w-full
              h-[220px]
              sm:h-[300px]
              md:h-[380px]
              object-contain
            "
          />

        </div>

      </div>

    </div>

    {/* PROJECT 2 */}
    <div
      className="
        grid lg:grid-cols-2
        gap-8 lg:gap-16
        items-center
        mb-20
        rounded-[35px]
        p-5 sm:p-8 md:p-10
        bg-white/60 dark:bg-[#1e293b]/60
        backdrop-blur-xl
        border border-white/20 dark:border-slate-700
        shadow-2xl
      "
    >

      {/* LEFT */}
      <div>

        <p className="text-indigo-500 font-semibold mb-3">
          WEB-BASED SYSTEM
        </p>

        <h3 className="text-3xl sm:text-4xl font-black mb-6">
          BookHaven
        </h3>

        <p className="text-base md:text-lg opacity-70 leading-relaxed mb-8">
          A web-based library and borrowing platform where
          users can browse books, manage borrowing transactions,
          and monitor book availability online.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">

          {["Laravel", "React.js", "MySQL"].map((tech) => (

            <div
              key={tech}
              className="
                px-5 py-2 rounded-full
                bg-indigo-100 dark:bg-slate-800
                text-sm font-medium
              "
            >
              {tech}
            </div>

          ))}

        </div>

        {/* GITHUB BUTTON */}
        <a
          href="https://github.com/feliz289/BookHaven"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-3
            px-6 py-3
            rounded-2xl
            bg-indigo-500 hover:bg-indigo-600
            text-white
            font-semibold
            transition
            shadow-lg
          "
        >
          <span>View Source Code</span>
          <span>↗</span>
        </a>

      </div>

      {/* RIGHT */}
      <div className="relative">

        <div
          className="
            rounded-[35px]
            overflow-hidden
            border border-white/20 dark:border-slate-700
            shadow-2xl
            bg-black
          "
        >

          <motion.img
            key={currentImage}
            src={[
              "/images/book1.png",
              "/images/book2.png",
              "/images/book3.png",
              "/images/book4.png",
              "/images/book5.png",
              "/images/book6.png",
              "/images/book7.png",
            ][currentImage % 7]}
            alt="BookHaven"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              w-full
              h-[220px]
              sm:h-[300px]
              md:h-[380px]
              object-contain
            "
          />

        </div>

      </div>

    </div>

    {/* PROJECT 3 */}
    <div
      className="
        grid lg:grid-cols-2
        gap-8 lg:gap-16
        items-center
        rounded-[35px]
        p-5 sm:p-8 md:p-10
        bg-white/60 dark:bg-[#1e293b]/60
        backdrop-blur-xl
        border border-white/20 dark:border-slate-700
        shadow-2xl
      "
    >

      {/* LEFT */}
      <div>

        <p className="text-cyan-500 font-semibold mb-3">
          EDUCATIONAL SYSTEM
        </p>

        <h3 className="text-3xl sm:text-4xl font-black mb-6">
          Human Reproduction System
        </h3>

        <p className="text-base md:text-lg opacity-70 leading-relaxed mb-8">
          An interactive educational web application designed
          to help students learn the human reproductive system
          through visuals, animations, and interactive lessons.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">

          {["HTML", "CSS", "JavaScript"].map((tech) => (

            <div
              key={tech}
              className="
                px-5 py-2 rounded-full
                bg-cyan-100 dark:bg-slate-800
                text-sm font-medium
              "
            >
              {tech}
            </div>

          ))}

        </div>

        {/* GITHUB BUTTON */}
        <a
          href="https://github.com/feliz289/Human-Reproduction"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-3
            px-6 py-3
            rounded-2xl
            bg-cyan-500 hover:bg-cyan-600
            text-white
            font-semibold
            transition
            shadow-lg
          "
        >
          <span>View Source Code</span>
          <span>↗</span>
        </a>

      </div>

      {/* RIGHT */}
      <div className="relative">

        <div
          className="
            rounded-[35px]
            overflow-hidden
            border border-white/20 dark:border-slate-700
            shadow-2xl
            bg-black
          "
        >

          <motion.img
            key={currentImage}
            src={[
              "/images/hr1.png",
              "/images/hr2.png",
              "/images/hr3.png",
              "/images/hr4.png",
              "/images/hr5.png",
            ][currentImage % 5]}
            alt="Human Reproduction System"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              w-full
              h-[220px]
              sm:h-[300px]
              md:h-[350px]
              object-contain
            "
          />

        </div>

      </div>

    </div>

  </section>
)}

       {/* CONTACT */}
{activeSection === "contact" && (

<section className="pt-0 pb-10 md:pt-1 md:pb-16">

    <div className="max-w-4xl mx-auto">

      {/* TITLE */}
      <div className="mb-10 text-center">

        <p className="text-blue-500 font-semibold tracking-[0.3em] mb-3">
          CONTACT
        </p>

        <h2 className="text-4xl md:text-6xl font-black mb-4">
          Let's Work Together
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
          Have a project idea or collaboration?
          Send me a message directly.
        </p>

      </div>

      {/* CONTACT CARD */}
      <div className="
        grid lg:grid-cols-2 gap-10
        p-6 md:p-10
        rounded-[35px]
        bg-white/60 dark:bg-[#1e293b]/60
        backdrop-blur-xl
        border border-white/20 dark:border-slate-700
        shadow-2xl
      ">

        {/* LEFT */}
        <div>

          <h3 className="text-2xl font-bold mb-6">
            Contact Information
          </h3>

          <div className="space-y-5">

            <div>
              <p className="text-blue-500 font-semibold mb-1">
                Email
              </p>

              <p className="opacity-70">
                32felyorain@gmail.com
              </p>
            </div>

            <div>
              <p className="text-blue-500 font-semibold mb-1">
                Phone
              </p>

              <p className="opacity-70">
                +63 9099688950
              </p>
            </div>

            <div>
              <p className="text-blue-500 font-semibold mb-1">
                Location
              </p>

              <p className="opacity-70">
                Bohol, Philippines
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <form onSubmit={handleSubmit} className="space-y-5">

         <input
  type="text"
  placeholder="Your Name"
  value={form.name}
  onChange={(e) =>
    setForm({ ...form, name: e.target.value })
  }
  className="
    w-full p-4 rounded-2xl
    bg-white dark:bg-[#0f172a]
    border border-gray-200 dark:border-slate-700
    outline-none
  "
/>

<input
  type="email"
  placeholder="Your Email"
  value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
  className="
    w-full p-4 rounded-2xl
    bg-white dark:bg-[#0f172a]
    border border-gray-200 dark:border-slate-700
    outline-none
  "
/>

<textarea
  rows="5"
  placeholder="Your Message"
  value={form.message}
  onChange={(e) =>
    setForm({ ...form, message: e.target.value })
  }
  className="
    w-full p-4 rounded-2xl
    bg-white dark:bg-[#0f172a]
    border border-gray-200 dark:border-slate-700
    outline-none resize-none
  "
></textarea>

         <button
  type="submit"
  disabled={loading}
  className={`
    w-full
    py-4 rounded-2xl
    transition
    text-white font-semibold
    shadow-xl
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
    }
  `}
>
  {loading ? "Sending..." : "Send Message"}
</button>

        </form>

      </div>

    </div>

  </section>
)}
        </div>
      </div>
    </div>
  );
}