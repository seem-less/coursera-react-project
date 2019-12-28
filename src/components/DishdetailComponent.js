import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    dateConversion(date){
        var d = new Date(date);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[d.getMonth()].substring(0,3);
        var day = d.getDate();
        var year = d.getFullYear();
        var commentDate = month + " " + day + ", " + year;
        return commentDate;
    };

    renderComments(comments){

        if(!comments){
            return(
                <div>
                </div>
            )
        }else{
            const commentlist = comments.map((comment) =>{        
                return(
                    <ul className="list-unstyled">
                        {/* Task 3)a */}
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {this.dateConversion(comment.date)}</p>
                    </ul>
                )
            })

            return(
                <div>
                    <h4>Comments</h4>
                    {commentlist}
                </div>
            ) 
        }
    }

    renderDish(dish){
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1"> 
                    <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">        
                    {this.renderComments(dish.comments)}
                </div>
            </div>
        )
    }

    render(){
        if (this.props.dish){
            return(
                this.renderDish(this.props.dish)
            )
        }else{
            return(
                <div>
                </div>
            )
        }
        
    }
}

export default DishDetail;  