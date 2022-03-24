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

  const [categories, setCategories] = useState([]);

  const [action, setAction] = useState("Create");

  const { addNewPost, getPostToEdit, editPost } = useContext(PostContext);

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
      addNewPost({ ...post, createDateTime: new Date().toISOString() })
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
                      content: p.content, 
                      imageLocation: p.imageLocation, 
                      createDateTime: p.createDateTime,
                      categoryId: p.categoryId,
                      userProfileId: p.userProfileId
                    }));
      setAction("Edit");
    }
  }, [id]);

  return (
    <Container className="pt-5">
      <h2>{action} Post</h2>
      <Form >
        <FormGroup floating>
          <Input
            id="title"
            placeholder="Title"
            onChange={handleChangeInput}
            value={post.title}
            />
          <Label for="title" hidden>Title</Label>
        </FormGroup>
        <FormGroup >
          <Input
            id="content"
            placeholder="Content"
            onChange={handleChangeInput}
            value={post.content}
            type="textarea"
            />
          <Label for="content" hidden>Content</Label>
        </FormGroup>
        <FormGroup >
          <Input
            id="imageLocation"
            placeholder="Image Location"
            onChange={handleChangeInput}
            value={post.imageLocation}
            />
          <Label for="imageLocation" hidden>Image Location</Label>
        </FormGroup>
        <FormGroup >
          <Input
            id="categoryId"
            placeholder="Category"
            type="select"
            onChange={handleChangeInput}
            value={post.categoryId}
            >
              <option>Please Select a Category</option>
              {categories.map(c => <option value={c.id}>{c.name}</option>)}
            </Input>
          <Label for="CategoryId" hidden>Category</Label>
        </FormGroup>
        <Button onClick={handleSubmitPost}>Submit</Button>
      </Form>
    </Container>
  );
};

export default PostForm;