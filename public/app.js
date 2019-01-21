"use strict"

var app = new Vue({
	el: '#app',
	data: {
		isSurf: false,
		isSell: false,
		surfSpots: [],
		accounts: [],
	},
	created: function () {
		this.loadData();
	},
	methods: {
		toggleSurf: function() {
			this.isSurf = !this.isSurf;
			this.isSell = false;
		},
		toggleSell: function() {
			this.isSell = !this.isSell;
			this.isSurf = false;
		},
		allOff: function() {
			this.isSell = false;
			this.isSurf = false;
		},
		loadData: async function() {
			console.log("loading data...");
			const [spots, wind, swell, accounts] = await Promise.all([
				fetch("public/spots.json").then(response => response.json()),
				fetch("public/wind.json").then(response => response.json()),
				fetch("public/swell.json").then(response => response.json()),
				fetch("accounts").then(response => response.json()),
			]);
			this.surfSpots = spots.slice(0,4);
			this.accounts = accounts;
			console.log("spots");
			console.log(this.surfSpots);
			console.log("wind");
			console.log(wind);
			console.log("swell");
			console.log(swell);
			console.log("accounts");
			console.log(accounts);
		},
	}
});