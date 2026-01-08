// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import emailjs from "emailjs-com";
// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
// import "./contact.css";

// export default function Contact() {
//   const [status, setStatus] = useState("");
//   const [statusType, setStatusType] = useState("");

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({ mode: "onBlur" });

//   const onSubmit = async (data) => {
//     setStatus("");
//     setStatusType("");

//     try {
//       await emailjs.send(
//         "service_31jicom",
//         "template_7uyno6u",
//         data,
//         "sTTzV7QdAk2Jx3lZL"
//       );
//       setStatus("Message sent successfully. Our team will contact you soon.");
//       setStatusType("success");
//       reset();
//     } catch {
//       setStatus("Failed to send message. Please try again later.");
//       setStatusType("error");
//     }

//     setTimeout(() => {
//       setStatus("");
//       setStatusType("");
//     }, 3500);
//   };

//   return (
//     <section className="contact-page">
//       <div className="contact-wrapper">
//         {/* LEFT */}
//         <div className="contact-left">
//           <h1>Contact Us</h1>
//           <p className="contact-desc">
//             Have questions about courses, enrollment or career guidance?
//             Our mentors are ready to help you.
//           </p>

//           <div className="contact-card">
//             <FaEnvelope />
//             <div>
//               <h4>Email</h4>
//               <p>support@techmentor.com</p>
//             </div>
//           </div>

//           <div className="contact-card">
//             <FaPhoneAlt />
//             <div>
//               <h4>Phone</h4>
//               <p>+91 77364 76724</p>
//             </div>
//           </div>

//           <div className="contact-card">
//             <FaMapMarkerAlt />
//             <div>
//               <h4>Location</h4>
//               <p>Calicut, Kerala, India</p>
//             </div>
//           </div>

//           <span className="contact-foot">
//             Trusted by learners across India
//           </span>
//         </div>

//         {/* RIGHT */}
//         <form className="contact-right" onSubmit={handleSubmit(onSubmit)} noValidate>
//           <h2>Send a Message</h2>

//           <div className="input-group">
//             <input
//               placeholder="Your Name"
//               className={errors.name ? "error" : ""}
//               {...register("name", {
//                 required: "Name is required",
//                 minLength: { value: 3, message: "Minimum 3 characters" },
//               })}
//             />
//             <small>{errors.name?.message}</small>
//           </div>

//           <div className="input-group">
//             <input
//               placeholder="Your Email"
//               className={errors.email ? "error" : ""}
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Invalid email",
//                 },
//               })}
//             />
//             <small>{errors.email?.message}</small>
//           </div>

//           <div className="input-group">
//             <textarea
//               rows="4"
//               placeholder="Your Message"
//               className={errors.message ? "error" : ""}
//               {...register("message", {
//                 required: "Message is required",
//                 minLength: { value: 10, message: "Minimum 10 characters" },
//               })}
//             />
//             <small>{errors.message?.message}</small>
//           </div>

//           {status && (
//             <p className={`status ${statusType}`}>{status}</p>
//           )}

//           <button disabled={isSubmitting}>
//             {isSubmitting ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }