import "./Subjects.css";

export default function Subjects() {
  const subjects = [
    { name: "Web Development", icon: "💻" },
    { name: "Data Science", icon: "📊" },
    { name: "AI & Machine Learning", icon: "🤖" },
    { name: "UI/UX Design", icon: "🎨" },
    { name: "Cyber Security", icon: "🛡️" },
    { name: "Business Marketing", icon: "📈" },
  ];

  return (
    <section className="subjects">
      <h2>Popular Subjects</h2>

      <div className="subject-grid">
        {subjects.map((s, i) => (
          <div key={i} className="subject-card">
            <span className="icon">{s.icon}</span>
            <p>{s.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
