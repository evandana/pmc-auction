// Libraries
import React, { Component } from 'react';

// Material-UI
import { GridList, GridTile } from 'material-ui/GridList';

import { getImageForEnv } from 'static/images/index'

import './auctionList.css'


class AuctionList extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    const {
      // objects
      auctions,
      config,

      // methods
      toggleAuctionDetail,
     } = this.props;

    let auctionItems = [];
    let cols = 2;
    if (window.innerWidth > 1000) {
      cols = 4;
    } else if (window.innerWidth > 600) {
      cols = 3;
    }
    const featuredPatternMap = {
      // 1 is first item
      small: [1, 6, 13, 18, 25, 30, 37],
      medium: [1, 7, 11, 17, 21, 27, 31, 37],
      large: []
    }

    let featuredPattern = featuredPatternMap.small;
    if (window.innerWidth > 900) {
      featuredPattern = featuredPatternMap.large;
    } else if (window.innerWidth > 600) {
      featuredPattern = featuredPatternMap.medium;
    }

    let countShown = 0;
    auctions.forEach((obj, index) => {

      if (obj.show) {

        let urlStr;

        if (obj.image) {
          urlStr = getImageForEnv('auction-list/' + obj.image + '.png');
        } else {
          urlStr = getImageForEnv('auction-list/default.png');
        }
          countShown++;

          auctionItems.push(Object.assign({}, obj, {
            key: urlStr + '?q=' + index,
            img: urlStr,
            title: config && config.BIDDING_OPEN ? obj.title : obj.title,
            featured: featuredPattern.includes(countShown),
            value: '$' + (obj.highestBid || obj.openingBid)
          }));
        }

    });

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: '-1px',
        justifyContent: 'flex-start' // for dev
      },
      gridList: {
        width: '100%',
        overflowY: 'auto',
        marginBottom: '-1px',
      }
    }

    return (
      <div style={styles.root}>
        <GridList
          cols={cols}
          padding={1}
          style={styles.gridList}
        >
          {auctionItems.map(tile => (
            <GridTile
              onTouchTap={e => toggleAuctionDetail(tile.uid, e)}
              key={tile.key}
              title={tile.title}
              subtitle={config && config.BIDDING_OPEN ? <span>with <b>{tile.owner.displayName}</b> - {tile.value}</span> : <span>with <b>{tile.owner.displayName}</b></span>}
              actionPosition="right"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(5,10,30,0.8) 0%,rgba(5,10,30,0.6) 50%,rgba(0,0,0,0) 100%)"
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 1 : 1}
              className="auction-list__tile"
            >
              <img src={tile.img} alt="Auction Item teaser"/>
            </GridTile>
          ))}
        </GridList>
      </div>
    )

  }

}

export default AuctionList;
