import React, { Component } from 'react';
import Logo from './Images/NewLogoSquare.png';

export default class Scroll extends Component {
    render() {
        const menus= this.props.menus || [];
        return (
            <div className="scroll-horiz">
                {menus.map(menu => 
                           <div className="scroll-box" onClick={()=> window.location.href = '/menu?id=' + menu.id} style={{backgroundImage: `url(${menu.imagen})`}}>
                           <h4 className="restaurant-name"> {menu.nombre} </h4>
                           <img src={Logo} alt='logo' height='20' />
                           <p className="restaurant-coste"> {menu.menu_coste} € </p>
                       </div>
                    )}
         
            </div>
        )
        
    }
}
