// Libraries
import React from 'react';
import { connect } from 'react-redux'

// Material-UI
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import PlusOne from 'material-ui/lib/svg-icons/social/plus-one';
import IconButton from 'material-ui/lib/icon-button';

// Styles
// import './header.scss';
// Application Components
import AuctionItem from './auctionItem';
import AuctionItemDetail from './AuctionItemDetail';


let AuctionList = React.createClass({

    render() {

        let auctionItems = [];

        this.props.auctions.forEach( (obj, index) => {
            auctionItems.push( generateItem(obj, index, this.props) );
        });

        const urlStr = require('url-loader?limit=8192!' + 'images/pancakeBunny.png');

        const styles = {
          root: {
            display: 'flex',
            flexWrap: 'wrap',
            //justifyContent: 'space-around' // for prod
            justifyContent: 'flex-start' // for dev
          },
          gridList: {
            // width: 400,
            // height: 700,
            overflowY: 'auto',
            marginBottom: 24,
          },
        };

        const tilesData = [
          {
            img: urlStr,
            title: 'Breakfast',
            author: 'jill111',
            featured: true,
          },
          {
            img: urlStr + '?q=a',
            title: 'Tasty burger',
            author: 'pashminu',
          },
          {
            img: urlStr + '?q=b',
            title: 'Camera',
            author: 'Danson67',
          },
          {
            img: urlStr + '?q=c',
            title: 'Morning',
            author: 'fancycrave1',
            featured: true,
          },
          {
            img: urlStr + '?q=d',
            title: 'Hats',
            author: 'Hans',
          },
          {
            img: urlStr + '?q=e',
            title: 'Honey',
            author: 'fancycravel',
          },
          {
            img: urlStr + '?q=f',
            title: 'Vegetables',
            author: 'jill111',
          },
          {
            img: urlStr + '?q=g',
            title: 'Water plant',
            author: 'BkrmadtyaKarki',
          },
        ];

        return (
            <div style={styles.root}>
                <GridList
                  cols={2}
                  cellHeight={200}
                  padding={1}
                  style={styles.gridList}
                >
                  {tilesData.map(tile => (
                    <GridTile
                      key={tile.img}
                      title={tile.title}
                      subtitle={<span>by <b>{tile.author}</b></span>}
                      actionIcon={<IconButton><PlusOne color="white"/></IconButton>}
                      actionPosition="right"
                      titlePosition="top"
                      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.2) 70%,rgba(0,0,0,0) 100%)"
                      cols={tile.featured ? 2 : 1}
                      rows={tile.featured ? 2 : 1}
                    >
                      <img src={tile.img} />
                    </GridTile>
                  ))}
                </GridList>
              </div>
        )
    }

});






// class Auctions extends Component {

//     render() {
//         return (

//         );
//     }
// }



function generateItem (obj, index, props) {

    if ( props.expandedAuctionIdList.includes(obj.id) ) {
        return (<AuctionItemDetail
            key={index}
            data={obj}
            placeBid={props.placeBid}
            toggleAuctionDetail={props.toggleAuctionDetail}
        />)
    } else {
        return (<AuctionItem
            key={index}
            data={obj}
            placeBid={props.placeBid}
            toggleAuctionDetail={props.toggleAuctionDetail}
        />)
    }
}

export default AuctionList;