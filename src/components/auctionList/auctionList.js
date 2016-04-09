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

        const urlStr = require('url-loader?limit=8192!' + '../../images/pancakeBunny.png');

        this.props.auctions.forEach( (obj, index) => {

            auctionItems.push( Object.assign( {}, obj, {
                key: urlStr + '?q=' + index,
                img: urlStr + '?q=' + index
            } ) )

        });

        console.log('auctionItems', auctionItems)

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

        return (
              <div style={styles.root}>
                <GridList
                  cols={3}
                  cellHeight={200}
                  padding={1}
                  style={styles.gridList}
                >
                  {auctionItems.map(tile => (
                    <GridTile
                      placeBid={this.props.placeBid}
                      onClick={ e => this.props.toggleAuctionDetail(tile.id, e) }
                      key={tile.img}
                      title={tile.title}
                      subtitle={<span>with <b>{tile.donorName}</b></span>}
                      actionIcon={<IconButton><PlusOne color="white"/></IconButton>}
                      actionPosition="right"
                      titlePosition="top"
                      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.2) 70%,rgba(0,0,0,0) 100%)"
                      cols={tile.featured ? 2 : 1}
                      rows={tile.featured ? 1 : 1}
                    >
                      <img src={tile.img} />
                    </GridTile>
                  ))}
                </GridList>
              </div>
        )

    }

});

export default AuctionList;