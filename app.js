var app = new Vue({
    el: "#apps",
    data: {
        dndSpellList: [],
        dndDetails: [],
        fullDetailList: [],
        limit: 12,
        showAll: false,
        preUrl: "https://www.dnd5eapi.co",
    },

    async created() {
        // GET request using fetch with async/await
        const response = await fetch("https://www.dnd5eapi.co/api/spells");
        const data = await response.json();
        // console.log(data.results);
        this.dndSpellList = data.results;
    },

    methods: {
        async fetchOtherData() {
            try {
                detailedSpells = await this.dndSpellListLimit.map(
                    async (spell) => {
                        let url = "https://www.dnd5eapi.co" + spell.url;
                        const response = await fetch(url);
                        const data = await response.json();
                        // await console.log(data);
                        return await data;
                    }
                );

                await Promise.all(detailedSpells).then((values) => {
                    this.dndDetails = values;
                });
                await console.log(this.dndDetails);
                // this.dndSpellListLimit = await this.mergeData(
                //     this.dndSpellListLimit,
                //     this.dndDetails
                // );
            } catch (error) {
                console.log(error);
            }
        },
        mergeData(arr1, arr2) {
            let arr3 = arr1.map((item, i) => Object.assign({}, item, arr2[i]));

            return arr3;
        },
    },

    computed: {
        dndSpellListLimit: function () {
            return this.limit
                ? this.dndSpellList.slice(0, this.limit)
                : this.dndSpellList;
        },
    },

    async updated() {
        this.fetchOtherData();
    },
});
