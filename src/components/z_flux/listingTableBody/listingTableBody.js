// Libraries
import React from 'react';
// Styles
import './listingTableBody.scss';
// React Components
import ListingRow from 'components/listingRow/listingRow';
import DetailRow from 'components/detailRow/detailRow';

let ListingTableBody = {};

ListingTableBody = React.createClass({
    
    render () {

        let componentList = [];
        this.props.listings.forEach( (obj, index) => { 
            let listRow = <ListingRow key={index} data={obj} />;
                componentList.push(listRow);
                if( obj.get('detailState') === 'OPEN' ) {
                    componentList.push(<DetailRow key={index + 'a'} data={obj} />);
                }
        });


        return (
            <tbody>{
                componentList
            }</tbody>
        ); 
        
    },

});

export default ListingTableBody;
