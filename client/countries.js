// this variable will store the visualisation so we can delete it when we need to 
var visjsobj;
if (Meteor.isClient) {
////////////////////////////
///// helper functions for the vis control form
////////////////////////////

    Template.countries_controls.helpers({
        get_feature_names : function() {
            return [{name:"population"},{name:"hdi"},{name:"gdp"}];
        },
    });

////////////////////////////
///// helper functions for the feature list display template
////////////////////////////

    Template.countries_feature_list.helpers({
        "get_all_feature_values":function(){
            if (Session.get("feature") != undefined){
                var countries = Countries.find({});
                var features = new Array();
                var ind = 0;
                countries.forEach(function(country){
                    features[ind] = {
                        name:country.name,
                        value:country[Session.get("feature")],
                    };
                    ind++;
                })
                return features;
            }
            else {
                return [];
            }
        }
    })

////////////////////////////
///// event handlers for the viz control form
////////////////////////////

    Template.countries_controls.events({
        "change .js-select-single-feature":function(event){
            event.originalEvent.defaultPrevented;
            var featureName = $(event.target).val();
            Session.set("feature", featureName);
        },
    });
    
    Template.countries_vizjs.events({
        "click .js-show-graphic1":function(event){
            event.preventDefault();
            initGraphic1Vis();
        },
        "click .js-show-graphic2":function(event){
            event.preventDefault();
            initGraphic2Vis();
        },
        "click .js-show-graphic3":function(event){
            event.preventDefault();
            initGraphic3Vis();
        },
    });
}



////////////////////////////
///// functions that set up and display the visualisation
////////////////////////////
function initGraphic1Vis() {
    if (visjsobj != undefined){
        visjsobj.destroy();
    }
    var countries = Countries.find({});
    var ind = 0;
    var nodes = new Array();
    var DOM = "flags/";
    countries.forEach(function(country){
        console.log(country);
        nodes[ind] = {
            id: ind,
            shape: 'image',
            image: DOM + country.flag + ".png",
            value: country[Session.get("feature")],
            label: country.name,
        };
        ind ++ ;
    });
    var edges =[
    ];
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            color: {
                border: '#222222',
                background: '#666666'
            },
            font:{color:'#eeeeee'}
        },
        height: '600px'
    };
    // get the div from the DOM that we are going to 
    // put our graph into 
    var container = document.getElementById('visjs');
    // create the graph
    visjsobj = new vis.Network(container, data, options);
}

function initGraphic2Vis() {
    if (visjsobj != undefined){
        visjsobj.destroy();
    }
    var countries = Countries.find({});
    var ind = 0;
    var items = new Array();
    var DOM = "flags/";
    countries.forEach(function(country){
        
        items[ind] = {
            id: ind, 
            content: country.name + ": " + country[Session.get("feature")],
            start: country.independence,
        };
        ind ++ ;
    });
    var template = document.getElementById('country_flag');
    var options = {
    };
    var container = document.getElementById('visjs');
    visjsobj = new vis.Timeline(container, items, options);
}

function initGraphic3Vis() {
    if (visjsobj != undefined){
        visjsobj.destroy();
    }
    var countries = Countries.find({});
    var ind = 0;
    var items = new Array();
    countries.forEach(function(country){
        var label = country.name;
        var value = country[Session.get("feature")];
        items[ind] = {
            x: ind, 
            y: value,
            label:{content:label, className:'vis-label', xOffset:-5}, 
        };
        ind ++ ;
    });
    var options = {
        sort: false,
        sampling: true,
        style: 'points',
        drawPoints: {
          enabled: false,
          size: 6,
          style: 'square'
        },
        defaultGroup: 'Scatterplot',
        height: '600px'
    };
    var container = document.getElementById('visjs');
    // create the graph
    visjsobj = new vis.Graph2d(container, items, options);
}

