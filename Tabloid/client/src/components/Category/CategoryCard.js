import React from "react";

import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useContext } from "react";
//import { Alert } from "reactstrap";



 export const Category = ({category}) => {

    const { deleteCategory, getAllCategories} = useContext(CategoryContext)

    const navigate = useNavigate();
//new code to handle the delete function
    const handleClickDelete = () => {
        var confirmDelete = window.confirm("Are you sure you want to delete the category: " + (category.name) + "?")
        if (confirmDelete) {
            deleteCategory(category.id)
            .then(getAllCategories);;
        } else {
            getAllCategories();
        };
        
        
      
    }

   
   
   
   
    return (
        <>
        <p className="category-list">{category.name}</p>
        <button className="deleteCategory" onClick={event => {
            event.preventDefault()
            handleClickDelete()
        }}>Delete</button>
        </>
    )
}
