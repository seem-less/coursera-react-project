import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

function dateConversion(date){
    var d = new Date(date);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[d.getMonth()].substring(0,3);
    var day = d.getDate();
    var year = d.getFullYear();
    var commentDate = month + " " + day + ", " + year;
    return commentDate;
};

function RenderComments({comments}){

    if(!comments){
        return(
            <div>
            </div>
        )
    }else{
        const commentlist = comments.map((comment) =>{        
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {dateConversion(comment.date)}</p>
                </li>
            )
        })

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {commentlist}
                </ul>
            </div>
        ) 
    }
}

function RenderDish({dish, comments}){
    return(
        <div className="col-12 col-md-5 m-1"> 
            <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const DishDetail = (props) =>{
    if (props.dish != null){
        return(
            <div className="container">
                <div className ="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>
                                Menu
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )
    }else{
        return(
            <div>
            </div>
        )
    }
}
        

export default DishDetail;  