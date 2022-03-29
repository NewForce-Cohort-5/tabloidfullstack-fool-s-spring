// import React, { useContext, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Card, CardImg, CardBody, Button } from "reactstrap";
// import { TagContext } from "../../providers/TagProvider";
// import { PostTagContext } from "../../providers/PostTagProvider";

// export const PostTag = () => {
//     const { tags, getAllTags } = useContext(TagContext)
//     const { addPostTag } = useContext(PostTagContext);

//     const navigate = useNavigate();

//     const manageTags = () => {
//        // navigate(`/posttags/${id}`)
//     };

//     return (
//     <>
//          <h4>Tags: </h4>
//          <Button onClick= {() => manageTags()} className="ml-2">Manage Tags</Button>
//          <div>
//             <p class="p-2 m-2 bg-secondary text-white">{tags.Name}</p>
//             {tags.map((tag) => (
//                 <Tag key={tag.id} tagProp={tag} />
//             )).sort()}
//          </div>
//     </>
//     )
// };


