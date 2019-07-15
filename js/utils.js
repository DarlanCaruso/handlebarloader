'option explicit'
var EPIMEDJS = EPIMEDJS || {};
jQuery.support.cors = true;
EPIMEDJS.Handlebars = (function(){
    
    var arrTemplates = [];
    var preCompileTemplates = function(arrTpl){
        for(var i=0;i<arrTpl.length;i++){
            var name = arrTpl[i];
            $.ajax({
                url: 'js/templates/'+name + '.handlebars', //ex. js/templates/mytemplate.handlebars
                //cache: true,
                crossDomain: true,
                async:false,
                success: function(data) {
                    console.log('arrtpl', name)
                    var obj = {};
                    obj.name = name;
                    obj.template = Handlebars.compile(data);
                    arrTemplates.push(obj);
                    console.log(arrTemplates)
                }                
            });
            /*$.get('js/templates/'+arrTpl[i] + '.handlebars', function (data) {
                var obj = {};
                obj.name = arrTpl[i];
                obj.template = Handlebars.compile(data);
                arrTemplates.push(obj);
            }, 'html');*/
        }
    }
    var fillDiv =function (name, target, data) {
        if(arrTemplates.length == 0) {
            console.log("É preciso passar templates antes de chamar o método fillDiv.");
            return;
        }
        var temptpl;

        for(var i=0; i<arrTemplates.length;i++){
            var row = arrTemplates[i];
            console.log('arrTemplates[tpl]',row[name]);
            if(row['name'] == name){
                temptpl = row['template'];
                break;
            }
           }
        if(temptpl)
            $('#'+ target).html(temptpl(data));
    }
    return {
        preCompileTemplates:preCompileTemplates,
        fillDiv:fillDiv
    }
})();
