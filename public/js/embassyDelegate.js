$('#name_password_field_welcome').change(function(){
  var myName = $('#name_password_field_welcome').val();
  $('#displayPassword').html(myName);

                            if(myName == ""){
                                    $('#partyFavorsButton').hide();

                            }else{
                                    $('#partyFavorsButton').show();

                            }
                            });


$('#name_password_field_welcome').keyup(function(){
  var myName = $('#name_password_field_welcome').val();

  $('#displayPassword').html(myName);
                            if(myName == ""){
                                    $('#partyFavorsButton').hide();

                            }else{
                                    $('#partyFavorsButton').show();

                            }
                            });


$('#name_username_field_welcome').change(function(){
  var myName = $('#name_username_field_welcome').val();

                            if(myName == ""){
                                    $('#name_password_field_welcome').hide();

                            }else{
                                    $('#name_password_field_welcome').show();

                            }
                            });
