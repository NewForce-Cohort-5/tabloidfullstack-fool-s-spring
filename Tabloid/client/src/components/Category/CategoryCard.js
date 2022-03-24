import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useContext } from "react";
import { Alert } from "reactstrap";



export const Category = ({category}) => {

    const { deleteCategory} = useContext(CategoryContext)

    const navigate = useNavigate();

    const handleClickDelete = () => {
        
      
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
