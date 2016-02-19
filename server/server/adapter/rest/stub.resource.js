/**
 * @module adapter/EmploymentResource
 */
'use strict';

module.exports = {
    addRoutes: addRoutes
};

// Adds routes to the api.
function addRoutes ( api ) {
    api.get( api.locals.base + '/auctions', getAuctions ); 
}

/**
 * Gets all auctions (stub).
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 */
function getAuctions ( req, res ) {

	var auctions = [
		{
		    id: 1,
		    donor: [
		        1
		    ],
		    title: "Chocolate Cake",
		    openingBid: {
		        id: 1,
		        donor: 2,
		        bidAmount: 15
		    },
		    highestBid: 15,
		    location: 1,
		    expiration: "04/30/2016",
		    incrementAmount: 1,
		    status: "OPEN",
		    openDate: "01/20/2016",
		    closeDate: "04/30/2016"
		}, {
		    id: 2,
		    donor: [
		        2
		    ],
		    title: "Coffee Cake",
		    openingBid: {
		        id: 2,
		        donor: 1,
		        bidAmount: 7
		    },
		    highestBid: 7,
		    location: 1,
		    expiration: "04/30/2016",
		    incrementAmount: 1,
		    status: "OPEN",
		    openDate: "01/20/2016",
		    closeDate: "04/30/2016"
		}, {
		    id: 3,
		    donor: [
		        1,
		        2
		    ],
		    title: "Angel Food Cake",
		    openingBid: {
		        id: 3,
		        donor: 3,
		        bidAmount: 12
		    },
		    highestBid: 12,
		    location: 1,
		    expiration: "04/30/2016",
		    incrementAmount: 1,
		    status: "OPEN",
		    openDate: "01/20/2016",
		    closeDate: "04/30/2016"
		}
	];

	res.send( auctions );
}