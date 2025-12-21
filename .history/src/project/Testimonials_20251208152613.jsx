import "./Testimonials.css";

export default function Testimonials() {
  const data = [
    { name: "Arun", review: "EduTech helped me get my first developer job!" },
    { name: "Sana", review: "The UI/UX course improved my design career." },
    { name: "Rakesh", review: "Very easy to learn with expert instructors." },
  ];

  return (
    <section className="testimonials">
      <h2>What Students Say</h2>

      <div className="testimonial-grid">
        {data.map((t, i) => (
          <div key={i} className="testimonial-card">
            <p className="text">"{t.review}"</p>
            <h4>- {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
