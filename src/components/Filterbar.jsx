import "../styles/Filterbar.css";

function Filterbar(){
    const tags = [
  "All",
  "HTML",
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

    return(
        <ul className="tags-container">
        {tags.map((tag, index)=>{
            return (<li key={index}>{tag}</li>)
        })}
        </ul>
        
    )
}

export default Filterbar;