import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
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

  const [invalidFields, setInvalidFields] = useState({
    title: false,
    content: false,
    categoryId: false
  });

  const setInvalid = (failed) => {

    const newInvalidFields = { ...invalidFields };
  
    //* For each validation error display it's message in the field which is invalid.
    for (const invalidType of Object.keys(failed.errors)) {
      const invalidField = invalidType;
  
      //? ImageLocation => imageLocation
      const fieldId = invalidField.replace(/^[A-Z]/, invalidField[0].toLowerCase());
  
      //? ex. The field Profile Image URL must be a string or array type with a maximum length of '255'
      const message = failed.errors[invalidType][0].replace(invalidField, document.getElementById(fieldId).previousElementSibling.innerText);
      
      document.getElementById(fieldId).nextElementSibling.innerText = message;
      
      newInvalidFields[fieldId] = true;
      
    }
  
    setInvalidFields(newInvalidFields);
  };

  const reevaluateInvalidIfAny = () => {
    if (Object.keys(invalidFields).some(i => invalidFields[i])) {

      const updatedFields = { ...invalidFields };

      for (const field of Object.keys(invalidFields)) {
        if (field !== "categoryId") {
          updatedFields[field] = document.getElementById(field).value.length <= 0
        } else {
          updatedFields[field] = +document.getElementById(field).value <= 0
        }
      }

      setInvalidFields(updatedFields);
    }
  };


  const { id } = useParams();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {

    reevaluateInvalidIfAny();

    const newPostValue = { ...post };
    newPostValue[e.target.id] = e.target.value;
    setPost(newPostValue);
  };

  const handleSubmitPost = () => {
    if (id) {
      editPost(post).then((r) => {
        // navigate(`/posts/${id}`);
      });
    } else {
      addNewPost({ ...post, createDateTime: new Date().toISOString() })
      .then((r) => {
        if (r.status === 400) {
          setInvalid(r);
        } else {
          navigate(`/posts/${id}`);
        }
      });
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
        <FormGroup >
          <Label for="title" hidden>Title</Label>
          <Input
            id="title"
            placeholder="Title"
            onChange={handleChangeInput}
            invalid={invalidFields.title}
            value={post.title}
            />
          <FormFeedback></FormFeedback>
        </FormGroup>
        <FormGroup >
          <Label for="content" hidden>Content</Label>
          <Input
            id="content"
            placeholder="Content"
            onChange={handleChangeInput}
            invalid={invalidFields.content}
            value={post.content}
            type="textarea"
            />
          <FormFeedback></FormFeedback>
        </FormGroup>
        <FormGroup >
          <Label for="imageLocation" hidden>Image Location</Label>
          <Input
            id="imageLocation"
            placeholder="Image Location"
            onChange={handleChangeInput}
            invalid={invalidFields.imageLocation}
            value={post.imageLocation}
            />
          <FormFeedback></FormFeedback>
        </FormGroup>
        <FormGroup >
          <Label for="CategoryId" hidden>Category</Label>
          <Input
            id="categoryId"
            placeholder="Category"
            type="select"
            onChange={handleChangeInput}
            invalid={invalidFields.categoryId}
            value={post.categoryId}
            >
              <option value="0">Please Select a Category</option>
              {categories.map(c => <option value={c.id}>{c.name}</option>)}
          </Input>
          <FormFeedback></FormFeedback>
        </FormGroup>
        <Button onClick={handleSubmitPost}>Submit</Button>
      </Form>
    </Container>
  );
};

export default PostForm;