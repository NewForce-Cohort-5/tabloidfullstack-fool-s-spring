import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useNavigate, useParams } from "react-router-dom";

const PostForm = () => {

  const newPost = { 
    title: '', 
    content: '', 
    imageLocation: '', 
    userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id,
    isApproved: true,
    categoryId: 0 
  };

  const [post, setPost] = useState(newPost);

  const [action, setAction] = useState("Create");

  const { addPost, getPostToEdit, editPost } = useContext(PostContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const newPostValue = { ...post };
    newPostValue[e.target.id] = e.target.value;
    setPost(newPostValue);
  };

  const handleSubmitPost = () => {
    if (id) {
      editPost(post).then(() => navigate(`/posts/${id}`));
    } else {
      addPost({ ...post, createDateTime: new Date().toISOString() })
      .then(() => navigate("/"));
    }
  };

  useEffect(() => {
    setAction("Create");
    if (id) {
      
      //* It's typical to just say .then(setPost) but I didn't need all the data returned.
      //* There's an extra User object and a Comments array that I didn't want as part of the post state.
      
      getPostToEdit(id)
        .then( p => setPost({ 
                      id: p.id,
                      title: p.title, 
                      caption: p.caption, 
                      imageUrl: p.imageUrl, 
                      dateCreated: p.dateCreated,
                      userProfileId: p.userProfileId
                    }));
      setAction("Edit");
    }
  }, [id]);

  return (
    <Container className="pt-5">
      <h2>{action} Post</h2>
      <Form inline>
        <FormGroup floating>
          <Input
            id="title"
            placeholder="Title"
            onChange={handleChangeInput}
            value={post.title}
            />
          <Label for="title">Title</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="content"
            placeholder="Content"
            onChange={handleChangeInput}
            value={post.content}
            />
          <Label for="caption">Content</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="imageLocation"
            placeholder="Image Location"
            onChange={handleChangeInput}
            value={post.imageLocation}
            />
          <Label for="imageUrl">Image Location</Label>
        </FormGroup>
        <Button onClick={handleSubmitPost}>Submit</Button>
      </Form>
    </Container>
  );
};

export default PostForm;