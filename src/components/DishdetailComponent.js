import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);

        
    }
    render(){
        return(
            <Card className="col-12 col-md-5 m-1">
                <CardImg width="100%" src={this.props.dishes.image} alt={this.props.dishes.name}/>
                <CardBody>
                    <CardTitle>{this.props.dishes.name}</CardTitle>
                    <CardText>{this.props.dishes.description}</CardText>
                </CardBody>
            </Card>
        )
    }
}

export default DishDetail;  