import { TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useEffect } from "react";

function Message({ id, message, timestamp, name, email, photoURL, file }) {

  console.log("photo", photoURL)

  return (
    <div className="message">
      <div className="file-document">
  <div className="message-info">
    <img src={photoURL} alt={name} className="h-5 rounded-full" />
    <div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-xs text-gray-400">{timestamp}</p>
    </div>
  </div>
  <div className="message-content">
  {file?.name ? (
  <div className="file-message">
    {file.mimetype && file.mimetype.startsWith("image/") ? (
      <a href={file.path}><img src={file.path} alt="File" className="max-h-64 max-w-full" /></a>
    ) : (
      <>
        {file.mimetype && file.mimetype.startsWith("video/") ? (
          <a href={file.path}><video controls className="max-h-64 w-auto">
          <source src={file.path} type={file.type} />
          Your browser does not support the video tag.
        </video></a>
        ) : <a href={file.path} download={file.name}>
        Download {file.name}
      </a>}
      </>
    )}
  </div>
) : (
  <p>{message}</p>
)}
  </div>
</div>
    </div>
  );
}

export default Message;
