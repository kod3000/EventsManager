$('#name_password_field_welcome').change(function(){
                            var myName = $('#name_password_field_welcome').val();
                            if(myName == ""){
                                    $('#partyFavorsButton').hide();

                            }else{
                                    $('#partyFavorsButton').show();

                            }
                            });


$('#name_password_field_welcome').keyup(function(){
                            var myName = $('#name_password_field_welcome').val();
                            if(myName == ""){
                                    $('#partyFavorsButton').hide();

                            }else{
                                    $('#partyFavorsButton').show();

                            }
                            });
