if (Meteor.isServer) {
    Meteor.startup(function() {
        if (!Countries.findOne()) {
            try {
                var fs = Npm.require('fs');
                // file originally saved as public/data/taxa.csv
                var data = fs.readFileSync('./assets/app/jsonfiles/countries.json', 'utf8');
                var countries = JSON.parse(data);
                for (var i=0;i<countries.length; i++) {
                    Countries.insert(
                        {
                            name:countries[i].country,
                            population:countries[i].population,
                            hdi:countries[i].hdi,
                            gdp:countries[i].gdp,
                            independence:countries[i].independence,
                            flag:countries[i].flag
                        });
                }
            } catch (e) {
                console.log(e.message);
            }
        }
        // Reset collection
        //else {
        //    Countries.remove({});
        //}
    })
}
