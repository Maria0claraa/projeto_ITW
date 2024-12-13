// ViewModel KnockOut

var vm = function(){
    console.log('viewModel Initiated...');
    //--variaveis locais
    var self=this;
    self.baseUri = ko.observable('http://192.168.160.58/Paris2024/api/CountryMedals');
    self.displayNAme = 'Paris 2024 Country Medals'
    self.records = ko.observableArray([]);

    //---Page events
    self.activate = function (id){
        console.log('CALL: getCountryMedals...');
        var composeUri = self.baseUri();

        ajaxHelper(composeUri, 'GET').done(function (data){
            console.log(data);
            self.records(data);
    
        });
    };

    //---start
    self.activate(1);
    console.log("VM initialized!");

}

//---Internal functions 

function ajaxHelper(uri, method, data){
    return $.ajax({
        type:method,
        url:uri,
        dataType: 'json', 
        contentType: 'application/json', 
        data: data ? JSON.stringify(data) : null, 
        
        error: function (jqXHR, textStatus, errorThrown){
            alert("AJAX Call[" + uri + "] Fail...");
        }
    });
}
