// Importing necessary functions/components
import { formatISO9075 } from "date-fns"; // Importing date formatting function
import { Link } from "react-router-dom"; // Importing Link component for navigation

// Post component that displays a single blog post
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      {/* Link wrapping the post image, leading to the individual post */}
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="" />
        </Link>
      </div>

      {/* Section for post details */}
      <div className="texts">
        {/* Link wrapping the post title, leading to the individual post */}
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        {/* Information section for author and creation date */}
        <p className="info">
          {/* Link or information about the author */}
          <a className="author">{author.username}</a>
          {/* Displaying the formatted creation date */}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        {/* Displaying a summary of the post */}
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
