import React, { Component } from 'react'
import Markdown from 'react-markdown'

export default class Menu extends Component {
    constructor() {
        super();
        this.state = {
            menu: {}
        }
    }

    componentDidMount = () => {
        const id = window.location.search.split("=").pop() || 1;
        fetch('api/menus/' + id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                menu: data
            })
        })
    }

    render() {
        const restaurant = this.state.menu;
        return (
            <div>
                <img src={restaurant.imagen} className="menu-imagen"/>
                <div className="menu-coste">{restaurant.menu_coste} €</div>
                <h2>{restaurant.nombre}</h2>
                <h3>{restaurant.direccion}</h3>
                <Markdown 
                    source={restaurant.menu_espanol}/>
                    <hr></hr>
                <Markdown 
                    source={restaurant.menu_english}/>

                

            </div>
        )
    }
}
