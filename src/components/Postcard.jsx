import React from "react";
import appwriteService from "../appwrite/database-service";

function Postcard({ $id, title, featuredImage }) {
  return <Link to={`/post/${$id}`} className="block w-full">
    <div className="w-full bg-gray-100 rounded-xl p-4">
    <div className="w-full justify-center mb-4">
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="w-full h-64 object-cover" />    
    </div>
        <h2>
            {title}
        </h2>
    </div>
  </Link>;
}

export default Postcard;
