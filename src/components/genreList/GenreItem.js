import React from 'react';
class GenreItem extends React.Component{
    render() {
        const genre = this.props.genre;
        return (       
         <option>{genre["name"]}</option>   
        );
    }
}

export default GenreItem;