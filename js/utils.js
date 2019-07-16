"option explicit";
var EPIMEDJS = EPIMEDJS || {};
EPIMEDJS.Handlebars = (function() {
  var arrTemplates = [];
  var preCompileTemplates = function(arrTpl) {
    var ajaxList = [];

    for (var i = 0; i < arrTpl.length; i++) {
      var name = arrTpl[i];
      var ajaxFunc = $.ajax({
        url: "js/templates/" + name + ".hbs", //ex. js/templates/mytemplate.handlebars
        async: false,
        success: function(data) {
          console.log("arrtpl", name);
          var obj = {};
          obj.name = name;
          obj.template = Handlebars.compile(data);
          arrTemplates.push(obj);
          console.log(arrTemplates);
        }
      });
      ajaxList.push(ajaxFunc);
    }

    return $.when(ajaxList);
  };

  var fillDiv = function(name, target, data) {
    if (arrTemplates.length == 0) {
      console.log(
        "É preciso passar templates antes de chamar o método fillDiv."
      );
      return;
    }
    var temptpl;

    for (var i = 0; i < arrTemplates.length; i++) {
      var row = arrTemplates[i];
      console.log("arrTemplates[tpl]", row[name]);
      if (row["name"] == name) {
        temptpl = row["template"];
        break;
      }
    }
    if (temptpl) $("#" + target).html(temptpl(data));
  };

  return {
    preCompileTemplates: preCompileTemplates,
    fillDiv: fillDiv
  };
})();
