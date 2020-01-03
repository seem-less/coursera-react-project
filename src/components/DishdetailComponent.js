import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
// Task 3
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

// Task 1)a
class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <>  
                {/* Task 1)a */}
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                </Button>
                {/* Task 1)b */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        {/* Task 2)a */}
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                {/* Task 2)a */}
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    {/* Task 2)b */}
                                    <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control"
                                    defaultValue="1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                {/* Task 2)a */}
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    {/* Task 2)b */}
                                    <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    // Task 3
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        // Task 3
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be at least 3 characters long',
                                            maxLength: 'Must be less than or equal to 15 characters'
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                {/* Task 2)a */}
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    {/* Task 2)b */}
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
} 


function dateConversion(date){
    var d = new Date(date);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[d.getMonth()].substring(0,3);
    var day = d.getDate();
    var year = d.getFullYear();
    var commentDate = month + " " + day + ", " + year;
    return commentDate;
};

function RenderComments({comments, addComment, dishId}){

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
                {/* Task 1)c */}
                <CommentForm addComment={addComment} dishId={dishId} />
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
    if (props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null){
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
                    <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id} />
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