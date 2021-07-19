
$('#people').change(function(){

  $('#peopleVeg')
      .find('option')
      .remove()
      .end();
      var tmp = (parseFloat($('#people').val())) + 1;


      for(i = 0; i< tmp;i++){
          $('#peopleVeg')
          .append($("<option></option>")
                  .attr("value",i)
                  .text(i));
      }
});
