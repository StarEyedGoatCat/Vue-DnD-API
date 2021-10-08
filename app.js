var app = new Vue({
    el: "#apps",
    data: {
        dndSpellList: [],
        fullDetailList: [],
        limit: 12,
        showAll: false,
        preUrl: "https://www.dnd5eapi.co",
        ready: false,
        basicLimit: 12,
    },

    async created() {
        // GET request using fetch with async/await
        const response = await fetch("https://www.dnd5eapi.co/api/spells");
        const data = await response.json();
        // console.log(data.results);
        this.dndSpellList = await data.results;
        await this.fetchOtherData();
    },

    methods: {
        async fetchOtherData() {
            try {
                detailedSpells = await this.dndSpellList.map(async (spell) => {
                    let url = "https://www.dnd5eapi.co" + spell.url;
                    const response = await fetch(url);
                    const data = await response.json();
                    // await console.log(data);
                    return await data;
                });

                let dndDetails;

                await Promise.all(detailedSpells).then((values) => {
                    dndDetails = values;
                });

                this.dndSpellList = await this.mergeData(
                    this.dndSpellList,
                    dndDetails
                );

                console.log(this.dndSpellList);
                this.ready = true;
            } catch (error) {
                console.log(error);
            }
        },
        mergeData(arr1, arr2) {
            let arr3 = arr1.map((item, i) => Object.assign({}, item, arr2[i]));

            return arr3;
        },
        computedDSC: function (dsc, count) {
            return dsc.join().split(" ").slice(0, count).join(" ");
        },
    },

    computed: {
        dndSpellListLimit: function () {
            return this.limit
                ? this.dndSpellList.slice(0, this.limit)
                : this.dndSpellList;
        },
    },

    async updated() {},
});
