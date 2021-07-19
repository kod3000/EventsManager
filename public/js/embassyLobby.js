$('#showCreate').click(function(){

    $('#statsEvent').hide();
    $('#listsEvent').hide();

    $('#createEvent').show();

})

$('#cancelCreate').click(function(){

    $('#statsEvent').show();
    $('#listsEvent').show();

    $('#createEvent').hide();

})
