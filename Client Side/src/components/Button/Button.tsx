import "./Button.css";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  text: string;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// reusable button component
const Button: React.FC<ButtonProps> = ({ type, text, color, onClick }) => {
  return (
    <button
      className="button"
      type={type}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
