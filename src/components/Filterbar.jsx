import "../styles/Filterbar.css";
import { useNavigate } from "react-router-dom";

function Filterbar() {
  const navigate = useNavigate();

  const tags = [
    "All",
    "Education",
    "Blog",
    "Gaming",
    "Music",
    "Programming",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Frontend",
    "Backend",
    "Fullstack",
    "UI/UX",
    "Bootstrap",
    "Tailwind",
    "API",
    "Programming"
  ];

  const handleFilter = (tag) => {
    if (tag === "All") {
      navigate("/"); // reset filter
    } else {
      navigate(`/?cat=${tag}`);
    }
  };

  return (
    <ul className="tags-container">
      {tags.map((tag, index) => (
        <li key={index} onClick={() => handleFilter(tag)} className="tag-btn">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default Filterbar;
