$('#name_text_field_welcome').change(function(){
                            var myName = $('#name_text_field_welcome').val();
                            if(myName == ""){
                                    $('#partyFavorsButton').hide();
                                 
                            }else{
                                    $('#partyFavorsButton').show();
                                   
                            }
                            });


$('#name_text_field_welcome').keyup(function(){
                            var myName = $('#name_text_field_welcome').val();
                            if(myName == ""){
                                    $('#partyFavorsButton').hide();
                                 
                            }else{
                                    $('#partyFavorsButton').show();
                                   
                            }
                            });
