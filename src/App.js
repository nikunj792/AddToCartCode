import React from 'react';
import {Provider, connect} from 'react-redux';
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import './App.css'
const initialState = {
  products: [{
   id: "123",
    title: "Table",
    description: "Excellent table to put your coffee on",
    price: 299.99,
    image: "https://b3h2.scene7.com/is/image/BedBathandBeyond/187198465273586p?$imagePLP$&wid=512",
  },
            {
   id: "456",
    title: "Couch",
    description: "Very comfy and soft couch",
    price: 1099.99,
    image: "https://b3h2.scene7.com/is/image/BedBathandBeyond/1109473234440c?$imagePLP$&wid=512",
  }],
 cart: []
}

// Update reducer
const appState = (state = initialState, action) => {
  
      switch(action.type){
       case "ADD_TO_CART":
       if(action.payload[0].flag){
        return {...state}
       } 
       else{
        return {
          ...state,
          cart: [...state.cart, action.payload[0]]
         }
       }  
        break;
         case "EMPTY_CART":
        break;
      }
 console.log('updated state is ', state)
      return state;
  
};
  

// Actions
const addToCartAction = (item) => ({type: "ADD_TO_CART",payload: item});
const emptyCarT = () => ({type: "EMPTY_CART"});

const store = createStore(appState);



// The container
class AppPage extends React.Component {
 addToCart(eve){
  let selectedItem = this.props.state.products.filter(item=> item.id == eve.target.id);
  if(this.props.state.cart.length !=0){
    if(this.props.state.cart.some(item=>item.id == eve.target.id)){
      selectedItem[0].quantity = selectedItem[0].quantity  + 1;
      selectedItem[0].flag = true;
    }
    else{
      selectedItem[0].quantity = 1;
      selectedItem[0].flag = false;
    }

  }
  else{
    selectedItem[0].flag = false;
    selectedItem[0].quantity = 1;
  }
  this.props.addToCartAction(selectedItem);
}
  render() {
    
    const { addToCartAction, state } = this.props;
   console.log('44',state);
    return(
      <div>
       <div id="productContainer" class="tile">
        <div class="header">Product Tiles</div>
        <div class="content">{state.products.map((item, key)=>{
         return <div className="container" key={key}>
             <div className="title" key={key}>{item.title}</div>
             <div className="image-container"><img src={item.image} /></div>
          <div className="price">{item.price}</div>
             <button className="button" id={item.id} onClick={(e)=>this.addToCart(e)}>Add To Cart</button>
         </div>
       
         })}</div>
        
       </div>
       <div id="miniCart" class="tile">
        <div class="header">Cart</div>
        {state.cart.length === 0 ? (<div class="content">Your cart is empty</div>) : state.cart.map(product => <div>{product.quantity}x {product.title}</div>)}
      
       </div>
      <div class="clear" />
      </div>
    );
  }
}

// Dispatch to Props
const mapDispatchToProps = dispatch => ({
    addToCartAction: (item)=> dispatch(addToCartAction(item))
})

// State to Props
const mapStateToProps = state => ({ state });


// Connect State & Dispatch as props to CounterPage
const AppContainer =  connect(
    mapStateToProps, 
    mapDispatchToProps
)(AppPage);

// Render the app to the DOM
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);