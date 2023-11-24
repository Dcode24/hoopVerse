// Importing the ReactQuill component for text editing
import ReactQuill from "react-quill";

// Editor component for text editing
export default function Editor({ value, onChange }) {
  // Modules configuration for the editor toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Headers: h1, h2
      ["bold", "italic", "underline", "strike", "blockquote"], // Text formatting options
      [
        { list: "ordered" }, // Ordered list
        { list: "bullet" }, // Bullet list
        { indent: "-1" }, // Indentation decrease
        { indent: "+1" }, // Indentation increase
      ],
      ["link", "image"], // Link and image insertion
      ["clean"], // Remove formatting
    ],
  };

  // Rendering the ReactQuill editor component
  return (
    <ReactQuill
      value={value} // Current value of the editor
      theme={"snow"} // Editor theme ("snow" is a standard theme)
      onChange={onChange} // Function to handle changes in the editor content
      modules={modules} // Toolbar and editing behavior configuration
    />
  );
}
