// Libraries
import React from 'react';
import { connect } from 'react-redux'

// Material-UI
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import PlusOne from 'material-ui/lib/svg-icons/social/plus-one';
import IconButton from 'material-ui/lib/icon-button';

import { getImageForEnv } from '../../images/index'

// Styles
// import './header.scss';
// Application Components
import AuctionItem from './auctionItem';
import AuctionItemDetail from './auctionItemDetail';

import './_auctionList.scss'


let AuctionList = React.createClass({

    render() {

        let auctionItems = [];


        this.props.auctions.forEach( (obj, index) => {


          if (obj.show && obj.image) {
            const urlStr = getImageForEnv( obj.image + '.png' );

            auctionItems.push( Object.assign( {}, obj, {

                key: urlStr + '?q=' + index,
                img: urlStr
            } ) );
          }

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
            width: window.innerWidth < 600 ? window.innerWidth : window.innerWidth - 20,
            // height: 700,
            overflowY: 'auto',
            marginBottom: 24
          }
        }

        const cols = window.innerWidth < 600 ? 2 : 3;
                  // cellHeight={200}


        // TODO: put this back in
        // actionIcon={<IconButton><PlusOne color="white"/></IconButton>}

        return (
              <div style={styles.root}>
                <GridList
                  cols={cols}
                  padding={1}
                  style={styles.gridList}
                >
                  {auctionItems.map(tile => (
                    <GridTile
                      placeBid={this.props.placeBid}
                      onClick={ e => this.props.toggleAuctionDetail(tile.id, e) }
                      key={tile.key}
                      title={tile.title}
                      subtitle={<span>with <b>{tile.donorName}</b></span>}
                      actionPosition="right"
                      titlePosition="top"
                      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                      cols={tile.featured ? 2 : 1}
                      rows={tile.featured ? 1 : 1}
                      className="auction-list__tile"
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
