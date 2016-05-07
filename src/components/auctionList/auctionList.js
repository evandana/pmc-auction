// Libraries
import React, { Component } from 'react';
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


class AuctionList extends Component {

    constructor(props) {
      super(props)
    }


    render() {

        let auctionItems = [];
        const cols = window.innerWidth < 600 ? 2 : 3;
        const featuredPatternMap = {
          // 1 is first item
          small: [1, 6, 13, 18, 25, 30, 37],
          medium: [1, 7, 11, 17, 21, 27, 31, 37]
        }

        const featuredPattern = window.innerWidth < 600 ? featuredPatternMap.small : featuredPatternMap.medium;

        let countShown = 0;
        this.props.auctions.forEach( (obj, index) => {


          if (obj.show && obj.image) {
            const urlStr = getImageForEnv( 'auction-list/' + obj.image + '.png' );

            countShown++;

            auctionItems.push( Object.assign( {}, obj, {
                key: urlStr + '?q=' + index,
                img: urlStr,
                title: this.props.config && this.props.config.BIDDING_OPEN ? obj.title : obj.title,
                featured: featuredPattern.includes( countShown ),
                value: '$' + (obj.highestBid || obj.openingBid)
            } ) );
          }

        });

        // console.log('auctionItems', auctionItems)

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

        // cellHeight={200}

        // TODO: put this back in
        // actionIcon={<IconButton><PlusOne color="white"/></IconButton>}

        // console.log('config', this.props.config)

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
                      onTouchTap={ e => this.props.toggleAuctionDetail(tile.id, e) }
                      key={tile.key}
                      title={tile.title}
                      subtitle={this.props.config && this.props.config.BIDDING_OPEN ? <span>with <b>{tile.donorName}</b> - {tile.value}</span> : <span>with <b>{tile.donorName}</b></span>}
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

}

function mapStateToProps (state) {
  // console.log('state', state.login)
    return {
        config: state.login.config
    }
}

export default connect(mapStateToProps)(AuctionList);
